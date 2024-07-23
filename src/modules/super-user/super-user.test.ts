import { superTestMethods } from 'testing/super-test-methods'
import { testingAuthStore } from 'testing/testing-auth-store'
import { logInTestCommand } from 'testing/commands/auth'
import type { CompanyCreateData } from './types'

describe('Super user', () => {
  describe('Company', () => {
    beforeAll(async () => {
      if (!testingAuthStore.accessToken) {
        await logInTestCommand()
      }
    })

    it('should create a company', async () => {
      const data: CompanyCreateData = {
        address: 'Test address',
        city: 'Test city',
        country: 'Test country',
        description: 'Test description',
        email: 'company@gmail.com',
        title: 'Test company',
        websiteUrl: 'https://company.com',
        logo: null,
      }

      const response = await superTestMethods.privateRequests.post(
        '/api/super-user/company',
        data
      )

      expect(response.status).toBe(201)
      expect(response.body.title).toBe(data.title)
    })
  })
})
