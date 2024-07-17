import { UserTypeEnum } from 'enums/user.enums'
import type { Request } from 'express'
import { prisma } from 'config/prisma'

export const getCurrentUserInformation = async (req: Request) => {
  let currentUser = null

  if (
    req.currentUser?.userType &&
    req.currentUser?.userType === UserTypeEnum.SUPERUSER
  ) {
    currentUser = await prisma.superUser.findUnique({
      where: {
        email: req.currentUser.email,
        id: +req.currentUser.id,
      },
    })
  }

  if (currentUser) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (currentUser as any).password
  }

  return { ...currentUser, userType: req.currentUser?.userType }
}
