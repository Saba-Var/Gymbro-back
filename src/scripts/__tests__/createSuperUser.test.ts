/* eslint-disable no-console */
import { createSuperUser } from 'scripts/createSuperUser'
import { Password } from 'utils/password'
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

jest.mock('utils/password', () => ({
  Password: {
    toHash: jest.fn(),
  },
}))

describe('createSuperUser', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  it('should log that the super user already exists', async () => {
    process.env.SUPER_USER_EMAIL = 'existing@superuser.com'
    ;(prisma.superUser.findFirst as jest.Mock).mockResolvedValue({
      email: 'existing@superuser.com',
    })

    console.log = jest.fn()

    await createSuperUser()

    expect(prisma.superUser.findFirst).toHaveBeenCalledWith({
      where: { email: 'existing@superuser.com' },
    })
    expect(console.log).toHaveBeenCalledWith(
      'Super user already exists: "existing@superuser.com"'
    )
  })

  it('should create a new super user if none exists', async () => {
    process.env.SUPER_USER_EMAIL = 'new@superuser.com'
    process.env.SUPER_USER_PASSWORD = 'password123'
    ;(prisma.superUser.findFirst as jest.Mock).mockResolvedValue(null)
    ;(Password.toHash as jest.Mock).mockResolvedValue('hashedPassword')
    ;(prisma.superUser.create as jest.Mock).mockResolvedValue({
      email: 'new@superuser.com',
    })

    console.log = jest.fn()

    await createSuperUser()

    expect(prisma.superUser.findFirst).toHaveBeenCalledWith({
      where: { email: 'new@superuser.com' },
    })
    expect(Password.toHash).toHaveBeenCalledWith('password123')
    expect(prisma.superUser.create).toHaveBeenCalledWith({
      data: {
        email: 'new@superuser.com',
        password: 'hashedPassword',
      },
    })
    expect(console.log).toHaveBeenCalledWith(
      'Super user created: "new@superuser.com"'
    )
  })

  it('should log an error if there is an exception', async () => {
    process.env.SUPER_USER_EMAIL = 'new@superuser.com'
    process.env.SUPER_USER_PASSWORD = 'password123'
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
