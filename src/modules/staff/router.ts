import { validateRequestSchema } from 'middlewares/validate-request-schema.middleware'
import { asyncHandler } from 'middlewares/async-handler.middleware'
import { idParamValidation } from 'validation/id-param.validation'
import { staffValidation } from './validation'
import express from 'express'
import {
  createStaffMemberController,
  deleteStaffController,
  staffListController,
  updateStaffMemberController,
} from './controller'

const staffRouter = express.Router()

staffRouter.post(
  '/',
  staffValidation(),
  validateRequestSchema,
  asyncHandler(createStaffMemberController)
)

staffRouter.get('/', asyncHandler(staffListController))

staffRouter.put(
  '/:id',
  staffValidation({ makeFieldsRequired: false }),
  validateRequestSchema,
  asyncHandler(updateStaffMemberController)
)

staffRouter.delete(
  '/:id',
  idParamValidation(),
  validateRequestSchema,
  asyncHandler(deleteStaffController)
)

export { staffRouter }
