import { UserTypeEnum } from 'enums/user.enums'
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

  return user
}
