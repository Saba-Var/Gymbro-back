import { CURRENCIES } from 'config/currencies'
import { prisma } from 'config/prisma'

export const currenciesSeeder = async () => {
  await prisma.currency.createMany({
    data: CURRENCIES,
    skipDuplicates: true,
  })
}
