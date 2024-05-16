import { errorHandler } from 'middlewares/errorHandler'
import { NotFoundError } from 'errors/NotFoundError'
import express from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'

dotenv.config()

const server = express()

server.get('/', (_req, res) => {
  res.send('Hello World!')
})

server.all('*', () => {
  throw new NotFoundError()
})

server.use(errorHandler)

const PORT = process.env.PORT
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`)
})
