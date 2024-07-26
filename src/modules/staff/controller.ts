import type { RequestWithBody } from 'types/globals.types'
import { HTTP_CREATED } from 'constants/http-statuses'
import { createStaffMemberService } from './services'
import type { StaffCreateData } from './types'
import type { Response } from 'express'
import { UserTypeEnum } from '@prisma/client'

export const createStaffMemberController = async (
  req: RequestWithBody<StaffCreateData>,
  res: Response
) => {
  req.currentUser?.userType
  const companyId =
    req?.currentUser?.userType === UserTypeEnum.SUPERUSER
      ? req.body.companyId
      : req.currentUser?.companyId

  const newStaffMember = await createStaffMemberService({
    companyId,
    staffCreateData: req.body,
  })

  res.status(HTTP_CREATED).json(newStaffMember)
}
