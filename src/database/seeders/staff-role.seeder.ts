import { getArrayRandomItems } from 'utils/get-random-array-items.util'
import { prisma } from 'config/prisma'

export const staffRoleSeeder = async () => {
  const existingStaffRoles = await prisma.staffRole.findMany()

  if (existingStaffRoles.length > 0) {
    return
  }

  const companies = await prisma.company.findMany()

  companies.forEach(async (company) => {
    const staffMembers = await prisma.staff.findMany({
      where: {
        isAdmin: false,
        companyId: company.id,
      },
    })

    const companyRoles = await prisma.role.findMany({
      where: {
        companyId: company.id,
      },
    })

    staffMembers.forEach(async (staff) => {
      const randomRoles = getArrayRandomItems(companyRoles, {
        count: Math.floor(Math.random() * 3) + 1,
      })

      const staffRolesToCreate = randomRoles.map((role) => ({
        staffId: staff.id,
        roleId: role.id,
      }))

      await prisma.staffRole.createMany({
        data: staffRolesToCreate,
        skipDuplicates: true,
      })
    })
  })
}
