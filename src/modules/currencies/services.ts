import { prisma } from 'config/prisma'

export const getCurrenciesService = async () => {
  const currencies = await prisma.currency.findMany()

  return currencies
}
