import type { EditRoleData, RoleCreateData } from './types'
import { NotFoundError } from 'errors/not-found.error'
import { ConflictError } from 'errors/conflict.error'
import { prisma } from 'config/prisma'

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
