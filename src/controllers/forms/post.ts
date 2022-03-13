import { Request, Response } from 'express'
import { error } from '../../services'
import sendFormsResponseMessage from '../../telegram/sendFormsResponseMessage'

async function Post(req: Request, res: Response) {
  try {
    await sendFormsResponseMessage(req.body)

    return res.status(200).json({
      error: false,
      message: 'Mensagem enviada',
    })
  } catch (err) {
    return error({ err, res })
  }
}

export { Post }
