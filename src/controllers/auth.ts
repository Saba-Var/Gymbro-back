import { NotAuthorizedError } from 'errors/NotAuthorizedError'
import type { Request, Response } from 'express'

export const signIn = async (req: Request, res: Response) => {
  if (req.body?.password === '123456' && req.body?.email === 'test@gmail.com') {
    return res.status(200).json({ message: 'Welcome back!' })
  } else {
    throw new NotAuthorizedError()
  }
}
