export const parseLink = ({
  animalLink,
  id,
}: {
  animalLink: string
  id: number
}) => {
  const objAnimal = {} as { [key: string]: string }

  const searchParams = new URLSearchParams(
    new URL(decodeURI(animalLink)).search
  )

  for (const [key, value] of searchParams.entries()) {
    objAnimal[key] = value
  }

  return { ...objAnimal, animalLink, id }
}
