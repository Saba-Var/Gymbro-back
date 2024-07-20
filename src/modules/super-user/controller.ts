import type { CompanyCreateData, CompanySubscriptionData } from './types'
import { trackUserActivity } from 'services/tracking.service'
import type { RequestWithBody } from 'types/globals.types'
import { HTTP_CREATED } from 'constants/http-statuses'
import { UserActionEnum } from 'enums/user.enums'
import type { Response } from 'express'
import {
  attachSubscriptionToCompanyService,
  createCompanyService,
} from './services'

export const createCompanyController = async (
  req: RequestWithBody<CompanyCreateData>,
  res: Response
) => {
  const newCompany = await createCompanyService({
    ...req.body,
    logo: req.file?.path || '',
  })

  trackUserActivity({
    actionType: UserActionEnum.CREATE,
    displayValue: `Company: ${newCompany.title}`,
    req,
  })

  res.status(HTTP_CREATED).json(newCompany)
}

export const attachSubscriptionToCompanyController = async (
  req: RequestWithBody<CompanySubscriptionData>,
  res: Response
) => {
  const newSubscription = await attachSubscriptionToCompanyService(req.body)

  trackUserActivity({
    actionType: UserActionEnum.CREATE,
    displayValue: `Subscription: ${newSubscription.id}`,
    req,
  })

  res.status(HTTP_CREATED).json(newSubscription)
}
