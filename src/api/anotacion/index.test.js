import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Anotacion } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, anotacion

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  anotacion = await Anotacion.create({ id_usuario: user })
})

test('POST /anotaciones 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, fecha: 'test', cuerpo: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.fecha).toEqual('test')
  expect(body.cuerpo).toEqual('test')
  expect(typeof body.id_usuario).toEqual('object')
})

test('POST /anotaciones 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /anotaciones 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].id_usuario).toEqual('object')
})

test('GET /anotaciones 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /anotaciones/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${anotacion.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(anotacion.id)
  expect(typeof body.id_usuario).toEqual('object')
})

test('GET /anotaciones/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${anotacion.id}`)
  expect(status).toBe(401)
})

test('GET /anotaciones/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /anotaciones/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${anotacion.id}`)
    .send({ access_token: userSession, fecha: 'test', cuerpo: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(anotacion.id)
  expect(body.fecha).toEqual('test')
  expect(body.cuerpo).toEqual('test')
  expect(typeof body.id_usuario).toEqual('object')
})

test('PUT /anotaciones/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${anotacion.id}`)
    .send({ access_token: anotherSession, fecha: 'test', cuerpo: 'test' })
  expect(status).toBe(401)
})

test('PUT /anotaciones/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${anotacion.id}`)
  expect(status).toBe(401)
})

test('PUT /anotaciones/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, fecha: 'test', cuerpo: 'test' })
  expect(status).toBe(404)
})

test('DELETE /anotaciones/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${anotacion.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /anotaciones/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${anotacion.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /anotaciones/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${anotacion.id}`)
  expect(status).toBe(401)
})

test('DELETE /anotaciones/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
