import { trackUserActivity } from 'services/tracking.service'
import { UserTypeEnum } from '@prisma/client'
import { prisma } from 'config/prisma'
import { schedule } from 'node-cron'

export const updateCompanyStatus = () => {
  schedule(
    // Run every day at 12:00 PM
    '0 12 * * *',
    async () => {
      try {
        const subscriptionsToUpdate = await prisma.companySubscription.findMany(
          {
            where: {
              endDate: {
                lt: new Date(),
              },
              isActive: true,
            },
          }
        )

        const subscriptionIdsToUpdate = subscriptionsToUpdate.map(
          (subscription) => subscription.id
        )

        if (subscriptionIdsToUpdate.length > 0) {
          await prisma.companySubscription.updateMany({
            where: {
              id: {
                in: subscriptionIdsToUpdate,
              },
            },
            data: {
              isActive: false,
            },
          })
        }

        await trackUserActivity({
          actionType: 'UPDATE',
          displayValue: `Updated following subscriptions: ${subscriptionIdsToUpdate.join(', ')}`,
          payload: {
            userType: UserTypeEnum.CRON_JOB,
            companyId: undefined,
            email: 'cron-job',
            id: 0,
          },
          details: `Company subscriptions update cron job. Total subscriptions updated: ${subscriptionIdsToUpdate.length}. Time: ${new Date().toISOString()}`,
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log(`Error in updateCompanyStatus cron job: ${error.message}`)
      } finally {
        await prisma.$disconnect()
      }
    },
    {
      scheduled: true,
      timezone: 'Asia/Tbilisi',
    }
  )
}
