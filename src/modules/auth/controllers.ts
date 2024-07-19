import { loginService, logoutService } from './services'
import type { LoginRequest } from 'types/globalTypes'
import type { Request, Response } from 'express'

export const loginController = async (req: LoginRequest, res: Response) => {
  loginService(req, res)
}

export const logoutController = async (req: Request, res: Response) => {
  logoutService(req, res)
}
