import type { Prisma, CompanySubscription } from '@prisma/client'
import { getRandomItem } from 'utils/get-random-item.util'
import { BaseFactory } from './base.factory'
import { faker } from '@faker-js/faker'
import { prisma } from 'config/prisma'

export class CompanySubscriptionFactory extends BaseFactory<
  CompanySubscription,
  Prisma.CompanySubscriptionCreateInput
> {
  async build(attrs: Partial<Prisma.CompanySubscriptionCreateInput> = {}) {
    const startDate = attrs.startDate || faker.date.recent()
    const endDate = attrs.endDate || faker.date.future({ refDate: startDate })

    const companies = await prisma.company.findMany()
    const randomCompany = getRandomItem(companies)!

    return {
      totalPrice:
        attrs.totalPrice ??
        faker.number.float({ min: 100, max: 10000, multipleOf: 0.01 }),
      isActive: attrs.isActive ?? faker.datatype.boolean(),
      company: attrs.company || {
        connect: { id: randomCompany.id },
      },
      startDate,
      endDate,
      ...attrs,
    }
  }

  protected prismaCreate(data: Prisma.CompanySubscriptionCreateInput) {
    return prisma.companySubscription.create({ data })
  }

  async createWithCompany(
    companyId: number,
    attrs: Partial<Prisma.CompanySubscriptionCreateInput> = {}
  ) {
    const data = await this.build({
      ...attrs,
      company: { connect: { id: companyId } },
    })

    return this.prismaCreate(data)
  }
}
