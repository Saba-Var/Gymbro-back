import { validateRequestSchema } from 'middlewares/validate-request-schema.middleware'
import { asyncHandler } from 'middlewares/async-handler.middleware'
import { idParamValidation } from 'validation/id-param.validation'
import { findCompanyController } from './controller'
import express from 'express'

const companiesRouter = express.Router()

companiesRouter.get(
  '/:id',
  idParamValidation(),
  validateRequestSchema,
  asyncHandler(findCompanyController)
)

export { companiesRouter }
