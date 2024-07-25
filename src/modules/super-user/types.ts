import type { EditModelData, ExcludeModelDefaults } from 'types/globals.types'
import type { Company, CompanySubscription } from '@prisma/client'

export type CompanyCreateData = ExcludeModelDefaults<Company>

export type CompanySubscriptionCreationData =
  ExcludeModelDefaults<CompanySubscription>

export type CompanySubscriptionEditData = EditModelData<
  CompanySubscriptionCreationData,
  'companyId'
>
