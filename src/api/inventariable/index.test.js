import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Inventariable } from '.'

const app = () => express(apiRoot, routes)

let userSession, inventariable

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  inventariable = await Inventariable.create({})
})

test('POST /inventariables 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, codigo: 'test', tipo: 'test', nombre: 'test', descripcion: 'test', imagen: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.codigo).toEqual('test')
  expect(body.tipo).toEqual('test')
  expect(body.nombre).toEqual('test')
  expect(body.descripcion).toEqual('test')
  expect(body.imagen).toEqual('test')
})

test('POST /inventariables 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /inventariables 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /inventariables 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /inventariables/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${inventariable.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(inventariable.id)
})

test('GET /inventariables/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${inventariable.id}`)
  expect(status).toBe(401)
})

test('GET /inventariables/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /inventariables/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${inventariable.id}`)
    .send({ access_token: userSession, codigo: 'test', tipo: 'test', nombre: 'test', descripcion: 'test', imagen: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(inventariable.id)
  expect(body.codigo).toEqual('test')
  expect(body.tipo).toEqual('test')
  expect(body.nombre).toEqual('test')
  expect(body.descripcion).toEqual('test')
  expect(body.imagen).toEqual('test')
})

test('PUT /inventariables/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${inventariable.id}`)
  expect(status).toBe(401)
})

test('PUT /inventariables/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, codigo: 'test', tipo: 'test', nombre: 'test', descripcion: 'test', imagen: 'test' })
  expect(status).toBe(404)
})

test('DELETE /inventariables/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${inventariable.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /inventariables/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${inventariable.id}`)
  expect(status).toBe(401)
})

test('DELETE /inventariables/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
