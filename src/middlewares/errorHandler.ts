import type { Request, Response, NextFunction } from 'express'
import { errorLoggerHandler } from 'utils/errorLoggerHandler'
import { CustomError } from 'errors/CustomError'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  errorLoggerHandler(req, err)

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({
      errors: err.serializeErrors(),
    })
  } else {
    return res.status(500).send({
      message: err.message || 'Something went wrong',
    })
  }
}
