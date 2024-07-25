import { validateRequestSchema } from 'middlewares/validate-request-schema.middleware'
import { asyncHandler } from 'middlewares/async-handler.middleware'
import { verifyToken } from 'middlewares/verifyToken.middleware'
import { loginValidationSchema } from './validation'
import express from 'express'
import {
  refreshTokenController,
  logoutController,
  loginController,
} from './controllers'

const authRouter = express.Router()

authRouter.post(
  '/login',
  loginValidationSchema,
  validateRequestSchema,
  asyncHandler(loginController)
)

authRouter.get('/logout', verifyToken, asyncHandler(logoutController))

authRouter.get('/refresh', asyncHandler(refreshTokenController))

export { authRouter }
