import type { EditModelData, ExcludeModelDefaults } from 'types/globals.types'
import type { Role } from '@prisma/client'

export type RoleCreateData = ExcludeModelDefaults<Role>

export type EditRoleData = EditModelData<Role, 'companyId'>
