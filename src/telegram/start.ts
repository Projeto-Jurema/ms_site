import { Message } from 'node-telegram-bot-api'
import bot from '../config/bot'

import { texts } from '../constants/telegramConstants'
import { logger } from '../services'

const start = (msg: Message) => {
  logger.info(`[${msg.chat.id}] Starting bot`)

  bot.sendMessage(
    msg.chat.id,
    texts.helloEmployees(msg.chat.first_name as string)
  )
}

export default start
