import type { Prisma, StaffPermission } from '@prisma/client'
import { BaseFactory } from './base.factory'
import { prisma } from 'config/prisma'

export class StaffPermissionFactory extends BaseFactory<
  StaffPermission,
  Prisma.StaffPermissionCreateInput
> {
  constructor(
    private staffId: number,
    private permissionId: number
  ) {
    super()
  }

  async build(
    attrs: Partial<Prisma.StaffPermissionCreateInput> = {}
  ): Promise<Prisma.StaffPermissionCreateInput> {
    return {
      ...attrs,
      staff: {
        connect: {
          id: this.staffId,
        },
      },
      permission: {
        connect: {
          id: this.permissionId,
        },
      },
    }
  }

  protected prismaCreate(data: Prisma.StaffPermissionCreateInput) {
    return prisma.staffPermission.create({ data })
  }
}
