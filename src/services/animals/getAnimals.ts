import prisma from '../../config/prisma'
import { getAnimalsByLinks } from '../links'

export const getAnimals = async (url?: string) => {
  const animals = await prisma.animals.findMany({
    ...(url && { where: { animalLink: encodeURI(url) } }),
  })

  return getAnimalsByLinks(animals)
}
