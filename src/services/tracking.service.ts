import type { AuthJWTPayload } from 'types/globalTypes'
import type { UserActionEnum } from 'enums/user.enums'
import { UserTypeEnum } from 'enums/user.enums'
import { prisma } from 'config/prisma'
import type { Request } from 'express'

export const trackUserActivity = async (args: {
  payload: AuthJWTPayload
  actionType: UserActionEnum
  displayValue: string
  req: Request
}) => {
  const { actionType, displayValue, payload, req } = args

  const fullRequestUrl =
    req.protocol + '://' + req.get('host') + req.originalUrl

  if (payload.userType === UserTypeEnum.SUPERUSER) {
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
      superUserId: payload.id,
      userId: payload.id,
      ipAddress: req.ip,
      displayValue,
      actionType,
    },
  })
}