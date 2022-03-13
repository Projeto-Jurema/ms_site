process.env.NTBA_FIX_319 = '1'

import { Message } from 'node-telegram-bot-api'
import bot from '../config/bot'

import S3 from '../config/s3'
import { texts } from '../constants/telegramConstants'

const { AWS_S3_BUCKET } = process.env

const upload = async (msg: Message): Promise<string> => {
  return new Promise((resolve) => {
    const photo = msg.photo?.[msg.photo.length - 1]

    if (!photo?.file_id) return

    const chatId = msg.chat.id

    const chunks = [] as Buffer[]
    const fileStream = bot.getFileStream(photo?.file_id)

    fileStream.once('error', () => {
      bot.sendMessage(chatId, texts.imageError)
    })

    fileStream.once('end', async () => {
      const fileBuffer = Buffer.concat(chunks)

      const params = {
        Bucket: AWS_S3_BUCKET as string,
        Key: `${chatId}/${photo?.file_id}.jpg`,
        Body: fileBuffer,
        ACL: 'public-read',
      }

      const data = await S3.upload(params).promise()

      return resolve(data.Location)
    })

    fileStream.on('data', (chunk: Buffer) => {
      chunks.push(chunk)
    })
  })
}

export default upload
