import { validateRequestSchema } from 'middlewares/validate-request-schema.middleware'
import { onlyAdminAccess } from 'middlewares/only-admin-access.middleware'
import { asyncHandler } from 'middlewares/async-handler.middleware'
import { idParamValidation } from 'validation/id-param.validation'
import { staffValidation } from './validation'
import express from 'express'
import {
  createStaffMemberController,
  deleteStaffController,
  staffListController,
} from './controller'

const staffRouter = express.Router()

staffRouter.post(
  '/',
  staffValidation(),
  validateRequestSchema,
  asyncHandler(createStaffMemberController)
)

staffRouter.get('/', asyncHandler(staffListController))

staffRouter.delete(
  '/:id',
  onlyAdminAccess,
  idParamValidation(),
  validateRequestSchema,
  asyncHandler(deleteStaffController)
)

export { staffRouter }
