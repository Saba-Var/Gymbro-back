import type { LoginData } from 'types/globals.types'
import type { logInTestCommandArgs } from './types'
import { HTTP_OK } from 'constants/http-statuses'
import request from 'supertest'
import { server } from 'server'

export const logInTestCommand = async ({
  email = process.env.SUPER_USER_EMAIL,
  password = process.env.SUPER_USER_PASSWORD,
  userType,
  statusCode = HTTP_OK,
}: logInTestCommandArgs) => {
  const response = await request(server)
    .post('/api/auth/login')
    .send({
      email,
      password,
      userType,
    } as LoginData)

  expect(response.status).toBe(statusCode)

  if (statusCode === HTTP_OK) {
    expect(response.body).toHaveProperty('accessToken')
    expect(response.body).toHaveProperty('id')
  }

  return response
}
