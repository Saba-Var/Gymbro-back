import { companySubscriptionSeeder } from './company-subscription.seeder'
import { permissionSeeder } from './permission.seeder'
import { companySeeder } from './company.seeder'

const seeder = async () => {
  await Promise.all([
    companySeeder(),
    companySubscriptionSeeder(),
    permissionSeeder(),
  ])
}

seeder()
