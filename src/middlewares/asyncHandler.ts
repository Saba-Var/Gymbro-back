import type { AsyncHandlerFnParameter } from 'middlewares/types'
import type { Request, Response, NextFunction } from 'express'

export const asyncHandler = (fn: AsyncHandlerFnParameter) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next)
  }
}
