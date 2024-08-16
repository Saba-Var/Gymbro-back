import type { Request, Response } from 'express'
import { findCompanyService } from './services'
import { HTTP_OK } from 'constants/http-statuses'

export const findCompanyController = async (req: Request, res: Response) => {
  const companyId = +req.params.id

  const company = await findCompanyService(companyId)

  res.status(HTTP_OK).json(company)
}
