import { Animals } from '@prisma/client'

export interface Response {
  id?: number
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
  if (!animals.length) return []

  // @ts-ignore
  return animals.map((animal) => JSON.parse(animal.metadata))
}
