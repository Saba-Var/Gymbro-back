import { companyIdExtractorFromRequest } from 'utils/companyIdExtractorFromRequest'
import type { Query, RequestWithBody } from 'types/globals.types'
import { HTTP_CREATED, HTTP_OK } from 'constants/http-statuses'
import { trackUserActivity } from 'services/tracking.service'
import { ActivityLogActionType } from '@prisma/client'
import type { Request, Response } from 'express'
import { t } from 'i18next'
import type {
  ModifyStaffPermissionData,
  ModifyStaffRoleData,
  RoleCreateData,
  EditRoleData,
} from './types'
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

  res.status(HTTP_CREATED).json({ message: t('role_created_successfully') })
}

export const listRolesController = async (req: Request, res: Response) => {
  const roles = await listRolesService(
    req.query as Query,
    req.currentUser?.companyId as number
  )

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

  res.status(HTTP_OK).json({ message: t('role_updated_successfully') })
}

export const modifyStaffRoleController = async (
  req: RequestWithBody<ModifyStaffRoleData>,
  res: Response
) => {
  await modifyStaffRolesService(
    req.body,
    +req.params.staffId,
    +(req?.currentUser?.companyId ?? 0) as number
  )

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
    req.currentUser?.companyId as number,
    +req.params.staffId
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

export const modifyStaffRoleAndPermissionController = async (
  req: RequestWithBody<
    ModifyStaffPermissionData & ModifyStaffRoleData & { companyId?: number }
  >,
  res: Response
) => {
  const companyId = companyIdExtractorFromRequest(req)

  const ids = {
    companyId,
    staffId: +req.params.staffId,
  }

  await modifyStaffRolesService(
    {
      roleIds: req.body.roleIds,
    },
    ids.staffId,
    ids.companyId
  )

  await modifyStaffPermissionsService(
    {
      permissionIds: req.body.permissionIds,
    },
    ids.companyId,
    ids.staffId
  )

  await trackUserActivity({
    actionType: ActivityLogActionType.UPDATE,
    displayValue: `Set Staff Roles: ${req.body.roleIds.join(', ')}. Set Staff Permission: ${req.body.permissionIds.join(', ')}`,
    req,
  })

  res
    .status(HTTP_OK)
    .json({ message: t('staff_role_permission_modified_successfully') })
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
