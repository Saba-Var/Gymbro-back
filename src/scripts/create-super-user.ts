/* eslint-disable no-console */
import { Password } from 'utils/password.util'
import { prisma } from 'config/prisma'

export const createSuperUser = async (): Promise<void> => {
  try {
    const { SUPER_USER_EMAIL, SUPER_USER_PASSWORD, NODE_ENV } = process.env

    if (!SUPER_USER_EMAIL || !SUPER_USER_PASSWORD) {
      console.error('Environment variables not set to create super user')
      return
    }

    const existingSuperUser = await prisma.superUser.findFirst({
      where: {
        email: process.env.SUPER_USER_EMAIL,
      },
    })

    if (existingSuperUser) {
      console.log(`Super user already exists: "${existingSuperUser.email}"`)
      return
    }

    const hashedPassword = await Password.toHash(SUPER_USER_PASSWORD!)
    const superUser = await prisma.superUser.create({
      data: {
        email: SUPER_USER_EMAIL,
        password: hashedPassword,
      },
    })

    if (superUser && !NODE_ENV.includes('test')) {
      console.log(`Super user created: "${superUser.email}"`)
    }
  } catch (error) {
    console.error('Error creating super user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createSuperUser()
