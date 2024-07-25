import type { Company, CompanySubscription, Role } from '@prisma/client'
import type { EditModelData, ExcludeModelDefaults } from 'types/globals.types'

export type CompanyCreateData = ExcludeModelDefaults<Company>

export type CompanySubscriptionCreationData =
  ExcludeModelDefaults<CompanySubscription>

export type CompanySubscriptionEditData = EditModelData<
  CompanySubscriptionCreationData,
  'companyId'
>

export type RoleCreateData = ExcludeModelDefaults<Role>

export type EditRoleData = EditModelData<Role, 'companyId'>
