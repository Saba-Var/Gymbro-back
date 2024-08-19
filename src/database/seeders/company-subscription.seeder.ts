import { CompanySubscriptionFactory } from 'database/factories/company-subscriptions.factory'
import { prisma } from 'config/prisma'
import dotenv from 'dotenv'

dotenv.config()

export const companySubscriptionSeeder = async () => {
  const existingCompanySubscriptions =
    await prisma.companySubscription.findMany()

  if (existingCompanySubscriptions.length > 0) {
    return
  }

  const companySubscriptionFactory = new CompanySubscriptionFactory()
  await companySubscriptionFactory.create({ count: 50 })
}
