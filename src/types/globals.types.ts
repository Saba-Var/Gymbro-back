import type { LOCALES } from 'constants/internalization'
import type { UserTypeEnum } from 'enums/user.enums'
import type { Request } from 'express'

export interface RequestWithBody<ReqBody = object> extends Request {
  body: ReqBody
}

export type Locale = (typeof LOCALES)[number]

export type AuthJWTPayload = {
  userType: UserTypeEnum
  email: string
  id: number
}

export type TransformedErrors = {
  [key: string]: string[]
}

export type LoginData = {
  email: string
  password: string
  userType: UserTypeEnum
}

export type LoginRequest = RequestWithBody<LoginData>

export type TimeStamps = {
  createdAt: Date
  updatedAt: Date
}

export type ExcludeModelDefaults<Model> = Omit<
  Model,
  'id' | 'createdAt' | 'updatedAt'
>
