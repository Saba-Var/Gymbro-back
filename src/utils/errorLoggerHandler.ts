import { format, createLogger, transports } from 'winston'
import type { Request } from 'express'
import 'winston-daily-rotate-file'

const { combine, timestamp, label } = format

const fileRotateTransport = new transports.DailyRotateFile({
  filename: 'logs/rotate-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
})

const logger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'Log Rotation' }),
    timestamp({
      format: 'ddd-DD-MMM-YYYY MM-DD-YYYY HH:mm:ss',
    }),
    format.prettyPrint()
  ),
  transports: [fileRotateTransport, new transports.Console()],
  silent: process.env.NODE_ENV === 'test',
})

export const errorLoggerHandler = (req: Request, error: Error) => {
  const message = error?.message || 'Something went wrong'

  logger.error(message, {
    user: null, // TODO: Add user
    method: req?.method,
    params: req?.params,
    query: req?.query,
    stack: error?.stack,
    body: req?.body,
    url: req?.url,
  })
}
