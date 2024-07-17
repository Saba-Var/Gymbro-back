import { validateRequestSchema } from 'middlewares/validate-request-schema.middleware'
import { loginValidationSchema } from 'validation/login.validation'
import { superUserLoginController } from './super-user.controller'
import { asyncHandler } from 'middlewares/asyncHandler'
import express from 'express'

const superUserRouter = express.Router()

superUserRouter.post(
  '/login',
  loginValidationSchema,
  validateRequestSchema,
  asyncHandler(superUserLoginController)
)

superUserRouter.use('/admin', superUserRouter)
export { superUserRouter }
