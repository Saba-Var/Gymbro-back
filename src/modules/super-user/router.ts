import { validateRequestSchema } from 'middlewares/validate-request-schema.middleware'
import { paginationValidation } from 'validation/pagination.validation'
import { asyncHandler } from 'middlewares/async-handler.middleware'
import { idParamValidation } from 'validation/id-param.validation'
import { companyLogoUpload } from './services'
import express from 'express'
import {
  editCompanySubscriptionValidation,
  companySubscriptionValidation,
  createCompanySchema,
} from './validation'
import {
  attachSubscriptionToCompanyController,
  editCompanySubscriptionController,
  createCompanyController,
  listCompanySubscriptionController,
  companyListingController,
  listAllCompaniesSubscriptionsController,
} from './controller'

const superUserRouter = express.Router()

superUserRouter.post(
  '/companies',
  companyLogoUpload,
  createCompanySchema,
  validateRequestSchema,
  asyncHandler(createCompanyController)
)

superUserRouter.get('/companies', asyncHandler(companyListingController))

superUserRouter.get(
  '/companies/subscriptions',
  paginationValidation,
  validateRequestSchema,
  asyncHandler(listAllCompaniesSubscriptionsController)
)

superUserRouter.post(
  '/companies/:companyId/subscriptions',
  companySubscriptionValidation({ makeFieldsRequired: true }),
  validateRequestSchema,
  asyncHandler(attachSubscriptionToCompanyController)
)

superUserRouter.put(
  '/companies/:companyId/subscriptions/:subscriptionId',
  editCompanySubscriptionValidation,
  validateRequestSchema,
  asyncHandler(editCompanySubscriptionController)
)

superUserRouter.get(
  '/companies/:companyId/subscriptions',
  editCompanySubscriptionValidation,
  idParamValidation({ fieldName: 'companyId' }),
  asyncHandler(listCompanySubscriptionController)
)

superUserRouter.use('/super-user', superUserRouter)
export { superUserRouter }
