import { getCurrentUserInformation } from 'services/current-user.service'
import { NotFoundError } from 'errors/NotFoundError'
import type { Request, Response } from 'express'

export const currentUserInformationController = async (
  req: Request,
  res: Response
) => {
  const userData = await getCurrentUserInformation(req)

  if (!userData) {
    throw new NotFoundError('User not found')
  }

  res.status(200).json(userData)
}
