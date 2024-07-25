import { asyncHandler } from 'middlewares/async-handler.middleware'
import { listPermissionsController } from './controller'
import express from 'express'

const permissionsRouter = express.Router()

permissionsRouter.get('/', asyncHandler(listPermissionsController))

export { permissionsRouter }
