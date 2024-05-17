import { validateRequest } from 'middlewares/validateRequest'
import { asyncHandler } from 'middlewares/asyncHandler'
import { signInValidation } from 'validation/sign-in'
import { signIn } from 'controllers/auth'
import express from 'express'

const authRouter = express.Router()

authRouter.post(
  '/sign-in',
  signInValidation,
  validateRequest,
  asyncHandler(signIn)
)

export { authRouter }
