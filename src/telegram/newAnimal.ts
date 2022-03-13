import { Message } from 'node-telegram-bot-api'

import { chats } from '.'
import { questions } from '../constants/telegramConstants'
import Forms from './Forms'

const { SITE_BASE_URL } = process.env

const newAnimal = (msg: Message) => {
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
