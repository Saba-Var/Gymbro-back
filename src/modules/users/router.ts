import { asyncHandler } from 'middlewares/async-handler.middleware'
import { currentUserInformationController } from './controller'
import express from 'express'

const usersRouter = express.Router()

usersRouter.get('/me', asyncHandler(currentUserInformationController))

export { usersRouter }
