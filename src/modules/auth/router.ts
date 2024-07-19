import { verifyToken } from 'middlewares/verifyToken.middleware'
import { asyncHandler } from 'middlewares/asyncHandler'
import { logoutController } from './controllers'
import express from 'express'

const authRouter = express.Router()

authRouter.get('/logout', verifyToken, asyncHandler(logoutController))

authRouter.use('/auth', authRouter)
export { authRouter }
