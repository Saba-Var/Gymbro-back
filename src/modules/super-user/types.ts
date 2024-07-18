import type { ExcludeModelDefaults } from 'types/globalTypes'
import type { Company } from '@prisma/client'

export type CompanyCreateData = ExcludeModelDefaults<Company>
