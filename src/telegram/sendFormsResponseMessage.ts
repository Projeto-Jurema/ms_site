import { SendResponseForms } from '.'
import bot from '../config/bot'
import prisma from '../config/prisma'
import { texts } from '../constants/telegramConstants'
import { logger } from '../services'

const sendFormsResponseMessage = async ({
  name,
  animalLink,
  phone,
}: SendResponseForms) => {
  logger.info(
    `[sendFormsResponseMessage] new interested people ${logger.beautify({
      name,
      animalLink,
      phone,
    })}`
  )

  const today = new Date().toISOString()

  const text = texts.newResponseForms({
    name,
    animalLink,
    phone,
    today,
  })

  const employeesToReceiveMessage = await prisma.employees.findMany({
    where: { receiveAdoptionMessage: true },
  })

  await Promise.all(
    employeesToReceiveMessage.map(async (employee) =>
      bot.sendMessage(employee.TelegramId, text)
    )
  )
}

export default sendFormsResponseMessage
