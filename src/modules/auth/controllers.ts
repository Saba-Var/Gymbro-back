import { loginService, logoutService, refreshTokenService } from './services'
import type { LoginRequest } from 'types/globals.types'
import { HTTP_OK } from 'constants/http-statuses'
import type { Request, Response } from 'express'

export const loginController = async (req: LoginRequest, res: Response) => {
  return loginService(req, res)
}

export const logoutController = async (req: Request, res: Response) => {
  return logoutService(req, res)
}

export const refreshTokenController = async (req: Request, res: Response) => {
  const newAccessToken = await refreshTokenService(req.cookies?.refreshToken)
  return res.status(HTTP_OK).json({ accessToken: newAccessToken })
}
