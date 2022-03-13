import { Request, Response } from 'express'
import { error } from '../../../services'
import { gen } from '../../../services/payment'

async function Post(req: Request, res: Response) {
  try {
    const response = await gen(req.body)

    return res.status(200).json(response)
  } catch (err) {
    return error({ err, res })
  }
}

export { Post }
