import { NotAuthorizedError } from 'errors/not-authorized.error'
import type { NextFunction, Request, Response } from 'express'
import type { AuthJWTPayload } from 'types/globals.types'
import { UserTypeEnum } from 'enums/user.enums'

export const onlySuperUserAccess = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const jwtPayload = req.currentUser as AuthJWTPayload

    if (jwtPayload.userType !== UserTypeEnum.SUPERUSER) {
      return next(new NotAuthorizedError())
    }

    return next()
  } catch (error) {
    return next(error)
  }
}
