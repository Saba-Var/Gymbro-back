import type {
  EditRoleData,
  ModifyStaffPermissionData,
  ModifyStaffRoleData,
  RoleCreateData,
} from './types'
import { HTTP_CREATED, HTTP_OK } from 'constants/http-statuses'
import { trackUserActivity } from 'services/tracking.service'
import type { Query, RequestWithBody } from 'types/globals.types'
import { ActivityLogActionType } from '@prisma/client'
import type { Request, Response } from 'express'
import { t } from 'i18next'
import {
  modifyStaffRolesService,
  createRoleService,
  editRoleService,
  modifyStaffPermissionsService,
  listRolesService,
  deleteRoleService,
} from './services'

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
      displayValue: `Create Role: ${newRole.name}. Role Permissions: ${req.body.permissionIds.join(', ')}`,
      req,
    })
  }

  res.status(HTTP_CREATED).json(newRole)
}

export const listRolesController = async (req: Request, res: Response) => {
  const roles = await listRolesService(req.query as Query)

  res.status(HTTP_OK).json(roles)
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
      displayValue: `Edit RoleId: ${editedRole.id}. ${req.body.permissionIds ? `Role Permissions set: ${req.body.permissionIds.join(', ')}` : ''}`,
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
    displayValue: `Set Staff Roles: ${req.body.roleIds.join(', ')}`,
    req,
  })

  res.status(HTTP_OK).json({ message: t('roles_modified_successfully') })
}

export const modifyStaffPermissionController = async (
  req: RequestWithBody<ModifyStaffPermissionData>,
  res: Response
) => {
  await modifyStaffPermissionsService(
    req.body,
    req.currentUser?.companyId as number
  )

  await trackUserActivity({
    actionType: ActivityLogActionType.UPDATE,
    displayValue: `Set Staff Permission: ${req.body.permissionIds.join(', ')}`,
    req,
  })

  res
    .status(HTTP_OK)
    .json({ message: t('staff_permission_modified_successfully') })
}

export const deleteRoleController = async (req: Request, res: Response) => {
  const roleId = +req.params.id

  await deleteRoleService({
    companyId: req.currentUser?.companyId as number,
    roleId,
  })

  await trackUserActivity({
    actionType: ActivityLogActionType.DELETE,
    displayValue: `Delete RoleId: ${roleId}`,
    req,
  })

  res.status(HTTP_OK).json({ message: t('role_deleted_successfully') })
}
