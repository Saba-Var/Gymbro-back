import type { Request, Response, NextFunction } from 'express'

type AsyncHandlerFnParameter = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | Promise<Response<unknown, Record<string, unknown>>>

export const asyncHandler = (fn: AsyncHandlerFnParameter) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next)
  }
}
