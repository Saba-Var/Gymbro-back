import type { TimeStamps } from './globalTypes'

export type SuperUser = {
  id: number
  email: string
  password: string
  lastActivityAt: Date | null
} & TimeStamps

export type Role = {
  id: number
  title: string
} & TimeStamps
