import type { AuthJWTPayload } from 'types/globalTypes'
import type { LoginRequest } from './types'
import { UserType } from 'enums/userTypes'
import { Password } from 'utils/password'
import type { Response } from 'express'
import { prisma } from 'config/prisma'
import jwt from 'jsonwebtoken'

export const superUserLoginController = async (
  req: LoginRequest,
  res: Response
) => {
  let isMatch = false

  const { email, password } = req.body

  const currentSuperUser = await prisma.superUser.findFirst({
    where: {
      email,
    },
  })

  if (currentSuperUser) {
    isMatch = await Password.compare(currentSuperUser?.password, password)
  }

  if (!currentSuperUser || !isMatch) {
    return res.status(401).json({
      message: 'credentials_are_incorrect',
    })
  }

  const jwtPayload: AuthJWTPayload = {
    userType: UserType.SUPERUSER,
    id: currentSuperUser.id,
    email,
  }

  const accessToken = jwt.sign(jwtPayload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '1d',
  })

  const refreshToken = jwt.sign(jwtPayload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d',
  })

  res.cookie('refreshToken', refreshToken, {
    secure: true,
    maxAge: 14 * 8640000,
    sameSite: 'strict',
    httpOnly: true,
  })

  return res.status(200).json({ accessToken, id: currentSuperUser.id })
}
