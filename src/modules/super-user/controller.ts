import type { Query, RequestWithBody } from 'types/globals.types'
import { HTTP_CREATED, HTTP_OK } from 'constants/http-statuses'
import { trackUserActivity } from 'services/tracking.service'
import { ActivityLogActionType } from '@prisma/client'
import type { Request, Response } from 'express'
import type {
  CompanySubscriptionCreationData,
  CompanySubscriptionEditData,
  CompanyCreateData,
  RoleCreateData,
  EditRoleData,
} from './types'
import {
  attachSubscriptionToCompanyService,
  listCompanySubscriptionsService,
  editCompanySubscriptionService,
  createCompanyService,
  listCompaniesService,
  listAllCompaniesSubscriptionsService,
  createRoleService,
  editRoleService,
} from './services'

export const createCompanyController = async (
  req: RequestWithBody<CompanyCreateData>,
  res: Response
) => {
  const newCompany = await createCompanyService({
    ...req.body,
    logo: req.file?.path || '',
  })

  await trackUserActivity({
    actionType: ActivityLogActionType.CREATE,
    displayValue: `Company: ${newCompany.title}`,
    req,
  })

  res.status(HTTP_CREATED).json(newCompany)
}

export const companyListingController = async (req: Request, res: Response) => {
  const companies = await listCompaniesService(req.query as Query)

  res.status(HTTP_OK).json(companies)
}

export const attachSubscriptionToCompanyController = async (
  req: RequestWithBody<CompanySubscriptionCreationData>,
  res: Response
) => {
  const newSubscription = await attachSubscriptionToCompanyService({
    ...req.body,
    companyId: +req.params.companyId,
  })

  await trackUserActivity({
    actionType: ActivityLogActionType.CREATE,
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

  await trackUserActivity({
    actionType: ActivityLogActionType.UPDATE,
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
    +req.params.companyId,
    req.query as Query
  )

  res.status(HTTP_OK).json(companySubscriptions)
}

export const listAllCompaniesSubscriptionsController = async (
  req: Request,
  res: Response
) => {
  const companySubscriptions = await listAllCompaniesSubscriptionsService(
    req.query as Query
  )

  res.status(HTTP_OK).json(companySubscriptions)
}

export const createRoleController = async (
  req: RequestWithBody<RoleCreateData>,
  res: Response
) => {
  const newRole = await createRoleService(req.body)

  if (newRole) {
    await trackUserActivity({
      actionType: ActivityLogActionType.CREATE,
      displayValue: `Create Role: ${newRole.name}`,
      req,
    })
  }

  res.status(HTTP_CREATED).json(newRole)
}

export const editRoleController = async (
  req: RequestWithBody<EditRoleData>,
  res: Response
) => {
  const editedRole = await editRoleService(req.body, +req.params.id)

  if (editedRole) {
    await trackUserActivity({
      actionType: ActivityLogActionType.UPDATE,
      displayValue: `Edit Role: ${editedRole.name}`,
      req,
    })
  }

  res.status(HTTP_OK).json(editedRole)
}
