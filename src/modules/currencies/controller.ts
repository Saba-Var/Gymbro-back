import type { Request, Response } from 'express'
import { getCurrenciesService } from './services'
import { HTTP_OK } from 'constants/http-statuses'

export const getCurrenciesListController = async (
  _req: Request,
  res: Response
) => {
  const currencies = await getCurrenciesService()

  res.status(HTTP_OK).json(currencies)
}
