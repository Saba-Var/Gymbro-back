import { winstonLogger } from 'config/winstonLogger'
import type { Request } from 'express'
import 'winston-daily-rotate-file'

export const errorLoggerHandler = (req: Request, error: Error) => {
  const message = error?.message || 'Something went wrong'

  if (!req?.url.includes('favicon.ico')) {
    winstonLogger.error(message, {
      user: null, // TODO: Add user
      method: req?.method,
      params: req?.params,
      query: req?.query,
      stack: error?.stack,
      body: req?.body,
      url: req?.url,
      ip: req?.ip,
    })
  }
}
