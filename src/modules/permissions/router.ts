import { onlySuperUserAccess } from 'middlewares/only-super-user-access.middleware'
import { validateRequestSchema } from 'middlewares/validate-request-schema.middleware'
import { asyncHandler } from 'middlewares/async-handler.middleware'
import { modifyPermissionValidation } from './validation'
import express from 'express'
import {
  addPermissionsController,
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

export { permissionsRouter }
