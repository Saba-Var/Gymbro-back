import { trackUserActivity } from 'services/tracking.service'
import { UserActionEnum } from 'enums/user.enums'
import { HTTP_OK } from 'constants/http-statuses'
import type { Request, Response } from 'express'
import { REFRESH_TOKEN } from 'constants/auth'

export const logoutService = async (req: Request, res: Response) => {
  res.clearCookie(REFRESH_TOKEN, {
    secure: true,
    sameSite: 'strict',
    httpOnly: true,
  })

  trackUserActivity({
    actionType: UserActionEnum.LOGOUT,
    displayValue: 'Logged out',
    req,
  })

  res.status(HTTP_OK).json({ message: req.t('log_out_success') })
}
