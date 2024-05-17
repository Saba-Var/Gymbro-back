import { asyncHandler } from 'middlewares/asyncHandler'
import { getUserData } from 'controllers/user'
import express from 'express'

const userRouter = express.Router()

userRouter.get('/', asyncHandler(getUserData))

export { userRouter }
