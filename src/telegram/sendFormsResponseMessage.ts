import { SendResponseForms } from '.'
import bot from '../config/bot'
import { texts } from '../constants/telegramConstants'

const { HENRIQUE_CHAT_ID } = process.env

const sendFormsResponseMessage = async ({
  name,
  email,
  city,
  about,
  animalLink,
  phone,
}: SendResponseForms) => {
  const today = new Date().toISOString()

  const text = texts.newResponseForms({
    name,
    email,
    city,
    about,
    animalLink,
    phone,
    today,
  })

  await bot.sendMessage(HENRIQUE_CHAT_ID as string, text)
}

export default sendFormsResponseMessage
