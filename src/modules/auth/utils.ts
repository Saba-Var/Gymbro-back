import type { AuthJWTPayload } from 'types/globals.types'
import { UserTypeEnum } from '@prisma/client'
import { prisma } from 'config/prisma'
import jwt from 'jsonwebtoken'

export const generateAuthJwtTokens = (jwtPayload: AuthJWTPayload) => {
  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env

  const accessToken = jwt.sign(jwtPayload!, ACCESS_TOKEN_SECRET!, {
    expiresIn: '1d',
  })

  const refreshToken = jwt.sign(jwtPayload!, REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d',
  })

  return { accessToken, refreshToken }
}

export const detectUserAndType = async (args: {
  providedUserType: UserTypeEnum
  email: string
}) => {
  const { email, providedUserType } = args

  let userTypePayload: UserTypeEnum | null = null

  let currentUser = null

  if (providedUserType == UserTypeEnum.SUPERUSER) {
    currentUser = await prisma.superUser.findFirst({
      where: {
        email,
      },
    })

    if (currentUser) {
      userTypePayload = UserTypeEnum.SUPERUSER
    }
  }

  if (
    providedUserType == UserTypeEnum.ADMIN ||
    providedUserType === UserTypeEnum.STAFF
  ) {
    currentUser = await prisma.staff.findFirst({
      where: {
        email,
      },
    })

    if (currentUser) {
      userTypePayload = currentUser.isAdmin
        ? UserTypeEnum.ADMIN
        : UserTypeEnum.STAFF
    }
  }

  if (providedUserType === UserTypeEnum.CLIENT) {
    currentUser = await prisma.client.findFirst({
      where: {
        email,
      },
    })

    if (currentUser) {
      userTypePayload = UserTypeEnum.CLIENT
    }
  }

  return { currentUser, userTypePayload }
}
