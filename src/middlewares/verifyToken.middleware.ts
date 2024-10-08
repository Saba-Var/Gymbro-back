import { NotAuthorizedError } from 'errors/not-authorized.error'
import type { NextFunction, Request, Response } from 'express'
import type { AuthJWTPayload } from 'types/globals.types'
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
      return next(new NotAuthorizedError())
    }

    return jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!,
      async (error, JwtPayload) => {
        if (error) {
          return next(new NotAuthorizedError())
        }

        const jwtPayload = JwtPayload as AuthJWTPayload

        if (!jwtPayload) {
          return next(new NotAuthorizedError())
        }

        req.currentUser = jwtPayload

        return next()
      }
    )
  } catch (error) {
    return next(error)
  }
}
