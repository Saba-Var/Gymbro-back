import {
  createRoleService,
  editRoleService,
  modifyStaffRolesService,
} from './services'
import { HTTP_CREATED, HTTP_OK } from 'constants/http-statuses'
import { trackUserActivity } from 'services/tracking.service'
import type { EditRoleData, ModifyStaffRoleData, RoleCreateData } from './types'
import type { RequestWithBody } from 'types/globals.types'
import { ActivityLogActionType } from '@prisma/client'
import type { Response } from 'express'
import { t } from 'i18next'

export const createRoleController = async (
  req: RequestWithBody<RoleCreateData>,
  res: Response
) => {
  const newRole = await createRoleService(
    req.body,
    req.currentUser?.companyId as number
  )

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
  const editedRole = await editRoleService({
    roleId: +req.params.id,
    roleData: req.body,
    companyId: req.currentUser?.companyId as number,
  })

  if (editedRole) {
    await trackUserActivity({
      actionType: ActivityLogActionType.UPDATE,
      displayValue: `Edit Role: ${editedRole.name}`,
      req,
    })
  }

  res.status(HTTP_OK).json(editedRole)
}

export const modifyStaffRoleController = async (
  req: RequestWithBody<ModifyStaffRoleData>,
  res: Response
) => {
  await modifyStaffRolesService({
    ...req.body,
    companyId: req.currentUser?.companyId as number,
  })

  await trackUserActivity({
    actionType: ActivityLogActionType.UPDATE,
    displayValue: `Modify Staff Roles`,
    staffId: req.currentUser?.id,
    req,
  })

  res.status(HTTP_OK).json({ message: t('roles_modified_successfully') })
}
