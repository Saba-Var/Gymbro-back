import { onlyAdminOrSuperUserAccess } from 'middlewares/only-admin-or-super-user.middleware'
import { validateRequestSchema } from 'middlewares/validate-request-schema.middleware'
import { asyncHandler } from 'middlewares/async-handler.middleware'
import { createStaffMemberController } from './controller'
import { staffValidation } from './validation'
import express from 'express'

const staffRouter = express.Router()

staffRouter.post(
  '/',
  staffValidation(),
  validateRequestSchema,
  onlyAdminOrSuperUserAccess,
  asyncHandler(createStaffMemberController)
)

export { staffRouter }
