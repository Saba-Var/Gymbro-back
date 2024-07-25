import { NotAuthorizedError } from 'errors/not-authorized.error'
import type { NextFunction, Request, Response } from 'express'
import type { AuthJWTPayload } from 'types/globals.types'
import { UserTypeEnum } from '@prisma/client'

export const onlyAdminAccess = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const jwtPayload = req.currentUser as AuthJWTPayload

    if (jwtPayload.userType !== UserTypeEnum.ADMIN) {
      return next(new NotAuthorizedError())
    }

    return next()
  } catch (error) {
    return next(error)
  }
}
