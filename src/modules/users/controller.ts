import { getCurrentUserInformation } from 'services/current-user.service'
import { NotFoundError } from 'errors/NotFoundError'
import type { Request, Response } from 'express'
import { t } from 'i18next'

export const currentUserInformationController = async (
  req: Request,
  res: Response
) => {
  const userData = await getCurrentUserInformation(req)

  if (!userData) {
    throw new NotFoundError(t('user_not_found'))
  }

  res.status(200).json(userData)
}
