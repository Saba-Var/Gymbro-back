import { HTTP_UNPROCESSABLE_ENTITY } from 'constants/http-statuses'
import type { NextFunction, Request, Response } from 'express'
import type { TransformedErrors } from 'types/globals.types'
import { validationResult } from 'express-validator'

export const validateRequestSchema = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)

  const transformedErrors: TransformedErrors = {}

  errors.array().forEach((error) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { path, msg } = error
    if (!transformedErrors[path]) {
      transformedErrors[path] = []
    }
    transformedErrors[path].push(req.t(msg))
  })

  if (!errors.isEmpty()) {
    return res
      .status(HTTP_UNPROCESSABLE_ENTITY)
      .json({ errors: transformedErrors })
  }

  return next()
}
