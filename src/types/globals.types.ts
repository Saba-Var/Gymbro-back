import type { ALLOWED_FILE_EXTENSION } from 'constants/storage'
import type { FilterQuery, RangeQuery } from 'utils/types'
import type { LOCALES } from 'constants/internalization'
import type { UserTypeEnum } from '@prisma/client'
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

export type FileExtension = (typeof ALLOWED_FILE_EXTENSION)[number]

export type Query<T = object> = {
  [key: string]: string | string[] | undefined
} & RangeQuery &
  FilterQuery<T>
