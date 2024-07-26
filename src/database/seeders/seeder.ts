import { companySubscriptionSeeder } from './company-subscription.seeder'
import { staffPermissionSeeder } from './staff-permission.seeder'
import { permissionSeeder } from './permission.seeder'
import { companySeeder } from './company.seeder'
import { rolesSeeder } from './roles.seeder'
import { staffSeeder } from './staff.seeder'

const seeder = async () => {
  try {
    await Promise.all([
      permissionSeeder(),
      companySeeder(),
      staffSeeder(),
      companySubscriptionSeeder(),
      rolesSeeder(),
      staffPermissionSeeder(),
    ])

    console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}

seeder()
