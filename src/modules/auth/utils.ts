import type { AuthJWTPayload } from 'types/globals.types'
import jwt from 'jsonwebtoken'

export const generateAuthJwtTokens = (jwtPayload: AuthJWTPayload) => {
  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env

  const accessToken = jwt.sign(jwtPayload, ACCESS_TOKEN_SECRET!, {
    expiresIn: '1d',
  })

  const refreshToken = jwt.sign(jwtPayload, REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d',
  })

  return { accessToken, refreshToken }
}
