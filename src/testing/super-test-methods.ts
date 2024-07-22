import type { PrivateRequests, SupertestRequestMethods } from 'testing/types'
import { testingAuthStore } from 'testing/testing-auth-store'
import supertest from 'supertest'
import { server } from 'server'

export class SuperTestMethods {
  private static instance: SuperTestMethods

  public readonly privateRequests: PrivateRequests

  public readonly publicRequests: supertest.SuperTest<supertest.Test>

  constructor() {
    this.publicRequests = supertest(
      server
    ) as unknown as supertest.SuperTest<supertest.Test>

    this.privateRequests = {
      get: (path: string, sendData?: object) =>
        this.privateRequest('get', path, sendData),

      post: (path: string, sendData?: object) =>
        this.privateRequest('post', path, sendData),

      put: (path: string, sendData?: object) =>
        this.privateRequest('put', path, sendData),

      delete: (path: string, sendData?: object) =>
        this.privateRequest('delete', path, sendData),

      patch: (path: string, sendData?: object) =>
        this.privateRequest('patch', path, sendData),
    }
  }

  static getInstance(): SuperTestMethods {
    if (!SuperTestMethods.instance) {
      SuperTestMethods.instance = new SuperTestMethods()
    }
    return SuperTestMethods.instance
  }

  private async privateRequest(
    method: SupertestRequestMethods,
    path: string,
    sendData?: object
  ) {
    const response = await testingAuthStore.privateAccess(
      async ({ accessToken }) =>
        this.publicRequests[method](path)
          .set('Authorization', `Bearer ${accessToken}`)
          .send(sendData || '')
    )

    return response
  }
}

export const superTestMethods = SuperTestMethods.getInstance()
