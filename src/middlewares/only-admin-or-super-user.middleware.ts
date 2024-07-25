import { NotAuthorizedError } from 'errors/not-authorized.error'
import type { NextFunction, Request, Response } from 'express'
import type { AuthJWTPayload } from 'types/globals.types'
import { UserTypeEnum } from '@prisma/client'

export const onlyAdminOrSuperUserAccess = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const jwtPayload = req.currentUser as AuthJWTPayload

    if (
      jwtPayload.userType === UserTypeEnum.SUPERUSER ||
      jwtPayload.userType === UserTypeEnum.ADMIN
    ) {
      return next()
    }

    return next(new NotAuthorizedError())
  } catch (error) {
    return next(error)
  }
}
