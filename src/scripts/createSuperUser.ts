/* eslint-disable no-console */
import { Password } from 'utils/password'
import { prisma } from 'config/prisma'

export const createSuperUser = async (): Promise<void> => {
  try {
    const existingSuperUser = await prisma.superUser.findFirst({
      where: {
        email: process.env.SUPER_USER_EMAIL,
      },
    })

    if (existingSuperUser) {
      console.log(`Super user already exists: "${existingSuperUser.email}"`)
      return
    }

    const newSuperUserEmail = process.env.SUPER_USER_EMAIL
    const newSuperUserPassword = process.env.SUPER_USER_PASSWORD

    if (!newSuperUserEmail || !newSuperUserPassword) {
      console.error('Environment variables not set to create super user')
      return
    }

    const hashedPassword = await Password.toHash(newSuperUserPassword!)
    const superUser = await prisma.superUser.create({
      data: {
        email: newSuperUserEmail,
        password: hashedPassword,
      },
    })

    if (superUser) {
      console.log(`Super user created: "${superUser.email}"`)
    }
  } catch (error) {
    console.error('Error creating super user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createSuperUser()
