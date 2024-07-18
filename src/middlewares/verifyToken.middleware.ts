import { NotAuthorizedError } from 'errors/NotAuthorizedError'
import type { NextFunction, Request, Response } from 'express'
import type { AuthJWTPayload } from 'types/globalTypes'
import jwt from 'jsonwebtoken'

export const verifyToken = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { authorization, Authorization } = req.headers

    const authHeader = (authorization || Authorization || '') as string

    const accessToken = authHeader?.trim()?.split(' ')?.[1]

    if (!authHeader.startsWith('Bearer ') || !accessToken) {
      throw new NotAuthorizedError()
    }

    return jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!,
      async (error, JwtPayload) => {
        if (error) {
          throw new NotAuthorizedError()
        }

        const jwtPayload = JwtPayload as AuthJWTPayload

        if (!jwtPayload) {
          throw new NotAuthorizedError()
        }

        req.currentUser = jwtPayload

        return next()
      }
    )
  } catch (error) {
    return next(error)
  }
}
