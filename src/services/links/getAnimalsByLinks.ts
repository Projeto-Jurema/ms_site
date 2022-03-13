import { Animals } from '@prisma/client'
import { ForbiddenError } from 'errors-stack'

export interface Response {
  id: number
  animalLink: string
  name?: string
  species?: string
  breed?: string
  sex?: string
  size?: string
  personality?: string
  is_castrated?: string
  has_chip?: string
  photo?: string
}

export const getAnimalsByLinks = (animals: Animals[]): Response[] => {
  if (!animals.length) return animals

  if (animals.every(({ animalLink }) => animalLink.includes('bitly'))) {
    throw new ForbiddenError('It is forbidden to use bitly links')
  }

  const linksIsNotBitly = animals.filter(
    ({ animalLink }) => !animalLink.includes('bitly')
  )

  return linksIsNotBitly.map(({ animalLink, id }) => {
    const objAnimal = {} as { [key: string]: string }

    const searchParams = new URLSearchParams(
      new URL(decodeURI(animalLink)).search
    )

    for (const [key, value] of searchParams.entries()) {
      objAnimal[key] = value
    }

    return { ...objAnimal, animalLink, id }
  })
}
