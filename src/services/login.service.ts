import { NotAuthorizedError } from 'errors/NotAuthorizedError'
import { UserActionEnum, UserTypeEnum } from 'enums/user.enums'
import type { AuthJWTPayload } from 'types/globalTypes'
import { trackUserActivity } from './tracking.service'
import type { LoginRequest } from 'types/globalTypes'
import { REFRESH_TOKEN } from 'constants/auth'
import { Password } from 'utils/password'
import type { Response } from 'express'
import { prisma } from 'config/prisma'
import jwt from 'jsonwebtoken'

export const loginService = async (
  req: LoginRequest,
  res: Response,
  userType: UserTypeEnum
) => {
  let isMatch = false

  const { email, password } = req.body

  let currentUser = null

  if (userType == UserTypeEnum.SUPERUSER) {
    currentUser = await prisma.superUser.findFirst({
      where: {
        email,
      },
    })
  }

  if (currentUser) {
    isMatch = await Password.compare(currentUser?.password, password)
  }

  if (!currentUser || !isMatch) {
    throw new NotAuthorizedError()
  }

  const jwtPayload: AuthJWTPayload = {
    id: currentUser.id,
    userType,
    email,
  }

  const accessToken = jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '1d',
  })

  const refreshToken = jwt.sign(jwtPayload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d',
  })

  trackUserActivity({
    actionType: UserActionEnum.LOGIN,
    displayValue: 'Logged in',
    payload: jwtPayload,
    req,
  })

  res.cookie(REFRESH_TOKEN, refreshToken, {
    secure: true,
    maxAge: 14 * 8640000,
    sameSite: 'strict',
    httpOnly: true,
  })

  return res
    .status(200)
    .json({ accessToken, id: currentUser.id, message: req.t('hello') })
}
