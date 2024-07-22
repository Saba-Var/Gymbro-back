import type { AuthJWTPayload } from 'types/globals.types'

class TestingAuthStore {
  private static instance: TestingAuthStore

  private _accessToken = ''

  private _jwtAuthPayload: AuthJWTPayload | null = null

  static getInstance(): TestingAuthStore {
    if (!TestingAuthStore.instance) {
      TestingAuthStore.instance = new TestingAuthStore()
    }
    return TestingAuthStore.instance
  }

  public get accessToken() {
    return this._accessToken
  }

  public get jwtAuthPayload() {
    return this._jwtAuthPayload
  }

  public set jwtAuthPayload(payload: AuthJWTPayload | null) {
    this._jwtAuthPayload = payload
  }

  public set accessToken(token: string) {
    this._accessToken = token
  }

  async privateAccess<T>(
    callback: ({ accessToken }: { accessToken: string }) => T
  ): Promise<T> {
    return callback({ accessToken: this.accessToken })
  }
}

export const testingAuthStore = TestingAuthStore.getInstance()
