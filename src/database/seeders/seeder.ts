import { companySubscriptionSeeder } from './company-subscription.seeder'
import { staffPermissionSeeder } from './staff-permission.seeder'
import { rolePermissionSeeder } from './role-permission.seeder'
import { permissionSeeder } from './permission.seeder'
import { staffRoleSeeder } from './staff-role.seeder'
import { currenciesSeeder } from './currency.seeder'
import { companySeeder } from './company.seeder'
import { rolesSeeder } from './roles.seeder'
import { staffSeeder } from './staff.seeder'

const seeder = async () => {
  try {
    await Promise.all([
      currenciesSeeder(),
      permissionSeeder(),
      companySeeder(),
      staffSeeder(),
      companySubscriptionSeeder(),
      rolesSeeder(),
      rolePermissionSeeder(),
      staffPermissionSeeder(),
      staffRoleSeeder(),
    ])

    console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}

seeder()
