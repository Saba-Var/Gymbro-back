import { companySubscriptionSeeder } from './company-subscription.seeder'
import { companySeeder } from './company.seeder'

const seeder = async () => {
  await companySeeder()
  await companySubscriptionSeeder()
}

seeder()
