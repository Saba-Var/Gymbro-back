import { getArrayRandomItems } from 'utils/get-random-array-items.util'
import { prisma } from 'config/prisma'

export const rolePermissionSeeder = async () => {
  const existingRolePermissions = await prisma.rolePermission.findMany()

  if (existingRolePermissions.length > 0) {
    return
  }

  const [roles, permissions] = await Promise.all([
    prisma.role.findMany(),
    prisma.permission.findMany(),
  ])

  const rolePermissionsToCreate = roles.flatMap((role) => {
    const randomPermissions = getArrayRandomItems(permissions, {
      count: Math.floor(Math.random() * 6) + 1,
    })

    return randomPermissions.map((permission) => ({
      roleId: role.id,
      permissionId: permission.id,
    }))
  })

  await prisma.rolePermission.createMany({
    data: rolePermissionsToCreate,
    skipDuplicates: true,
  })
}
