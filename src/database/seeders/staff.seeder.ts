import { StaffFactory } from 'database/factories/staff.factory'
import { prisma } from 'config/prisma'

export const staffSeeder = async () => {
  const existingStaff = await prisma.staff.findMany()

  if (existingStaff.length > 0) {
    return
  }

  const staffFactory = new StaffFactory()
  await staffFactory.create({ count: 100 })
}
