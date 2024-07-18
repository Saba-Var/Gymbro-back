import type { AuthJWTPayload } from 'types/globalTypes'
import type { UserActionEnum } from 'enums/user.enums'
import { UserTypeEnum } from 'enums/user.enums'
import { prisma } from 'config/prisma'
import type { Request } from 'express'

export const trackUserActivity = async (args: {
  payload?: AuthJWTPayload
  actionType: UserActionEnum
  displayValue: string
  req: Request
}) => {
  const { actionType, displayValue, req } = args

  const fullRequestUrl =
    req.protocol + '://' + req.get('host') + req.originalUrl

  const payload = req.currentUser || args.payload

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
      ipAddress: req.ip,
      displayValue,
      actionType,
      ...(payload.userType === UserTypeEnum.SUPERUSER && {
        superUserId: payload.id,
      }),
    },
  })
}
