import { prisma } from 'config/prisma'

export const listPermissionsService = async () => {
  const permissions = await prisma.permission.findMany({
    select: {
      id: true,
      key: true,
    },
  })

  return permissions
}
