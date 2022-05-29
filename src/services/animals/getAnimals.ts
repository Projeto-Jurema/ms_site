import prisma from '../../config/prisma'
import { getAnimalsByLinks } from '../links'

export const getAnimals = async (id?: any) => {
  const animals = await prisma.animals.findMany({
    ...(typeof id === 'number' && { where: { id } }),
  })

  return getAnimalsByLinks(animals)
}
