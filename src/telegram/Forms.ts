import { Message } from 'node-telegram-bot-api'

import { chats, Question } from '.'
import bitly from '../config/bitly'
import bot from '../config/bot'
import prisma from '../config/prisma'
import { texts } from '../constants/telegramConstants'
import { logger } from '../services'
import upload from './upload'

class Forms {
  constructor(
    public questions: Question[],
    public currentQuestion: Question,
    public msg: Message,
    public link: URL
  ) {}

  async saveInDb({ animalLink }: { animalLink: string }) {
    logger.info('[saveInDb] Saving new animal')

    return prisma.animals.create({ data: { animalLink } })
  }

  async sendNextQuestion() {
    logger.info(`[sendNextQuestion][${logger.beautify(this.currentQuestion)}]`)

    if (!this.currentQuestion?.text) {
      const animalInstance = await this.saveInDb({
        animalLink: encodeURI(this.link.toString()),
      })

      const shortenUrl = await bitly.shorten(this.link.toString())

      bot.sendMessage(
        this.msg.chat.id,
        texts.result(shortenUrl.link, animalInstance.id)
      )

      return delete chats[this.msg.chat.id]
    }

    const options = this.currentQuestion.allowedAnswers
      ?.map((option) => ({
        text: option[0].toUpperCase() + option.substring(1),
        callback_data: option[0].toUpperCase() + option.substring(1),
      }))
      .filter((option) => option.text !== '*')

    const opts = {
      reply_markup: {
        keyboard: [options || []],
        one_time_keyboard: true,
        force_reply: true,
        resize_keyboard: true,
      },
    }

    bot.sendMessage(this.msg.chat.id, this.currentQuestion.text, opts)
  }

  jumpToNextQuestion() {
    logger.info(`[jumpToNextQuestion] jumping to the next question`)

    this.currentQuestion = this.questions[this.currentQuestion.id + 1]

    this.sendNextQuestion()
  }

  async saveAsImage(msg: Message) {
    logger.info(
      `[saveAsImage][${msg.chat.id}] Saving image in S3 and appending to the link`
    )

    if (!msg.photo?.length) {
      return bot.sendMessage(this.msg.chat.id, texts.invalid)
    }

    const url = await upload(msg)

    this.link.searchParams.append(this.currentQuestion.query, url)

    this.jumpToNextQuestion()
  }

  saveAsText(msg: Message) {
    logger.info(
      `[saveAsText][${msg.chat.id}] Saving text and appending to the link`
    )

    if (!msg.text) return bot.sendMessage(this.msg.chat.id, texts.invalid)

    this.link.searchParams.append(this.currentQuestion.query, msg.text)

    this.jumpToNextQuestion()
  }

  saveAnswer(msg: Message) {
    logger.info(`[saveAnswer][${msg.chat.id}] Saving answer`)

    const lowerCaseMessage = msg.text?.toLocaleLowerCase()
    const isAllowAll = this.currentQuestion.allowedAnswers?.includes('*')

    if (
      lowerCaseMessage &&
      !isAllowAll &&
      !this.currentQuestion.allowedAnswers?.includes(lowerCaseMessage)
    ) {
      return bot.sendMessage(this.msg.chat.id, texts.invalid)
    }

    if (this.currentQuestion.type === 'text') return this.saveAsText(msg)

    if (this.currentQuestion.type === 'photo') return this.saveAsImage(msg)
  }
}

export default Forms
