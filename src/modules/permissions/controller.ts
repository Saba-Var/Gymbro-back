import { listPermissionsService } from './services'
import type { Request, Response } from 'express'
import { HTTP_OK } from 'constants/http-statuses'

export const listPermissionsController = async (
  _req: Request,
  res: Response
) => {
  const permissions = await listPermissionsService()

  res.status(HTTP_OK).json(permissions)
}
