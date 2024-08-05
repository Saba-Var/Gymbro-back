import { validateRequestSchema } from 'middlewares/validate-request-schema.middleware'
import { onlySuperUserAccess } from 'middlewares/only-super-user-access.middleware'
import { asyncHandler } from 'middlewares/async-handler.middleware'
import { idParamValidation } from 'validation/id-param.validation'
import { modifyPermissionValidation } from './validation'
import express from 'express'
import {
  addPermissionsController,
  deletePermissionsController,
  listPermissionsController,
} from './controller'

const permissionsRouter = express.Router()

permissionsRouter.get('/', asyncHandler(listPermissionsController))

permissionsRouter.post(
  '/',
  onlySuperUserAccess,
  modifyPermissionValidation,
  validateRequestSchema,
  asyncHandler(addPermissionsController)
)

permissionsRouter.delete(
  '/:id',
  onlySuperUserAccess,
  idParamValidation(),
  validateRequestSchema,
  asyncHandler(deletePermissionsController)
)

export { permissionsRouter }
