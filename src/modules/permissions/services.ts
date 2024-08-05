import { NotFoundError } from 'errors/not-found.error'
import { ConflictError } from 'errors/conflict.error'
import type { PermissionCreateData } from './types'
import type { Permission } from '@prisma/client'
import type { Query } from 'types/globals.types'
import { paginate } from 'utils/paginate.util'
import { prisma } from 'config/prisma'
import { t } from 'i18next'

export const listPermissionsService = async (query: Query<Permission>) => {
  const paginatedResult = await paginate<Permission>({
    model: 'Permission',
    query,
  })

  return paginatedResult
}

export const addPermissionService = async (data: PermissionCreateData) => {
  const existingPermission = await findPermissionService({
    key: data.key,
  })

  if (existingPermission) {
    throw new ConflictError(t('permission_already_exists'))
  }

  const newPermission = await prisma.permission.create({
    data,
  })

  return newPermission
}

export const findPermissionService = async (
  where: Partial<Permission> = {}
) => {
  const permission = await prisma.permission.findFirst({
    where,
  })

  return permission
}

export const deletePermissionService = async (id: number) => {
  const existingPermission = await findPermissionService({ id })

  if (!existingPermission) {
    throw new NotFoundError(t('permission_not_found'))
  }

  const deletedPermission = await prisma.permission.delete({
    where: {
      id,
    },
  })

  return deletedPermission
}
