import { UserTypeEnum } from '@prisma/client'
import { prisma } from 'config/prisma'

export const getUserService = async (id: number, userType: UserTypeEnum) => {
  let user = null

  if (userType === UserTypeEnum.CLIENT) {
    user = await prisma.client.findUnique({
      where: {
        id,
      },
    })
  }

  if (userType === UserTypeEnum.SUPERUSER) {
    user = await prisma.superUser.findUnique({
      where: {
        id,
      },
    })
  }

  if (userType === UserTypeEnum.STAFF) {
    user = await prisma.staff.findUnique({
      where: {
        id,
      },
    })
  }

  if (userType === UserTypeEnum.ADMIN) {
    user = await prisma.staff.findUnique({
      where: {
        id,
        isAdmin: true,
      },
    })
  }

  return user
}
