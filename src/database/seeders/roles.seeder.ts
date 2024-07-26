import { RoleFactory } from 'database/factories/roles.factory'
import { prisma } from 'config/prisma'

export const rolesSeeder = async () => {
  const existingRoles = await prisma.role.findMany()

  if (existingRoles.length > 0) {
    return
  }

  const rolesFactory = new RoleFactory()
  await rolesFactory.create({ count: 10 })
}
