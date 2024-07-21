import { CompanySubscriptionFactory } from 'database/factories/company-subscriptions.factory'

export const companySubscriptionSeeder = async () => {
  const companySubscriptionFactory = new CompanySubscriptionFactory()
  await companySubscriptionFactory.create({ count: 50 })
}
