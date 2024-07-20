import { errorHandler } from 'middlewares/error-handler.middleware'
import { i18nextMiddleware } from 'middlewares/i18next.middleware'
import { verifyToken } from 'middlewares/verifyToken.middleware'
import { superUserRouter } from 'modules/super-user/router'
import { NotFoundError } from 'errors/not-found.error'
import { usersRouter } from 'modules/users/router'
import { authRouter } from 'modules/auth/router'
import { json, urlencoded } from 'body-parser'
import express from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const server = express()

server.use(i18nextMiddleware)

server.use('/storage', express.static(path.join(__dirname, '../storage')))

server.use(json())
server.use(urlencoded({ extended: true }))

server.use('/api', authRouter)

server.use('/api', verifyToken, superUserRouter)

server.use('/api', verifyToken, usersRouter)

server.all('*', () => {
  throw new NotFoundError()
})

server.use(errorHandler)

export { server }
