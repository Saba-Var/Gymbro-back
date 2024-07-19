import type { LoginRequest, RequestWithBody } from 'types/globalTypes'
import { UserActionEnum, UserTypeEnum } from 'enums/user.enums'
import { trackUserActivity } from 'services/tracking.service'
import { HTTP_CREATED } from 'constants/http-statuses'
import { loginService } from 'services/auth.service'
import { createCompanyService } from './service'
import type { CompanyCreateData } from './types'
import type { Response } from 'express'

export const superUserLoginController = async (
  req: LoginRequest,
  res: Response
) => {
  return loginService(req, res, UserTypeEnum.SUPERUSER)
}

export const createCompanyController = async (
  req: RequestWithBody<CompanyCreateData>,
  res: Response
) => {
  const newCompany = await createCompanyService(req.body)

  trackUserActivity({
    actionType: UserActionEnum.CREATE,
    displayValue: `Company: ${newCompany.title}`,
    req,
  })

  res.status(HTTP_CREATED).json(newCompany)
}
