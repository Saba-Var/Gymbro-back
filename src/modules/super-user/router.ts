import { validateRequestSchema } from 'middlewares/validate-request-schema.middleware'
import { asyncHandler } from 'middlewares/async-handler.middleware'
import { verifyToken } from 'middlewares/verifyToken.middleware'
import { createCompanyController } from './controller'
import { createCompanySchema } from './validation'
import express from 'express'

const superUserRouter = express.Router()

superUserRouter.post(
  '/company',
  verifyToken,
  createCompanySchema,
  validateRequestSchema,
  asyncHandler(createCompanyController)
)

superUserRouter.use('/super-user', superUserRouter)
export { superUserRouter }
