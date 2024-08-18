import type { StaffCreateData, StaffDuplicationCheckData } from './types'
import { ConflictError } from 'errors/conflict.error'
import { NotFoundError } from 'errors/not-found.error'
import type { Query } from 'types/globals.types'
import { Password } from 'utils/password.util'
import { paginate } from 'utils/paginate.util'
import type { Staff } from '@prisma/client'
import { prisma } from 'config/prisma'
import { t } from 'i18next'

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
      password: hashedPassword,
      email: staffCreateData.email,
      firstName: staffCreateData.firstName,
      lastName: staffCreateData.lastName,
      phoneNumber: staffCreateData.phoneNumber,
      privateNumber: staffCreateData.privateNumber,
      salaryType: staffCreateData.salaryType,
      companyId: companyId!,
      currencyId: staffCreateData.currencyId,
      isAdmin: staffCreateData.isAdmin,
      baseSalary: staffCreateData.baseSalary,
      address: staffCreateData.address,
      iban: staffCreateData.iban,
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...newStaffWithoutPassword } = newStaff

  return newStaffWithoutPassword
}

export const updateStaffMemberService = async (args: {
  staffCreateData: Partial<StaffCreateData>
  companyId: number
  staffId: number
}) => {
  const { companyId, staffCreateData, staffId } = args

  const existingStaff = await findStaffService({
    companyId,
    staffId,
  })

  const duplicate = await checkStaffDuplicateService({
    companyId,
    staffId: staffId!,
    email: staffCreateData.email!,
    phoneNumber: staffCreateData.phoneNumber!,
    privateNumber: staffCreateData.privateNumber!,
  })

  if (duplicate) {
    throw new ConflictError(t('staff_with_provided_information_already_exists'))
  }

  if (!existingStaff) {
    throw new NotFoundError()
  }

  const updatedStaff = await prisma.staff.update({
    where: {
      id: staffId!,
    },
    data: { ...staffCreateData, companyId },
  })

  return updatedStaff
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
      address: true,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      roles: true,
      permissions: true,
      iban: true,
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

export const checkStaffDuplicateService = async (
  args: StaffDuplicationCheckData
) => {
  const duplicateStaff = await prisma.staff.findFirst({
    where: {
      companyId: args.companyId,
      OR: [
        { email: args.email },
        { privateNumber: args.privateNumber },
        { phoneNumber: args.phoneNumber },
      ],
      NOT: {
        id: args.staffId,
      },
    },
  })

  return duplicateStaff
}
