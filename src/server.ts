import { onlyAdminOrSuperUserAccess } from 'middlewares/only-admin-or-super-user.middleware'
import { onlySuperUserAccess } from 'middlewares/only-super-user-access.middleware'
import { onlyAdminAccess } from 'middlewares/only-admin-access.middleware'
import { errorHandler } from 'middlewares/error-handler.middleware'
import { i18nextMiddleware } from 'middlewares/i18next.middleware'
import { verifyToken } from 'middlewares/verifyToken.middleware'
import { permissionsRouter } from 'modules/permissions/router'
import { superUserRouter } from 'modules/super-user/router'
import { currencyRouter } from 'modules/currencies/router'
import { companiesRouter } from 'modules/companies/router'
import { NotFoundError } from 'errors/not-found.error'
import { staffRouter } from 'modules/staff/router'
import { adminRouter } from 'modules/admin/router'
import { usersRouter } from 'modules/users/router'
import { authRouter } from 'modules/auth/router'
import { json, urlencoded } from 'body-parser'
import { initCronJobs } from 'crons/crons'
import configuredCors from 'config/cors'
import cookieParser from 'cookie-parser'
import express from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const server = express()

initCronJobs()

server.use(i18nextMiddleware)

server.use(json())
server.use(urlencoded({ extended: true }))
server.use(cookieParser())

server.use(configuredCors)

server.use('/storage', express.static(path.join(__dirname, '../storage')))

server.use('/api/auth', authRouter)

server.use('/api/super-user', verifyToken, onlySuperUserAccess, superUserRouter)

server.use('/api/admin', verifyToken, onlyAdminOrSuperUserAccess, adminRouter)

server.use(
  '/api/permissions',
  verifyToken,
  onlyAdminOrSuperUserAccess,
  permissionsRouter
)

server.use('/api/users', verifyToken, usersRouter)

server.use('/api/staff', verifyToken, onlyAdminOrSuperUserAccess, staffRouter)

server.use('/api/currencies', verifyToken, currencyRouter)

server.use('/api/companies', verifyToken, companiesRouter)

server.all('*', () => {
  throw new NotFoundError()
})

server.use(errorHandler)

export { server }
