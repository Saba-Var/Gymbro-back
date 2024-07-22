import { HTTP_OK, HTTP_UNAUTHORIZED } from 'constants/http-statuses'
import { retryPrismaQuery } from 'utils/retry-prisma-query.util'
import { superTestMethods } from 'testing/super-test-methods'
import { logInTestCommand } from 'testing/commands/auth'
import { ActivityLogActionType } from '@prisma/client'
import { UserTypeEnum } from 'enums/user.enums'
import { generateAuthJwtTokens } from './utils'
import { prisma } from 'config/prisma'
import { t } from 'i18next'

describe('Auth Routes', () => {
  describe('POST /api/auth/login', () => {
    describe('Super User', () => {
      it('should log in a user as a super user and return an access token', async () => {
        logInTestCommand({
          userType: UserTypeEnum.SUPERUSER,
        })
      })

      it('should track log in activity', async () => {
        const response = await logInTestCommand({
          userType: UserTypeEnum.SUPERUSER,
        })

        const userId = response.body.id

        const activityLog = await retryPrismaQuery(() =>
          prisma.activityLog.findFirst({
            where: {
              userId,
              superUserId: userId,
              displayValue: 'Logged in',
              actionType: ActivityLogActionType.LOGIN,
            },
          })
        )
        expect(activityLog).not.toBeNull()
        expect(activityLog?.superUserId).toBe(userId)
      })

      it('should return 401 for invalid login credentials', async () => {
        await logInTestCommand({
          email: 'invalid@example.com',
          password: 'wrongpassword',
          userType: 'SUPERUSER' as UserTypeEnum,
          statusCode: HTTP_UNAUTHORIZED,
        })
      })
    })
  })

  describe('GET /api/auth/logout', () => {
    describe('Super User', () => {
      it('should log out a user and clear the refresh token cookie', async () => {
        const loginResponse = await logInTestCommand({
          userType: UserTypeEnum.SUPERUSER,
        })
        const userId = loginResponse.body.id

        const response =
          await superTestMethods.privateRequests.get('/api/auth/logout')

        expect(response.status).toBe(HTTP_OK)
        expect(response.body).toHaveProperty('message', t('log_out_success'))

        const activityLog = await retryPrismaQuery(() =>
          prisma.activityLog.findFirst({
            where: {
              displayValue: 'Logged out',
            },
          })
        )

        expect(activityLog).not.toBeNull()
        expect(activityLog?.superUserId).toBe(userId)
      })

      it('should return 401 if the user is not authenticated', async () => {
        const response =
          await superTestMethods.publicRequests.get('/api/auth/logout')

        expect(response.status).toBe(HTTP_UNAUTHORIZED)
      })
    })
  })

  describe('GET /api/auth/refresh', () => {
    describe('Super User', () => {
      it('should refresh the access token with a valid refresh token', async () => {
        const loginResponse = await logInTestCommand({
          userType: UserTypeEnum.SUPERUSER,
        })
        const refreshToken = loginResponse.headers['set-cookie'][0]
          .split(';')[0]
          .split('=')[1]

        expect(refreshToken).toBeDefined()

        const refreshResponse = await superTestMethods.publicRequests
          .get('/api/auth/refresh')
          .set('Cookie', `refreshToken=${refreshToken}`)

        expect(refreshResponse.status).toBe(HTTP_OK)
        expect(refreshResponse.body).toHaveProperty('accessToken')
      })

      it('should return 500 for an invalid refresh token', async () => {
        const { refreshToken: invalidRefreshToken } = generateAuthJwtTokens({
          id: 999999,
          email: 'invalid@gmail.com',
          userType: UserTypeEnum.SUPERUSER,
        })

        const response = await superTestMethods.publicRequests
          .get('/api/auth/refresh')
          .set('Cookie', `refreshToken=${invalidRefreshToken}`)

        expect(response.status).toBe(HTTP_UNAUTHORIZED)
      })
    })
  })
})
