import type { ExcludeModelDefaults, EditModelData } from 'types/globals.types'
import type { Role } from '@prisma/client'

export type permissionIds = {
  permissionIds: number[]
}

type RoleData = Role & permissionIds

export type RoleCreateData = Omit<ExcludeModelDefaults<RoleData>, 'companyId'>

export type EditRoleData = EditModelData<RoleData, 'companyId'>

export type ModifyStaffRoleData = {
  roleIds: number[]
  staffId: number
  companyId: number
}
