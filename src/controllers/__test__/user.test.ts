import { server } from 'server'
import request from 'supertest'

it('should return user data', async () => {
  const response = await request(server).get('/user')

  expect(response.status).toBe(200)
  expect(response.body).toEqual({
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
  })
})
