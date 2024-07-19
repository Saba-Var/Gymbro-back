/* eslint-disable no-console */
import { createSuperUser } from 'scripts/create-super-user'
import { Password } from 'utils/password.util'
import { prisma } from 'config/prisma'

jest.mock('config/prisma', () => ({
  prisma: {
    superUser: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
    $disconnect: jest.fn(),
  },
}))

jest.mock('utils/password.util', () => ({
  Password: {
    toHash: jest.fn(),
  },
}))

describe('createSuperUser', () => {
  const superUseEmail = process.env.SUPER_USER_EMAIL
  const superUserPassword = process.env.SUPER_USER_PASSWORD

  it('should log that the super user already exists', async () => {
    ;(prisma.superUser.findFirst as jest.Mock).mockResolvedValue({
      email: process.env.SUPER_USER_EMAIL,
    })

    console.log = jest.fn()

    await createSuperUser()

    expect(prisma.superUser.findFirst).toHaveBeenCalledWith({
      where: { email: superUseEmail },
    })
    expect(console.log).toHaveBeenCalledWith(
      `Super user already exists: "${superUseEmail}"`
    )
  })

  it('should create a new super user if none exists', async () => {
    ;(prisma.superUser.findFirst as jest.Mock).mockResolvedValue(null)
    ;(Password.toHash as jest.Mock).mockResolvedValue('hashedPassword')
    ;(prisma.superUser.create as jest.Mock).mockResolvedValue({
      email: superUseEmail,
    })

    console.log = jest.fn()

    await createSuperUser()

    expect(prisma.superUser.findFirst).toHaveBeenCalledWith({
      where: { email: superUseEmail },
    })
    expect(Password.toHash).toHaveBeenCalledWith(superUserPassword)
    expect(prisma.superUser.create).toHaveBeenCalledWith({
      data: {
        email: superUseEmail,
        password: 'hashedPassword',
      },
    })
    expect(console.log).toHaveBeenCalledWith(
      `Super user created: "${superUseEmail}"`
    )
  })

  it('should log an error if there is an exception', async () => {
    const error = new Error('Some error')
    ;(prisma.superUser.findFirst as jest.Mock).mockRejectedValue(error)

    console.error = jest.fn()

    await createSuperUser()

    expect(console.error).toHaveBeenCalledWith(
      'Error creating super user:',
      error
    )
  })

  it('should always disconnect from prisma', async () => {
    await createSuperUser()
    expect(prisma.$disconnect).toHaveBeenCalled()
  })
})
