import type { ExcludeModelDefaults } from 'types/globals.types'
import type { Currency } from '@prisma/client'

export const CURRENCIES: (ExcludeModelDefaults<Currency> & { id: number })[] = [
  {
    symbol: '$',
    name: 'US Dollar',
    code: 'USD',
    id: 1,
  },
  {
    symbol: '€',
    name: 'Euro',
    code: 'EUR',
    id: 2,
  },
  {
    symbol: '₾',
    name: 'Georgian Lari',
    code: 'GEL',
    id: 3,
  },
]
