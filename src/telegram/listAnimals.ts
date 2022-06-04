import { Message } from 'node-telegram-bot-api'
import bot from '../config/bot'
import { texts } from '../constants/telegramConstants'
import { logger } from '../services'
import { getAnimals } from '../services/animals'

const { SITE_BASE_URL } = process.env

export const listAnimals = async (msg: Message) => {
  logger.info(`[${msg.chat.id}][${msg.text}] List animals`)

  const chatId = msg.chat.id
  const text = texts.list

  const animals = await getAnimals()

  const opts = {
    reply_markup: {
      inline_keyboard: [] as { text: string; url: string }[][],
    },
  }

  logger.info(animals)

  animals.forEach((animal) => {
    opts.reply_markup.inline_keyboard.push([
      {
        text: `${animal?.id} - ${animal?.name}`,
        url: `${SITE_BASE_URL}/animal/${animal?.id}`,
      },
    ])
  })

  bot.sendMessage(chatId, text, opts)
}
