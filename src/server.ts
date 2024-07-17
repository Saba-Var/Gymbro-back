import { superUserRouter } from 'modules/super-user/super-user.router'
import { usersRouter } from 'modules/users/users.router'
import { errorHandler } from 'middlewares/errorHandler'
import { NotFoundError } from 'errors/NotFoundError'
import { json } from 'body-parser'
import express from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'

dotenv.config()

const server = express()
server.use(json())

server.use('/api', superUserRouter)
server.use('/api', usersRouter)

server.all('*', () => {
  throw new NotFoundError()
})

server.use(errorHandler)

export { server }
