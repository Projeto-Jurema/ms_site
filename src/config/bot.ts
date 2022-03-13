process.env.NTBA_FIX_319 = '1'

import TelegramBot from 'node-telegram-bot-api'

const { TELEGRAM_BOT_TOKEN } = process.env

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN as string, {
  polling: true,
})

export default bot
