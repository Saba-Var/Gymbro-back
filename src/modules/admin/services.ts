import type { PrismaBatchPayload, Query } from 'types/globals.types'
import { BadRequestError } from 'errors/bad-request.error'
import { NotFoundError } from 'errors/not-found.error'
import { ConflictError } from 'errors/conflict.error'
import { paginate } from 'utils/paginate.util'
import type { Role } from '@prisma/client'
import { prisma } from 'config/prisma'
import { t } from 'i18next'
import type {
  ModifyStaffPermissionData,
  ModifyStaffRoleData,
  RoleCreateData,
  EditRoleData,
} from './types'

export const createRoleService = async (
  roleData: RoleCreateData,
  companyId: number
) => {
  const existingRole = await prisma.role.findFirst({
    where: {
      name: roleData.name,
      companyId: companyId,
    },
  })

  if (existingRole) {
    throw new ConflictError()
  }

  const newRole = await prisma.role.create({
    data: { companyId, name: roleData.name, description: roleData.description },
  })

  if (newRole) {
    const permissionIds = roleData.permissionIds.map((permissionId) => ({
      permissionId,
      roleId: newRole.id,
    }))

    await prisma.rolePermission.createMany({
      data: permissionIds,
    })
  }

  return newRole
}

export const listRolesService = async (query: Query<Role>) => {
  const paginatedResult = await paginate<Role>({
    model: 'Role',
    query,
  })

  return paginatedResult
}

export const editRoleService = async (args: {
  roleData: EditRoleData
  roleId: number
  companyId: number
}) => {
  const [existingRole, duplicateRole] = await Promise.all([
    prisma.role.findFirst({
      where: {
        id: args.roleId,
        companyId: args.companyId,
      },
    }),
    prisma.role.findFirst({
      where: {
        id: {
          not: args.roleId,
        },
        name: args.roleData.name,
        companyId: args.companyId,
      },
    }),
  ])

  if (!existingRole) {
    throw new NotFoundError()
  }

  if (duplicateRole) {
    throw new ConflictError()
  }

  const updatedRole = await prisma.role.update({
    where: {
      id: args.roleId,
      companyId: args.companyId,
    },
    data: {
      name: args.roleData.name,
      description: args.roleData.description,
    },
  })

  if (Array.isArray(args.roleData.permissionIds)) {
    if (args.roleData.permissionIds.length > 0) {
      await Promise.all([
        prisma.rolePermission.deleteMany({
          where: {
            roleId: args.roleId,
          },
        }),
        prisma.rolePermission.createMany({
          data: args.roleData.permissionIds.map((permissionId) => ({
            permissionId,
            roleId: args.roleId,
          })),
        }),
      ])
    } else {
      await prisma.rolePermission.deleteMany({
        where: {
          roleId: args.roleId,
        },
      })
    }
  }

  return updatedRole
}

export const modifyStaffRolesService = async (args: ModifyStaffRoleData) => {
  const [existingStaff, existingStaffRoles] = await Promise.all([
    prisma.staff.findFirst({
      where: {
        id: args.staffId,
        companyId: args.companyId,
      },
    }),
    prisma.staffRole.findMany({
      where: {
        staffId: args.staffId,
        role: {
          companyId: args.companyId,
        },
      },
    }),
  ])

  if (existingStaff?.isAdmin) {
    return new BadRequestError(t('cant_modify_admin_role'))
  }

  const existingRoleIds = existingStaffRoles.map((role) => role.roleId)

  const rolesToAdd = args.roleIds.filter(
    (roleId) => !existingRoleIds.includes(roleId)
  )

  const roles = await prisma.role.findMany({
    where: {
      id: {
        in: args.roleIds,
      },
      companyId: args.companyId,
    },
  })

  if (roles.length !== args.roleIds.length) {
    throw new NotFoundError(t('role_not_found'))
  }

  const rolesToRemove = existingRoleIds.filter(
    (roleId) => !args.roleIds.includes(roleId)
  )

  const operations: PrismaBatchPayload[] = []

  if (rolesToAdd.length > 0) {
    operations.push(
      prisma.staffRole.createMany({
        data: rolesToAdd.map((roleId) => ({
          roleId,
          staffId: args.staffId,
        })),
      })
    )
  }

  if (rolesToRemove.length > 0) {
    operations.push(
      prisma.staffRole.deleteMany({
        where: {
          staffId: args.staffId,
          roleId: {
            in: rolesToRemove,
          },
          role: {
            companyId: args.companyId,
          },
        },
      })
    )
  }

  await Promise.all(operations)
}

export const modifyStaffPermissionsService = async (
  args: ModifyStaffPermissionData,
  companyId: number
) => {
  const { permissionIds, staffId } = args

  const [staff, existingPermissions] = await Promise.all([
    prisma.staff.findFirst({
      where: {
        id: staffId,
        companyId,
      },
    }),
    prisma.staffPermission.findMany({
      where: {
        staffId,
      },
    }),
  ])

  if (!staff) {
    throw new NotFoundError(t('staff_not_found'))
  }

  if (staff.isAdmin) {
    throw new BadRequestError(t('cant_modify_admin_permission'))
  }

  const existingPermissionIds = existingPermissions.map(
    (permission) => permission.permissionId
  )

  const permissionsToAdd = permissionIds.filter(
    (permissionId) => !existingPermissionIds.includes(permissionId)
  )

  const permissionsToRemove = existingPermissionIds.filter(
    (permissionId) => !permissionIds.includes(permissionId)
  )

  const operations: PrismaBatchPayload[] = []

  if (permissionsToAdd.length > 0) {
    operations.push(
      prisma.staffPermission.createMany({
        data: permissionsToAdd.map((permissionId) => ({
          permissionId,
          staffId,
        })),
      })
    )
  }

  if (permissionsToRemove.length > 0) {
    operations.push(
      prisma.staffPermission.deleteMany({
        where: {
          staffId,
          permissionId: {
            in: permissionsToRemove,
          },
        },
      })
    )
  }

  await Promise.all(operations)
}

export const deleteRoleService = async (data: {
  roleId: number
  companyId: number
}) => {
  const role = await prisma.role.findFirst({
    where: {
      id: data.roleId,
      companyId: data.companyId,
    },
  })

  if (!role) {
    throw new NotFoundError()
  }

  await prisma.role.delete({
    where: {
      id: data.roleId,
      companyId: data.companyId,
    },
  })
}
