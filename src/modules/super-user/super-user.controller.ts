import { loginService } from 'services/login.service'
import type { LoginRequest } from 'types/globalTypes'
import { UserType } from 'enums/userTypes'
import type { Response } from 'express'

export const superUserLoginController = async (
  req: LoginRequest,
  res: Response
) => {
  return loginService(req, res, UserType.SUPERUSER)
}
