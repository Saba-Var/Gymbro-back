import { loginService } from 'services/login.service'
import type { LoginRequest } from 'types/globalTypes'
import { UserTypeEnum } from 'enums/user.enum'
import type { Response } from 'express'

export const superUserLoginController = async (
  req: LoginRequest,
  res: Response
) => {
  return loginService(req, res, UserTypeEnum.SUPERUSER)
}
