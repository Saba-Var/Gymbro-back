import { HTTP_OK, HTTP_UNAUTHORIZED } from 'constants/http-statuses'
import { retryPrismaQuery } from 'utils/retry-prisma-query.util'
import { logInTestCommand } from 'testing/commands/auth'
import { ActivityLogActionType } from '@prisma/client'
import { UserTypeEnum } from 'enums/user.enums'
import { prisma } from 'config/prisma'
import request from 'supertest'
import { server } from 'server'
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
          userType: 'SUPERUSER' as UserTypeEnum, // Avoid TS error to test invalid enum value
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

        const response = await request(server)
          .get('/api/auth/logout')
          .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)

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
        const response = await request(server).get('/api/auth/logout')

        expect(response.status).toBe(HTTP_UNAUTHORIZED)
      })
    })
  })
})
