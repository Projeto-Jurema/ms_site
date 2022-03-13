import { Message } from 'node-telegram-bot-api'
import bot from '../config/bot'

import { texts } from '../constants/telegramConstants'
import { logger } from '../services'

const { HENRIQUE_CHAT_ID } = process.env

const start = (msg: Message) => {
  logger.info(`[${msg.chat.id}] Starting bot`)

  if (msg.chat.id === parseFloat(HENRIQUE_CHAT_ID as string)) {
    bot.sendMessage(msg.chat.id, texts.helloHenrique)
  }

  bot.sendMessage(
    msg.chat.id,
    texts.helloCreators(msg.chat.first_name as string)
  )
}

export default start
