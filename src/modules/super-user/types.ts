import type { RequestWithBody } from 'types/globalTypes'

export type LoginRequest = RequestWithBody<{
  password: string
  email: string
}>
