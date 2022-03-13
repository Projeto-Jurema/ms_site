import { Message } from 'node-telegram-bot-api'
import bot from '../config/bot'

import { texts } from '../constants/telegramConstants'
import { logger } from '../services'
import { deleteAnimal } from './delete'
import Forms from './Forms'
import { listAnimals } from './listAnimals'
import newAnimal from './newAnimal'
import start from './start'

const { JOAO_CHAT_ID, MATEUS_CHAT_ID, HENRIQUE_CHAT_ID } = process.env

export type Question = {
  type: 'text' | 'photo'
  text: string
  id: number
  query: string
  allowedAnswers?: string[]
}

export interface SendResponseForms {
  name: string
  email: string
  city: string
  phone: string
  animalLink: string
  about: string
  bot?: any
}

export const chats = {} as { [chatId: number]: Forms }

bot.on('message', async (msg: Message) => {
  const chatId = msg.chat.id

  logger.info(`[${chatId}][${msg.text}] Received message`)

  if (
    ![JOAO_CHAT_ID, MATEUS_CHAT_ID, HENRIQUE_CHAT_ID].includes(
      msg.chat.id.toString?.()
    )
  ) {
    logger.warn(`[${chatId}][${msg.text}] Unauthorized chat`)

    return bot.sendMessage(chatId, texts.unauthorized)
  }

  if (msg.text && /\/start/.test(msg.text)) return start(msg)

  if (msg.text && /\/cancel/.test(msg.text)) {
    logger.info(`[${chatId}][${msg.text}] Canceling creating new animal`)

    bot.sendMessage(msg.chat.id, texts.canceled)

    return delete chats[chatId]
  }

  if (msg.text && /\/new/.test(msg.text)) return newAnimal(msg)

  if (msg.text && /\/list/.test(msg.text)) return listAnimals(msg)

  if (msg.text && /\/delete/.test(msg.text)) return deleteAnimal(msg)

  if (chats[msg.chat.id]) {
    const form = chats[msg.chat.id]

    return form.saveAnswer(msg)
  }

  bot.sendMessage(msg.chat.id, texts.nonChatFound)
})
