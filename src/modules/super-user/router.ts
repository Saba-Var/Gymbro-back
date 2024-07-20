import { validateRequestSchema } from 'middlewares/validate-request-schema.middleware'
import { asyncHandler } from 'middlewares/async-handler.middleware'
import { verifyToken } from 'middlewares/verifyToken.middleware'
import { companyLogoUpload } from './services'
import express from 'express'
import {
  companySubscriptionValidation,
  createCompanySchema,
} from './validation'
import {
  attachSubscriptionToCompanyController,
  createCompanyController,
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
  '/company/subscription',
  verifyToken,
  companySubscriptionValidation(),
  validateRequestSchema,
  asyncHandler(attachSubscriptionToCompanyController)
)

superUserRouter.use('/super-user', superUserRouter)
export { superUserRouter }
