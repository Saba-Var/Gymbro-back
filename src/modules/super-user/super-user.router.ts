import { superUserLoginController } from './super-user.controller'
import { asyncHandler } from 'middlewares/asyncHandler'
import express from 'express'

const superUserRouter = express.Router()

superUserRouter.post('/login', asyncHandler(superUserLoginController))

superUserRouter.use('/admin', superUserRouter)
export { superUserRouter }
