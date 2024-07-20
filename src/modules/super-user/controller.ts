import { HTTP_CREATED, HTTP_OK } from 'constants/http-statuses'
import { trackUserActivity } from 'services/tracking.service'
import type { RequestWithBody } from 'types/globals.types'
import { UserActionEnum } from 'enums/user.enums'
import type { Request, Response } from 'express'
import type {
  CompanySubscriptionCreationData,
  CompanySubscriptionEditData,
  CompanyCreateData,
} from './types'
import {
  attachSubscriptionToCompanyService,
  listCompanySubscriptionsService,
  editCompanySubscriptionService,
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
  req: RequestWithBody<CompanySubscriptionCreationData>,
  res: Response
) => {
  const newSubscription = await attachSubscriptionToCompanyService({
    ...req.body,
    companyId: +req.params.companyId,
  })

  trackUserActivity({
    actionType: UserActionEnum.CREATE,
    displayValue: `Subscription: ${newSubscription.id}`,
    req,
  })

  res.status(HTTP_CREATED).json(newSubscription)
}

export const editCompanySubscriptionController = async (
  req: RequestWithBody<CompanySubscriptionEditData>,
  res: Response
) => {
  const companyId = +req.params.companyId
  const subscriptionId = +req.params.subscriptionId

  const updatedSubscription = await editCompanySubscriptionService(
    req.body,
    companyId,
    subscriptionId
  )

  trackUserActivity({
    actionType: UserActionEnum.UPDATE,
    displayValue: `Subscription: ${updatedSubscription.id}`,
    req,
  })

  res.status(HTTP_OK).json(updatedSubscription)
}

export const listCompanySubscriptionController = async (
  req: Request,
  res: Response
) => {
  const companySubscriptions = await listCompanySubscriptionsService(
    +req.params.companyId
  )

  res.status(HTTP_OK).json(companySubscriptions)
}
