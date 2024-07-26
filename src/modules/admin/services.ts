import type { EditRoleData, ModifyStaffRoleData, RoleCreateData } from './types'
import { BadRequestError } from 'errors/bad-request.error'
import { NotFoundError } from 'errors/not-found.error'
import { ConflictError } from 'errors/conflict.error'
import type { Prisma } from '@prisma/client'
import { prisma } from 'config/prisma'
import { t } from 'i18next'

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
    data: { ...roleData, companyId },
  })

  return newRole
}

export const editRoleService = async (args: {
  roleData: EditRoleData
  roleId: number
  companyId: number
}) => {
  const existingRole = await prisma.role.findFirst({
    where: {
      id: args.roleId,
    },
  })

  if (!existingRole) {
    throw new NotFoundError()
  }

  const duplicateRole = await prisma.role.findFirst({
    where: {
      id: {
        not: args.roleId,
      },
      name: args.roleData.name,
    },
  })

  if (duplicateRole) {
    throw new ConflictError()
  }

  const updatedRole = await prisma.role.update({
    where: {
      id: args.roleId,
    },
    data: {
      name: args.roleData.name,
      description: args.roleData.description,
    },
  })

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

  const operations: Prisma.PrismaPromise<Prisma.BatchPayload>[] = []

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
