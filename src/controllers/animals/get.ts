import { Request, Response } from 'express'
import { error } from '../../services'
import { getAnimals } from '../../services/animals'

async function Get(req: Request, res: Response) {
  try {
    const { url } = req.query

    const animals = typeof url === 'string' || !url ? await getAnimals(url) : []

    return res.status(200).json(animals)
  } catch (err) {
    return error({ err, res })
  }
}

export { Get }
