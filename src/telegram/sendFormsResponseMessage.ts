import { SendResponseForms } from '.'
import bot from '../config/bot'
import { texts } from '../constants/telegramConstants'
import { logger } from '../services'

const { HENRIQUE_CHAT_ID } = process.env

const sendFormsResponseMessage = async ({
  name,
  animalLink,
  phone,
}: SendResponseForms) => {
  logger.info(
    `[sendFormsResponseMessage] new interested people ${logger.beautify({
      name,
      animalLink,
      phone,
    })}`
  )

  const today = new Date().toISOString()

  const text = texts.newResponseForms({
    name,
    animalLink,
    phone,
    today,
  })

  await bot.sendMessage(HENRIQUE_CHAT_ID as string, text)
}

export default sendFormsResponseMessage
