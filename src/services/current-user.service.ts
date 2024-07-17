import { UserType } from 'enums/userTypes'
import type { Request } from 'express'
import { prisma } from 'config/prisma'

export const getCurrentUserInformation = async (req: Request) => {
  let currentUser = null

  if (req.currentUser?.userType === UserType.SUPERUSER) {
    currentUser = await prisma.superUser.findUnique({
      where: {
        email: req.currentUser.email,
        id: +req.currentUser.id,
      },
    })
  }

  return currentUser
}
