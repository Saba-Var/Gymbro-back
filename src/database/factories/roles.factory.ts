import { getArrayRandomItems } from 'utils/get-random-array-items.util'
import type { Prisma, Role } from '@prisma/client'
import { BaseFactory } from './base.factory'
import { faker } from '@faker-js/faker'
import { prisma } from 'config/prisma'

export class RoleFactory extends BaseFactory<Role, Prisma.RoleCreateInput> {
  async build(
    attrs: Partial<Prisma.RoleCreateInput> = {}
  ): Promise<Prisma.RoleCreateInput> {
    const companies = await prisma.company.findMany()
    const companyId = getArrayRandomItems(companies)[0]?.id

    return {
      ...attrs,
      name: faker.person.jobType(),
      description: faker.lorem.sentence(),
      company: {
        connect: {
          id: companyId,
        },
      },
    }
  }

  protected prismaCreate(data: Prisma.RoleCreateInput) {
    return prisma.role.create({ data })
  }
}
