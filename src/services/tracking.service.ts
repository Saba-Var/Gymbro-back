import { type ActivityLogActionType, UserTypeEnum } from '@prisma/client'
import type { AuthJWTPayload } from 'types/globals.types'
import { prisma } from 'config/prisma'
import type { Request } from 'express'

export const trackUserActivity = async (args: {
  payload?: AuthJWTPayload
  actionType: ActivityLogActionType
  displayValue: string
  req?: Request
  details?: string
}) => {
  const { actionType, displayValue, req, details } = args

  const fullRequestUrl =
    req && req.protocol + '://' + req.get('host') + req.originalUrl

  const payload = req ? req.currentUser : args.payload

  if (payload?.userType === UserTypeEnum.SUPERUSER) {
    await prisma.superUser.update({
      where: {
        email: payload.email,
      },
      data: {
        lastActivityAt: new Date(),
      },
    })
  }

  await prisma.activityLog.create({
    data: {
      requestUrl: fullRequestUrl,
      userId: payload.id,
      ipAddress: req ? req.ip : null,
      displayValue,
      actionType,
      ...(payload.userType === UserTypeEnum.SUPERUSER && {
        superUserId: payload.id,
      }),
      userType: payload.userType,
      details: req ? JSON.stringify(req.body) : details,
    },
  })
}
