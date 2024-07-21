import type { Company, Prisma } from '@prisma/client'
import { BaseFactory } from './base.factory'
import { faker } from '@faker-js/faker'
import { prisma } from 'config/prisma'

export class CompanyFactory extends BaseFactory<
  Company,
  Prisma.CompanyCreateInput
> {
  async build(
    attrs: Partial<Prisma.CompanyCreateInput> = {}
  ): Promise<Prisma.CompanyCreateInput> {
    return {
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.country(),
      email: faker.internet.email(),
      title: faker.company.name(),
      websiteUrl: faker.internet.url(),
      description: faker.company.catchPhrase(),
      ...attrs,
    }
  }

  protected prismaCreate(data: Prisma.CompanyCreateInput): Promise<Company> {
    return prisma.company.create({ data })
  }
}
