import type { ExcludeModelDefaults } from 'types/globals.types'
import type { Company } from '@prisma/client'

export type CompanyCreateData = ExcludeModelDefaults<Company>
