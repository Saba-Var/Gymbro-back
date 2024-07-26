import { companySubscriptionSeeder } from './company-subscription.seeder'
import { permissionSeeder } from './permission.seeder'
import { companySeeder } from './company.seeder'
import { rolesSeeder } from './roles.seeder'
import { staffSeeder } from './staff.seeder'

const seeder = async () => {
  await Promise.all([
    companySeeder(),
    staffSeeder(),
    companySubscriptionSeeder(),
    permissionSeeder(),
    rolesSeeder(),
  ])

  console.log('Database seeded successfully!')
}

seeder()
