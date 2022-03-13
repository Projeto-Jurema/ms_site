import { Message } from 'node-telegram-bot-api'

import { chats } from '.'
import { questions } from '../constants/telegramConstants'
import { logger } from '../services'
import Forms from './Forms'

const { SITE_BASE_URL } = process.env

const newAnimal = (msg: Message) => {
  logger.info(`[${msg.chat.id}][${msg.text}] Creating new animal`)

  const form = new Forms(
    questions,
    questions[0],
    msg,
    new URL(SITE_BASE_URL as string)
  )

  form.sendNextQuestion()

  chats[msg.chat.id] = form
}

export default newAnimal
