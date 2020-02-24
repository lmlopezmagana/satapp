import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Ticket } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, ticket

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  ticket = await Ticket.create({ creado_por: user })
})

test('POST /tickets 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, fecha_creacion: 'test', estado: 'test', titulo: 'test', descripcion: 'test', anotaciones: 'test', asignaciones: 'test', fotos: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.fecha_creacion).toEqual('test')
  expect(body.estado).toEqual('test')
  expect(body.titulo).toEqual('test')
  expect(body.descripcion).toEqual('test')
  expect(body.anotaciones).toEqual('test')
  expect(body.asignaciones).toEqual('test')
  expect(body.fotos).toEqual('test')
  expect(typeof body.creado_por).toEqual('object')
})

test('POST /tickets 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /tickets 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].creado_por).toEqual('object')
})

test('GET /tickets 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /tickets/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${ticket.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(ticket.id)
  expect(typeof body.creado_por).toEqual('object')
})

test('GET /tickets/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${ticket.id}`)
  expect(status).toBe(401)
})

test('GET /tickets/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /tickets/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${ticket.id}`)
    .send({ access_token: userSession, fecha_creacion: 'test', estado: 'test', titulo: 'test', descripcion: 'test', anotaciones: 'test', asignaciones: 'test', fotos: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(ticket.id)
  expect(body.fecha_creacion).toEqual('test')
  expect(body.estado).toEqual('test')
  expect(body.titulo).toEqual('test')
  expect(body.descripcion).toEqual('test')
  expect(body.anotaciones).toEqual('test')
  expect(body.asignaciones).toEqual('test')
  expect(body.fotos).toEqual('test')
  expect(typeof body.creado_por).toEqual('object')
})

test('PUT /tickets/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${ticket.id}`)
    .send({ access_token: anotherSession, fecha_creacion: 'test', estado: 'test', titulo: 'test', descripcion: 'test', anotaciones: 'test', asignaciones: 'test', fotos: 'test' })
  expect(status).toBe(401)
})

test('PUT /tickets/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${ticket.id}`)
  expect(status).toBe(401)
})

test('PUT /tickets/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, fecha_creacion: 'test', estado: 'test', titulo: 'test', descripcion: 'test', anotaciones: 'test', asignaciones: 'test', fotos: 'test' })
  expect(status).toBe(404)
})

test('DELETE /tickets/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${ticket.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /tickets/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${ticket.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /tickets/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${ticket.id}`)
  expect(status).toBe(401)
})

test('DELETE /tickets/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
