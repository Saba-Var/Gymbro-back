import { RequestValidationError } from 'errors/RequestValidationError'
import type { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const validateRequest = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }

  return next()
}
