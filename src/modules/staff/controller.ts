import {
  createStaffMemberService,
  deleteStaffService,
  listStaffService,
  updateStaffMemberService,
} from './services'
import { ActivityLogActionType, UserTypeEnum } from '@prisma/client'
import type { Query, RequestWithBody } from 'types/globals.types'
import { trackUserActivity } from 'services/tracking.service'
import { HTTP_CREATED, HTTP_OK } from 'constants/http-statuses'
import type { Request, Response } from 'express'
import type { StaffCreateData } from './types'
import { t } from 'i18next'

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

  await trackUserActivity({
    req,
    actionType: ActivityLogActionType.CREATE,
    displayValue: `Create new staff with id - ${newStaffMember.id}`,
  })

  res
    .status(HTTP_CREATED)
    .json({ message: t('staff_created_successfully'), id: newStaffMember.id })
}

export const updateStaffMemberController = async (
  req: RequestWithBody<Partial<StaffCreateData>>,
  res: Response
) => {
  const updatedStaffMember = await updateStaffMemberService({
    companyId: req?.currentUser?.companyId as number,
    staffId: +req.params.id,
    staffCreateData: req.body,
  })

  await trackUserActivity({
    req,
    actionType: ActivityLogActionType.UPDATE,
    displayValue: `Update staff with id - ${updatedStaffMember.id}`,
  })

  res.status(HTTP_OK).json({ message: t('staff_updated_successfully') })
}

export const staffListController = async (req: Request, res: Response) => {
  const staffList = await listStaffService(
    req.query as Query,
    req?.currentUser?.companyId as number
  )

  res.status(HTTP_OK).json(staffList)
}

export const deleteStaffController = async (req: Request, res: Response) => {
  const staffId = +req.params.id

  await deleteStaffService({
    companyId: req?.currentUser?.companyId as number,
    staffId,
  })

  await trackUserActivity({
    req,
    actionType: ActivityLogActionType.DELETE,
    displayValue: `Delete staff with id - ${staffId}`,
  })

  res.status(HTTP_OK).json({ message: t('staff_deleted_successfully') })
}
