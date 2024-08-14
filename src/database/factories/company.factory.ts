import type { Company, Prisma } from '@prisma/client'
import { getRandomNum } from 'utils/numbers.util'
import { BaseFactory } from './base.factory'
import { faker } from '@faker-js/faker'
import { prisma } from 'config/prisma'

export class CompanyFactory extends BaseFactory<
  Company,
  Prisma.CompanyCreateInput
> {
  async build(attrs: Partial<Prisma.CompanyCreateInput> = {}) {
    const currencyId = getRandomNum(3)

    return {
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.country(),
      email: faker.internet.email(),
      title: faker.company.name(),
      websiteUrl: faker.internet.url(),
      description: faker.company.catchPhrase(),
      currencyId,
      ...attrs,
    }
  }

  protected prismaCreate(data: Prisma.CompanyCreateInput) {
    return prisma.company.create({ data })
  }
}
