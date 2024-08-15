import type { EditModelData, ExcludeModelDefaults } from 'types/globals.types'
import type { Staff } from '@prisma/client'

export type StaffCreateData = Omit<ExcludeModelDefaults<Staff>, 'password'>

export type StaffEditData = Omit<
  EditModelData<StaffCreateData, 'companyId'>,
  'password'
>

export type StaffDuplicationCheckData = {
  companyId: number
  staffId: number
  email: string
  phoneNumber: string
  privateNumber: string
}
