import { getArrayRandomItems } from 'utils/get-random-array-items.util'
import { prisma } from 'config/prisma'

export const staffPermissionSeeder = async () => {
  const existingStaffPermissions = await prisma.staffPermission.findMany()

  if (existingStaffPermissions.length > 0) {
    return
  }

  const [staffMembers, permissions] = await Promise.all([
    prisma.staff.findMany({
      where: {
        isAdmin: false,
      },
    }),
    prisma.permission.findMany(),
  ])

  const staffPermissionsToCreate = staffMembers.flatMap((staff) => {
    const randomPermissions = getArrayRandomItems(permissions, {
      count: Math.floor(Math.random() * 6) + 1,
    })

    return randomPermissions.map((permission) => ({
      staffId: staff.id,
      permissionId: permission.id,
    }))
  })

  await prisma.staffPermission.createMany({
    data: staffPermissionsToCreate,
    skipDuplicates: true,
  })
}
