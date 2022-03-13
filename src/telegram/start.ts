import { Message } from 'node-telegram-bot-api'
import bot from '../config/bot'

import { texts } from '../constants/telegramConstants'

const { HENRIQUE_CHAT_ID } = process.env

const start = (msg: Message) => {
  if (msg.chat.id === parseFloat(HENRIQUE_CHAT_ID as string)) {
    bot.sendMessage(msg.chat.id, texts.helloHenrique)
  }

  bot.sendMessage(
    msg.chat.id,
    texts.helloCreators(msg.chat.first_name as string)
  )
}

export default start
