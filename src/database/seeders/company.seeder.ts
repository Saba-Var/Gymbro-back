import { prisma } from 'config/prisma'
import { CompanyFactory } from 'database/factories/company.factory'

export const companySeeder = async () => {
  const existingCompanies = await prisma.company.findMany()

  if (existingCompanies.length > 0) {
    return
  }

  const companyFactory = new CompanyFactory()
  await companyFactory.create({ count: 10 })
}
