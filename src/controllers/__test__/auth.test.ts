import { server } from 'server'
import request from 'supertest'

it('Should sign in with correct email and password', async () => {
  const response = await request(server)
    .post('/auth/sign-in')
    .send({ email: 'test@gmail.com', password: '123456' })

  expect(response.status).toBe(200)
  expect(response.body.message).toBe('Welcome back!')
})

it('Should return validation error if credentials are incorrect', async () => {
  const response = await request(server)
    .post('/auth/sign-in')
    .send({ email: 'incorrect@gmail.com', password: 'incorrect' })

  expect(response.status).toBe(401)
  expect(response.body.errors?.[0].message).toBe('Not authorized!')
})
