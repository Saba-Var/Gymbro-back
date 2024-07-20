import { validateRequestSchema } from 'middlewares/validate-request-schema.middleware'
import { asyncHandler } from 'middlewares/async-handler.middleware'
import { verifyToken } from 'middlewares/verifyToken.middleware'
import { companyLogoUpload } from './services'
import express from 'express'
import {
  companySubscriptionValidation,
  createCompanySchema,
  editCompanySubscriptionValidation,
} from './validation'
import {
  attachSubscriptionToCompanyController,
  createCompanyController,
  editCompanySubscriptionController,
} from './controller'

const superUserRouter = express.Router()

superUserRouter.post(
  '/company',
  companyLogoUpload,
  verifyToken,
  createCompanySchema,
  validateRequestSchema,
  asyncHandler(createCompanyController)
)

superUserRouter.post(
  '/company/:companyId/subscription',
  verifyToken,
  companySubscriptionValidation({ makeFieldsRequired: true }),
  validateRequestSchema,
  asyncHandler(attachSubscriptionToCompanyController)
)

superUserRouter.put(
  '/company/:companyId/subscription/:subscriptionId',
  verifyToken,
  editCompanySubscriptionValidation,
  validateRequestSchema,
  asyncHandler(editCompanySubscriptionController)
)

superUserRouter.use('/super-user', superUserRouter)
export { superUserRouter }
