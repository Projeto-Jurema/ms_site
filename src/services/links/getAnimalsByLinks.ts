import { Animals, Prisma } from '@prisma/client'

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

export const getAnimalsByLinks = (animals: Animals[]): Prisma.JsonValue[] => {
  if (!animals.length) return []

  return animals.map((animal) => animal.metadata)
}
