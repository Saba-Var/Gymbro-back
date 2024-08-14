import type { Currency, Prisma } from '@prisma/client'
import { BaseFactory } from './base.factory'
import { prisma } from 'config/prisma'

export class CurrencyFactory extends BaseFactory<
  Currency,
  Prisma.CurrencyCreateInput
> {
  async build(
    attrs: Partial<Prisma.CurrencyCreateInput> = {}
  ): Promise<Prisma.CurrencyCreateInput> {
    return {
      ...attrs,
      code: attrs.code!,
      name: attrs.name!,
      symbol: attrs.symbol!,
    }
  }

  protected prismaCreate(data: Prisma.CurrencyCreateInput) {
    return prisma.currency.create({ data })
  }
}
