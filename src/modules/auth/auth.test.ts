import { HTTP_OK, HTTP_UNAUTHORIZED } from 'constants/http-statuses'
import type { LoginData } from 'types/globals.types'
import request from 'supertest'
import { server } from 'server'

describe('Auth Routes', () => {
  describe('POST /auth/login', () => {
    const { SUPER_USER_EMAIL, SUPER_USER_PASSWORD } = process.env

    it('should log in a user and return an access token', async () => {
      const response = await request(server)
        .post('/api/auth/login')
        .send({
          email: SUPER_USER_EMAIL,
          password: SUPER_USER_PASSWORD,
          userType: 'SUPERUSER',
        } as LoginData)

      expect(response.status).toBe(HTTP_OK)
      expect(response.body).toHaveProperty('accessToken')
      expect(response.body).toHaveProperty('id')
    })

    it('should return 401 for invalid login credentials', async () => {
      const response = await request(server)
        .post('/api/auth/login')
        .send({
          email: 'invalid@example.com',
          password: 'wrongpassword',
          userType: 'SUPERUSER',
        } as LoginData)

      expect(response.status).toBe(HTTP_UNAUTHORIZED)
    })
  })
})
