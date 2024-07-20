import type { Company, CompanySubscription } from '@prisma/client'
import type { ExcludeModelDefaults } from 'types/globals.types'

export type CompanyCreateData = ExcludeModelDefaults<Company>

export type CompanySubscriptionData = ExcludeModelDefaults<CompanySubscription>