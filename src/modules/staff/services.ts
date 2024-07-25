import { ConflictError } from 'errors/conflict.error'
import { Password } from 'utils/password.util'
import type { StaffCreateData } from './types'
import { prisma } from 'config/prisma'
import { t } from 'i18next'

export const createStaffMemberService = async (args: {
  staffCreateData: StaffCreateData
  companyId: number
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
