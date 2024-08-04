import { listPermissionsService } from './services'
import type { Request, Response } from 'express'
import { HTTP_OK } from 'constants/http-statuses'
import type { Query } from 'types/globals.types'

export const listPermissionsController = async (
  req: Request,
  res: Response
) => {
  const permissions = await listPermissionsService(req.query as Query)

  res.status(HTTP_OK).json(permissions)
}
