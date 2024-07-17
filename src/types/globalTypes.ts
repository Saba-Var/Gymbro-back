import type { Request } from 'express'
import type { UserType } from 'enums/userTypes'

export interface RequestWithBody<ReqBody = object> extends Request {
  body: ReqBody
}

export type AuthJWTPayload = {
  userType: UserType
  id: number
  email: string
}
