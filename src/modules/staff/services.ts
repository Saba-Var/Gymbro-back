import { ConflictError } from 'errors/conflict.error'
import { Password } from 'utils/password.util'
import type { StaffCreateData } from './types'
import { prisma } from 'config/prisma'
import { t } from 'i18next'
import type { Query } from 'types/globals.types'
import type { Staff } from '@prisma/client'
import { paginate } from 'utils/paginate.util'
import { NotFoundError } from 'errors/not-found.error'

export const createStaffMemberService = async (args: {
  staffCreateData: StaffCreateData
  companyId?: number
}) => {
  const { companyId, staffCreateData } = args

  const existingStaff = await prisma.staff.findFirst({
    where: {
      companyId,
      OR: [
        { email: staffCreateData.email },
        { privateNumber: staffCreateData.privateNumber },
        { phoneNumber: staffCreateData.phoneNumber },
      ],
    },
  })

  if (existingStaff) {
    throw new ConflictError(t('staff_already_exists'))
  }

  const hashedPassword = await Password.toHash(staffCreateData.privateNumber)

  const newStaff = await prisma.staff.create({
    data: {
      ...staffCreateData,
      password: hashedPassword,
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...newStaffWithoutPassword } = newStaff

  return newStaffWithoutPassword
}

export const listStaffService = async (
  query: Query<Staff>,
  companyId: number
) => {
  const paginatedResult = await paginate<Staff>({
    model: 'Staff',
    query,
    where: {
      companyId,
    },
    select: {
      baseSalary: true,
      companyId: true,
      createdAt: true,
      email: true,
      currencyId: true,
      firstName: true,
      id: true,
      isAdmin: true,
      lastActivityAt: true,
      lastName: true,
      password: false,
      phoneNumber: true,
      privateNumber: true,
      salaryType: true,
      updatedAt: true,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      roles: {
        include: {
          role: true,
        },
      },
    },
  })

  return paginatedResult
}

export const deleteStaffService = async (args: {
  staffId: number
  companyId: number
}) => {
  const existingStaff = await findStaffService({
    staffId: args.staffId,
    companyId: args.companyId,
  })

  if (existingStaff) {
    await prisma.staff.delete({
      where: {
        id: existingStaff.id,
        companyId: existingStaff.companyId,
      },
    })
  }
}

export const findStaffService = async (args: {
  staffId: number
  companyId: number
}) => {
  const staff = await prisma.staff.findFirst({
    where: {
      id: args.staffId,
      companyId: args.companyId,
    },
  })

  if (!staff) {
    throw new NotFoundError()
  }

  return staff
}
