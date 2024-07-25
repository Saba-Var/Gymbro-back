import type { LoginRequest, AuthJWTPayload } from 'types/globals.types'
import { ActivityLogActionType, UserTypeEnum } from '@prisma/client'
import { NotAuthorizedError } from 'errors/not-authorized.error'
import { trackUserActivity } from 'services/tracking.service'
import { getUserService } from 'modules/users/service'
import { HTTP_OK } from 'constants/http-statuses'
import type { Request, Response } from 'express'
import { generateAuthJwtTokens } from './utils'
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

  const { accessToken, refreshToken } = generateAuthJwtTokens(jwtPayload)

  await trackUserActivity({
    actionType: ActivityLogActionType.LOGIN,
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

  await trackUserActivity({
    actionType: ActivityLogActionType.LOGOUT,
    displayValue: 'Logged out',
    req,
  })

  res.status(HTTP_OK).json({ message: req.t('log_out_success') })
}

export const refreshTokenService = async (refreshToken: string) => {
  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!
  ) as AuthJWTPayload

  if (!decoded) {
    throw new NotAuthorizedError()
  }

  const { id, userType } = decoded

  const existingUser = await getUserService(id, userType)

  if (!existingUser) {
    throw new NotAuthorizedError()
  }

  const payload: AuthJWTPayload = {
    email: existingUser?.email,
    id: existingUser?.id,
    userType,
  }

  const { accessToken: newAccessToken } = generateAuthJwtTokens(payload)

  return newAccessToken
}
