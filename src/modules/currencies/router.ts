import { asyncHandler } from 'middlewares/async-handler.middleware'
import { getCurrenciesListController } from './controller'
import express from 'express'

const currencyRouter = express.Router()

currencyRouter.get('/', asyncHandler(getCurrenciesListController))

export { currencyRouter }
