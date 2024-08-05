import { addPermissionService, listPermissionsService } from './services'
import type { Query, RequestWithBody } from 'types/globals.types'
import { HTTP_CREATED, HTTP_OK } from 'constants/http-statuses'
import { trackUserActivity } from 'services/tracking.service'
import { ActivityLogActionType } from '@prisma/client'
import type { PermissionCreateData } from './types'
import type { Request, Response } from 'express'

export const listPermissionsController = async (
  req: Request,
  res: Response
) => {
  const permissions = await listPermissionsService(req.query as Query)

  res.status(HTTP_OK).json(permissions)
}

export const addPermissionsController = async (
  req: RequestWithBody<PermissionCreateData>,
  res: Response
) => {
  const newPermission = await addPermissionService(req.body)

  await trackUserActivity({
    req: req,
    displayValue: `Created permission: ${newPermission.id}`,
    actionType: ActivityLogActionType.CREATE,
  })

  res.status(HTTP_CREATED).json(newPermission)
}
