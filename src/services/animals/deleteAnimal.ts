import prisma from '../../config/prisma'

export const deleteAnimal = async (id: number) => {
  await prisma.animals.delete({ where: { id } })
}
