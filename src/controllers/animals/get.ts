import { Request, Response } from 'express'
import { error } from '../../services'
import { getAnimals } from '../../services/animals'

async function Get(req: Request, res: Response) {
  try {
    const { id } = req.query

    const animals = await getAnimals(id)

    return res.status(200).json(animals)
  } catch (err) {
    return error({ err, res })
  }
}

export { Get }
