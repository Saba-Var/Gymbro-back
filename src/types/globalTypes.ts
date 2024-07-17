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

export interface TransformedErrors {
  [key: string]: string[]
}

export type LoginData = {
  email: string
  password: string
}

export type LoginRequest = RequestWithBody<LoginData>
