import type { EditModelData, ExcludeModelDefaults } from 'types/globals.types'
import type { Role } from '@prisma/client'

export type RoleCreateData = Omit<ExcludeModelDefaults<Role>, 'companyId'>

export type EditRoleData = EditModelData<Role, 'companyId'>

export type ModifyStaffRoleData = {
  roleIds: number[]
  staffId: number
  companyId: number
}
