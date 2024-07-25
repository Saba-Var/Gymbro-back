import { createRoleService, editRoleService } from './services'
import { HTTP_CREATED, HTTP_OK } from 'constants/http-statuses'
import { trackUserActivity } from 'services/tracking.service'
import type { EditRoleData, RoleCreateData } from './types'
import type { RequestWithBody } from 'types/globals.types'
import { ActivityLogActionType } from '@prisma/client'
import type { Response } from 'express'

export const createRoleController = async (
  req: RequestWithBody<RoleCreateData>,
  res: Response
) => {
  const newRole = await createRoleService(req.body)

  if (newRole) {
    await trackUserActivity({
      actionType: ActivityLogActionType.CREATE,
      displayValue: `Create Role: ${newRole.name}`,
      req,
    })
  }

  res.status(HTTP_CREATED).json(newRole)
}

export const editRoleController = async (
  req: RequestWithBody<EditRoleData>,
  res: Response
) => {
  const editedRole = await editRoleService(req.body, +req.params.id)

  if (editedRole) {
    await trackUserActivity({
      actionType: ActivityLogActionType.UPDATE,
      displayValue: `Edit Role: ${editedRole.name}`,
      req,
    })
  }

  res.status(HTTP_OK).json(editedRole)
}
