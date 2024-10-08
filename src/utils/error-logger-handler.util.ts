import { winstonLogger } from 'config/winston-logger'
import type { Request } from 'express'
import 'winston-daily-rotate-file'

export const errorLoggerHandler = (req: Request, error: Error) => {
  const message = error?.message || req.t('something_went_wrong')

  if (
    !req?.url.includes('favicon.ico') &&
    process.env.NODE_ENV !== 'local-testing'
  ) {
    winstonLogger.error(message, {
      user: req?.currentUser,
      method: req?.method,
      params: req?.params,
      query: req?.query,
      body: req?.body,
      url: req?.url,
      ip: req?.ip,
      error,
    })
  }
}
