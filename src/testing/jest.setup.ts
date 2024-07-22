import { createSuperUser } from 'scripts/create-super-user'
import { prisma } from 'config/prisma'

beforeAll(async () => {
  await prisma.$connect()
  await createSuperUser()
})

afterAll(async () => {
  await prisma.superUser.deleteMany()
  await prisma.$disconnect()
})
