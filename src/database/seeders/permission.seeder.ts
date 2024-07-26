import { PERMISSIONS } from 'config/permissions'
import { prisma } from 'config/prisma'

export const permissionSeeder = async () => {
  try {
    const existingPermission = await prisma.permission.findMany()

    if (existingPermission.length > 0) {
      return
    }

    const results = await Promise.all(
      PERMISSIONS.map(async (permission) => {
        const existingPermission = await prisma.permission.findFirst({
          where: { key: permission },
        })

        if (existingPermission) {
          return { status: 'skipped', key: permission }
        }

        await prisma.permission.create({
          data: { key: permission },
        })

        return { status: 'created', key: permission }
      })
    )

    const created = results.filter((r) => r.status === 'created').length
    const skipped = results.filter((r) => r.status === 'skipped').length

    console.log(`Seeding completed. Created: ${created}, Skipped: ${skipped}`)
  } catch (error) {
    console.error('Error seeding permissions:', error)
  }
}
