import { validateRequestSchema } from 'middlewares/validate-request-schema.middleware'
import { createCompanyController, superUserLoginController } from './controller'
import { loginValidationSchema } from 'validation/login.validation'
import { verifyToken } from 'middlewares/verifyToken.middleware'
import { asyncHandler } from 'middlewares/asyncHandler'
import { createCompanySchema } from './validation'
import express from 'express'

const superUserRouter = express.Router()

superUserRouter.post(
  '/login',
  loginValidationSchema,
  validateRequestSchema,
  asyncHandler(superUserLoginController)
)

superUserRouter.post(
  '/company',
  verifyToken,
  createCompanySchema,
  validateRequestSchema,
  asyncHandler(createCompanyController)
)

superUserRouter.use('/super-user', superUserRouter)
export { superUserRouter }
