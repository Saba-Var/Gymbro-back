import { validateRequestSchema } from 'middlewares/validate-request-schema.middleware'
import { asyncHandler } from 'middlewares/async-handler.middleware'
import {
  modifyStaffPermissionController,
  modifyStaffRoleController,
  createRoleController,
  editRoleController,
  listRolesController,
  deleteRoleController,
} from './controller'
import {
  modifyStaffPermissionValidation,
  modifyStaffRoleValidation,
  rolesValidation,
} from './validation'
import express from 'express'
import { idParamValidation } from 'validation/id-param.validation'

const adminRouter = express.Router()

adminRouter.get('/roles', asyncHandler(listRolesController))

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

adminRouter.delete(
  '/roles/:id',
  idParamValidation(),
  validateRequestSchema,
  asyncHandler(deleteRoleController)
)

adminRouter.post(
  '/staff-roles',
  modifyStaffRoleValidation,
  validateRequestSchema,
  asyncHandler(modifyStaffRoleController)
)

adminRouter.post(
  '/staff-permissions',
  modifyStaffPermissionValidation,
  validateRequestSchema,
  asyncHandler(modifyStaffPermissionController)
)

export { adminRouter }
