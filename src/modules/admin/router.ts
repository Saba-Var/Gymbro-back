import { validateRequestSchema } from 'middlewares/validate-request-schema.middleware'
import { modifyStaffRoleValidation, rolesValidation } from './validation'
import { asyncHandler } from 'middlewares/async-handler.middleware'
import express from 'express'
import {
  modifyStaffRoleController,
  createRoleController,
  editRoleController,
} from './controller'

const adminRouter = express.Router()

adminRouter.post(
  '/roles',
  rolesValidation(),
  validateRequestSchema,
  asyncHandler(createRoleController)
)

adminRouter.put(
  '/roles/:id',
  rolesValidation({ makeFieldsRequired: false }),
  validateRequestSchema,
  asyncHandler(editRoleController)
)

adminRouter.post(
  '/staff-roles',
  modifyStaffRoleValidation,
  validateRequestSchema,
  asyncHandler(modifyStaffRoleController)
)

export { adminRouter }
