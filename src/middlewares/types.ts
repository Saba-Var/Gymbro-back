import type { Request, Response, NextFunction } from 'express'

export type AsyncHandlerFnParameter = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | Promise<Response<unknown, Record<string, unknown>>>
