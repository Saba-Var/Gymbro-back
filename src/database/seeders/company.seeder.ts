import { CompanyFactory } from 'database/factories/company.factory'

export const companySeeder = async () => {
  const companyFactory = new CompanyFactory()
  await companyFactory.create({ count: 10 })
}
