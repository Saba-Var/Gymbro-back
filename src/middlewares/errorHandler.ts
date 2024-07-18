import type { Request, Response, NextFunction } from 'express'
import { errorLoggerHandler } from 'utils/errorLoggerHandler'
import { CustomError } from 'errors/CustomError'
import { HTTP_INTERNAL_SERVER_ERROR } from 'constants/http-statuses'

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
