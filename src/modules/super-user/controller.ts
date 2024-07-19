import { trackUserActivity } from 'services/tracking.service'
import type { RequestWithBody } from 'types/globalTypes'
import { HTTP_CREATED } from 'constants/http-statuses'
import { createCompanyService } from './services'
import { UserActionEnum } from 'enums/user.enums'
import type { CompanyCreateData } from './types'
import type { Response } from 'express'

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
