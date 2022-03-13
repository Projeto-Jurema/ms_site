import { Message } from 'node-telegram-bot-api'
import bot from '../config/bot'

import { texts } from '../constants/telegramConstants'
import Forms from './Forms'
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

export const chats = {} as { [chatId: number]: Forms }

bot.on('message', async (msg: Message) => {
  const chatId = msg.chat.id

  if (
    ![JOAO_CHAT_ID, MATEUS_CHAT_ID, HENRIQUE_CHAT_ID].includes(
      msg.chat.id.toString?.()
    )
  ) {
    return bot.sendMessage(chatId, texts.unauthorized)
  }

  if (msg.text && /\/start/.test(msg.text)) return start(msg)

  if (msg.text && /\/cancel/.test(msg.text)) {
    bot.sendMessage(msg.chat.id, 'Cadastro de animal cancelado!')

    return delete chats[chatId]
  }

  if (msg.text && /\/new/.test(msg.text)) return newAnimal(msg)

  if (chats[msg.chat.id]) {
    const form = chats[msg.chat.id]

    return form.saveAnswer(msg)
  }

  bot.sendMessage(msg.chat.id, texts.nonChatFound)
})

export interface SendResponseForms {
  name: string
  email: string
  city: string
  phone: string
  animalLink: string
  about: string
  bot?: any
}
