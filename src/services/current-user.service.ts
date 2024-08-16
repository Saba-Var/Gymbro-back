import { UserTypeEnum } from '@prisma/client'
import type { Request } from 'express'
import { prisma } from 'config/prisma'

export const getCurrentUserInformation = async (req: Request) => {
  let currentUser = null

  if (req.currentUser?.userType) {
    if (req.currentUser?.userType === UserTypeEnum.SUPERUSER) {
      currentUser = await prisma.superUser.findUnique({
        where: {
          email: req.currentUser.email,
          id: +req.currentUser.id,
        },
      })
    } else if (
      req.currentUser?.userType === UserTypeEnum.ADMIN ||
      req.currentUser?.userType === UserTypeEnum.STAFF
    ) {
      currentUser = await prisma.staff.findUnique({
        where: {
          companyId: +(req?.currentUser?.companyId as number),
          email: req.currentUser.email,
          id: +req.currentUser.id,
        },
        include: {
          roles: true,
        },
      })
    } else if (req.currentUser?.userType === UserTypeEnum.CLIENT) {
      currentUser = await prisma.client.findUnique({
        where: {
          companyId: +(req.currentUser.companyId as number),
          email: req.currentUser.email,
          id: +req.currentUser.id,
        },
      })
    }
  }

  if (currentUser) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (currentUser as any).password
  }

  return { ...currentUser, userType: req.currentUser?.userType }
}
