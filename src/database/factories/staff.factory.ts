import { getArrayRandomItems } from 'utils/get-random-array-items.util'
import { SalaryType, type Prisma, type Staff } from '@prisma/client'
import { getRandomEnumValue } from 'utils/get-random-enum'
import { getRandomNum } from 'utils/numbers.util'
import { CURRENCIES } from 'config/currencies'
import { Password } from 'utils/password.util'
import { BaseFactory } from './base.factory'
import { prisma } from 'config/prisma'
import { faker } from '@faker-js/faker'

export class StaffFactory extends BaseFactory<Staff, Prisma.StaffCreateInput> {
  async build(
    attrs: Partial<Prisma.StaffCreateInput> = {}
  ): Promise<Prisma.StaffCreateInput> {
    const companies = await prisma.company.findMany()

    const randomCompany = getArrayRandomItems(companies)[0]

    const privateNumber = faker.number
      .int({
        min: 123456,
        max: 999999999999,
      })
      .toString()

    const password = await Password.toHash(privateNumber.toString())
    const currencyId = getRandomNum(CURRENCIES.length)

    return {
      ...attrs,
      company: {
        connect: {
          id: randomCompany?.id,
        },
      },
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      isAdmin: Math.random() >= 0.9,
      privateNumber,
      password,
      salaryType: getRandomEnumValue(SalaryType),
      baseSalary: faker.number.int({ min: 500, max: 10000 }),
      phoneNumber: faker.phone.number(),
      currency: {
        connect: {
          id: currencyId,
        },
      },
      address: faker.location.streetAddress(),
      iban: faker.finance.iban(),
    }
  }

  protected prismaCreate(data: Prisma.StaffCreateInput) {
    return prisma.staff.create({ data })
  }
}
