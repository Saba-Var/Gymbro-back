import type { Request, Response } from 'express'
import { logoutService } from './services'

export const logoutController = async (req: Request, res: Response) => {
  logoutService(req, res)
}
