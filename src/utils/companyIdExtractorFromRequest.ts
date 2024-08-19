import { UserTypeEnum } from '@prisma/client'
import type { Request } from 'express'

export const companyIdExtractorFromRequest = (req: Request): number => {
  const companyId =
    req?.currentUser?.userType === UserTypeEnum.SUPERUSER
      ? req.body.companyId
      : req.currentUser?.companyId

  return companyId as number
}
