import { validateRequestSchema } from 'middlewares/validate-request-schema.middleware'
import { loginValidationSchema } from 'validation/login.validation'
import { loginController, logoutController } from './controllers'
import { verifyToken } from 'middlewares/verifyToken.middleware'
import { asyncHandler } from 'middlewares/asyncHandler'
import express from 'express'

const authRouter = express.Router()

authRouter.post(
  '/login',
  loginValidationSchema,
  validateRequestSchema,
  asyncHandler(loginController)
)

authRouter.get('/logout', verifyToken, asyncHandler(logoutController))

authRouter.use('/auth', authRouter)
export { authRouter }
