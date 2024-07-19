import type { LoginRequest, AuthJWTPayload } from 'types/globalTypes'
import { UserActionEnum, UserTypeEnum } from 'enums/user.enums'
import { NotAuthorizedError } from 'errors/not-authorized.error'
import { trackUserActivity } from 'services/tracking.service'
import { HTTP_OK } from 'constants/http-statuses'
import type { Request, Response } from 'express'
import { REFRESH_TOKEN } from 'constants/auth'
import { Password } from 'utils/password.util'
import { prisma } from 'config/prisma'
import jwt from 'jsonwebtoken'

export const loginService = async (req: LoginRequest, res: Response) => {
  let isMatch = false

  const { email, password, userType } = req.body

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

  res.status(HTTP_OK).json({ accessToken, id: currentUser.id })
}

export const logoutService = async (req: Request, res: Response) => {
  res.clearCookie(REFRESH_TOKEN, {
    secure: true,
    sameSite: 'strict',
    httpOnly: true,
  })

  trackUserActivity({
    actionType: UserActionEnum.LOGOUT,
    displayValue: 'Logged out',
    req,
  })

  res.status(HTTP_OK).json({ message: req.t('log_out_success') })
}
