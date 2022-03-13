import { Message } from 'node-telegram-bot-api'
import bot from '../config/bot'
import { texts } from '../constants/telegramConstants'
import { getAnimals } from '../services/animals'

export const listAnimals = async (msg: Message) => {
  const chatId = msg.chat.id
  const text = texts.list

  const animals = await getAnimals()

  const opts = {
    reply_markup: {
      inline_keyboard: [] as { text: string; url: string }[][],
    },
  }

  animals.forEach((animal) => {
    opts.reply_markup.inline_keyboard.push([
      {
        text: `${animal.id} - ${animal.name}`,
        url: animal.animalLink,
      },
    ])
  })

  bot.sendMessage(chatId, text, opts)
}
