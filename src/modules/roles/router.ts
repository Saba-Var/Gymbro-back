import { validateRequestSchema } from 'middlewares/validate-request-schema.middleware'
import { createRoleController, editRoleController } from './controller'
import { asyncHandler } from 'middlewares/async-handler.middleware'
import { rolesValidation } from './validation'
import express from 'express'

const rolesRouter = express.Router()

rolesRouter.post(
  '/roles',
  rolesValidation(),
  validateRequestSchema,
  asyncHandler(createRoleController)
)

rolesRouter.put(
  '/roles/:id',
  rolesValidation({ makeFieldsRequired: false }),
  validateRequestSchema,
  asyncHandler(editRoleController)
)

rolesRouter.use('/roles', rolesRouter)
export { rolesRouter }
