import { errorHandler } from 'middlewares/errorHandler'
import { NotFoundError } from 'errors/NotFoundError'
import { userRouter } from 'routes/user'
import express from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'

dotenv.config()

const server = express()

server.get('/', (_req, res) => {
  res.send('Hello World!')
})

server.use('/user', userRouter)

server.all('*', () => {
  throw new NotFoundError()
})

server.use(errorHandler)

export { server }
