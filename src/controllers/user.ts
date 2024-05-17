import type { Request, Response } from 'express'

export const getUserData = async (_req: Request, res: Response) => {
  res.json({
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
  })
}
