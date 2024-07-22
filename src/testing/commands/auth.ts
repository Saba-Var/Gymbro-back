import { superTestMethods } from 'testing/super-test-methods'
import { testingAuthStore } from 'testing/testing-auth-store'
import type { logInTestCommandArgs } from './types'
import { HTTP_OK } from 'constants/http-statuses'

export const logInTestCommand = async ({
  email = process.env.SUPER_USER_EMAIL,
  password = process.env.SUPER_USER_PASSWORD,
  userType,
  statusCode = HTTP_OK,
}: logInTestCommandArgs) => {
  const response = await superTestMethods.publicRequests
    .post('/api/auth/login')
    .send({
      email,
      password,
      userType,
    })

  expect(response.status).toBe(statusCode)

  if (statusCode === HTTP_OK) {
    expect(response.body).toHaveProperty('accessToken')
    expect(response.body).toHaveProperty('id')

    if (!testingAuthStore.accessToken) {
      testingAuthStore.accessToken = response.body.accessToken
    }
  }

  return response
}
