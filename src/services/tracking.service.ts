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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const payload = args.payload || req?.currentUser

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
      userId: payload?.id as number,
      ipAddress: req ? req.ip : null,
      displayValue,
      actionType,
      ...(payload?.userType === UserTypeEnum.SUPERUSER && {
        superUserId: payload.id,
      }),
      userType: payload?.userType as UserTypeEnum,
      details: JSON.stringify(req ? req.body : details),
    },
  })
}
