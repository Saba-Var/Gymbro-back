import { i18nextMiddleware } from 'middlewares/i18next.middleware'
import { verifyToken } from 'middlewares/verifyToken.middleware'
import { superUserRouter } from 'modules/super-user/router'
import { errorHandler } from 'middlewares/errorHandler'
import { NotFoundError } from 'errors/NotFoundError'
import { usersRouter } from 'modules/users/router'
import { authRouter } from 'modules/auth/router'
import { json } from 'body-parser'
import express from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'

dotenv.config()

const server = express()

server.use(i18nextMiddleware)

server.use(json())

server.use('/api', superUserRouter)

server.use('/api', authRouter)

server.use('/api', verifyToken, usersRouter)

server.all('*', () => {
  throw new NotFoundError()
})

server.use(errorHandler)

export { server }
