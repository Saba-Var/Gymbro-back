import type { EditRoleData, RoleCreateData } from './types'
import { ConflictError } from 'errors/conflict.error'
import { NotFoundError } from 'errors/not-found.error'
import { prisma } from 'config/prisma'

export const createRoleService = async (roleData: RoleCreateData) => {
  const existingRole = await prisma.role.findFirst({
    where: {
      name: roleData.name,
    },
  })

  if (existingRole) {
    throw new ConflictError()
  }

  const newRole = await prisma.role.create({
    data: roleData,
  })

  return newRole
}

export const editRoleService = async (roleData: EditRoleData, id: number) => {
  const existingRole = await prisma.role.findFirst({
    where: {
      id,
    },
  })

  if (!existingRole) {
    throw new NotFoundError()
  }

  const duplicateRole = await prisma.role.findFirst({
    where: {
      id: {
        not: id,
      },
      name: roleData.name,
    },
  })

  if (duplicateRole) {
    throw new ConflictError()
  }

  const updatedRole = await prisma.role.update({
    where: {
      id,
    },
    data: {
      name: roleData.name,
      description: roleData.description,
    },
  })

  return updatedRole
}
