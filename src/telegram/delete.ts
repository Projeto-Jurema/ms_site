import { Message } from 'node-telegram-bot-api'
import bot from '../config/bot'
import { texts } from '../constants/telegramConstants'
import { deleteAnimal as deleteAnimalById } from '../services/animals'

export const deleteAnimal = async (msg: Message) => {
  const chatId = msg.chat.id
  const params = msg.text?.replace(/\/delete/, '').trim()

  if (!params) {
    return bot.sendMessage(chatId, texts.nonSpecified)
  }

  await deleteAnimalById(parseFloat(params))

  bot.sendMessage(chatId, texts.deleted)
}
