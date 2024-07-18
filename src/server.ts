import { superUserRouter } from 'modules/super-user/super-user.router'
import { i18nextMiddleware } from 'middlewares/i18next.middleware'
import { verifyToken } from 'middlewares/verifyToken.middleware'
import { usersRouter } from 'modules/users/users.router'
import { errorHandler } from 'middlewares/errorHandler'
import { NotFoundError } from 'errors/NotFoundError'
import { json } from 'body-parser'
import express from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'

dotenv.config()

const server = express()

server.use(i18nextMiddleware)

server.use(json())

server.use('/api', superUserRouter)

server.use('/api', verifyToken, usersRouter, superUserRouter)

server.all('*', () => {
  throw new NotFoundError()
})

server.use(errorHandler)

export { server }
