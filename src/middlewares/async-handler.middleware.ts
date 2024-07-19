import type { AsyncHandlerFnParameter } from 'middlewares/types'
import type { Request, Response, NextFunction } from 'express'

export const asyncHandler = (fn: AsyncHandlerFnParameter) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
