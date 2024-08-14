import { validateRequestSchema } from 'middlewares/validate-request-schema.middleware'
import { createStaffMemberController, staffListController } from './controller'
import { asyncHandler } from 'middlewares/async-handler.middleware'
import { staffValidation } from './validation'
import express from 'express'

const staffRouter = express.Router()

staffRouter.post(
  '/',
  staffValidation(),
  validateRequestSchema,
  asyncHandler(createStaffMemberController)
)

staffRouter.get('/', asyncHandler(staffListController))

export { staffRouter }
