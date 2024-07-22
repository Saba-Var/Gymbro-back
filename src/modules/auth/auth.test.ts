import { HTTP_UNAUTHORIZED } from 'constants/http-statuses'
import { logInTestCommand } from 'testing/commands/auth'
import { ActivityLogActionType } from '@prisma/client'
import { UserTypeEnum } from 'enums/user.enums'
import { prisma } from 'config/prisma'

describe('Auth Routes', () => {
  describe('POST /auth/login', () => {
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

        const activityLog = await prisma.activityLog.findFirst({
          where: {
            userId,
            superUserId: userId,
            displayValue: 'Logged in',
            actionType: ActivityLogActionType.LOGIN,
          },
        })

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
})
