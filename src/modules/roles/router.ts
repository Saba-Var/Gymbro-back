import { validateRequestSchema } from 'middlewares/validate-request-schema.middleware'
import { createRoleController, editRoleController } from './controller'
import { asyncHandler } from 'middlewares/async-handler.middleware'
import { rolesValidation } from './validation'
import express from 'express'

const rolesRouter = express.Router()

rolesRouter.post(
  '/',
  rolesValidation(),
  validateRequestSchema,
  asyncHandler(createRoleController)
)

rolesRouter.put(
  '/:id',
  rolesValidation({ makeFieldsRequired: false }),
  validateRequestSchema,
  asyncHandler(editRoleController)
)

export { rolesRouter }
