import { currentUserInformationController } from './users.controller'
import { asyncHandler } from 'middlewares/asyncHandler'
import express from 'express'

const usersRouter = express.Router()

usersRouter.get('/me', asyncHandler(currentUserInformationController))

usersRouter.use('/users', usersRouter)
export { usersRouter }
