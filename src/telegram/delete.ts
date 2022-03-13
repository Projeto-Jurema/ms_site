import { Message } from 'node-telegram-bot-api'
import bot from '../config/bot'
import { texts } from '../constants/telegramConstants'
import { logger } from '../services'
import { deleteAnimal as deleteAnimalById } from '../services/animals'

export const deleteAnimal = async (msg: Message) => {
  logger.info(`[${msg.chat.id}][${msg.text}] Delete new animal`)

  const chatId = msg.chat.id
  const params = msg.text?.replace(/\/delete/, '').trim()

  if (!params || isNaN(parseFloat(params))) {
    return bot.sendMessage(chatId, texts.nonSpecified)
  }

  await deleteAnimalById(parseFloat(params))

  bot.sendMessage(chatId, texts.deleted)
}
