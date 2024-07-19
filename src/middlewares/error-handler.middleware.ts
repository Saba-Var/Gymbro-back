import { HTTP_INTERNAL_SERVER_ERROR } from 'constants/http-statuses'
import { errorLoggerHandler } from 'utils/error-logger-handler.util'
import type { Request, Response, NextFunction } from 'express'
import { CustomError } from 'errors/custom.error'

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  errorLoggerHandler(req, error)

  if (error instanceof CustomError) {
    return res.status(error.statusCode).send({
      errors: error.serializeErrors(),
    })
  } else {
    return res.status(HTTP_INTERNAL_SERVER_ERROR).send({
      message: error.message || req.t('something_went_wrong'),
    })
  }
}
