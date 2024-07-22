import type supertest from 'supertest'

export type SuperTestRequest = (
  path: string,
  sendData?: object
) => Promise<supertest.Response>

export type PrivateRequests = Record<SupertestRequestMethods, SuperTestRequest>

export type SupertestRequestMethods =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
