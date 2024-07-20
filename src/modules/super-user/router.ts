import { validateRequestSchema } from 'middlewares/validate-request-schema.middleware'
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
} from './controller'

const superUserRouter = express.Router()

superUserRouter.post(
  '/company',
  companyLogoUpload,
  createCompanySchema,
  validateRequestSchema,
  asyncHandler(createCompanyController)
)

superUserRouter.post(
  '/company/:companyId/subscriptions',
  companySubscriptionValidation({ makeFieldsRequired: true }),
  validateRequestSchema,
  asyncHandler(attachSubscriptionToCompanyController)
)

superUserRouter.put(
  '/company/:companyId/subscriptions/:subscriptionId',
  editCompanySubscriptionValidation,
  validateRequestSchema,
  asyncHandler(editCompanySubscriptionController)
)

superUserRouter.get(
  '/company/:companyId/subscriptions',
  editCompanySubscriptionValidation,
  idParamValidation({ fieldName: 'companyId' }),
  asyncHandler(listCompanySubscriptionController)
)

superUserRouter.use('/super-user', superUserRouter)
export { superUserRouter }
