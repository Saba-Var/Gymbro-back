import type { Company, CompanySubscription, Role } from '@prisma/client'
import type { ExcludeModelDefaults } from 'types/globals.types'

export type CompanyCreateData = ExcludeModelDefaults<Company>

export type CompanySubscriptionCreationData =
  ExcludeModelDefaults<CompanySubscription>

export type CompanySubscriptionEditData = Partial<
  Omit<CompanySubscriptionCreationData, 'companyId'>
>

export type RoleCreateData = ExcludeModelDefaults<Role>
