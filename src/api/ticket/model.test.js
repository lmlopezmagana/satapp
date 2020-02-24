import { Ticket } from '.'
import { User } from '../user'

let user, ticket

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  ticket = await Ticket.create({ creado_por: user, fecha_creacion: 'test', estado: 'test', titulo: 'test', descripcion: 'test', anotaciones: 'test', asignaciones: 'test', fotos: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = ticket.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(ticket.id)
    expect(typeof view.creado_por).toBe('object')
    expect(view.creado_por.id).toBe(user.id)
    expect(view.fecha_creacion).toBe(ticket.fecha_creacion)
    expect(view.estado).toBe(ticket.estado)
    expect(view.titulo).toBe(ticket.titulo)
    expect(view.descripcion).toBe(ticket.descripcion)
    expect(view.anotaciones).toBe(ticket.anotaciones)
    expect(view.asignaciones).toBe(ticket.asignaciones)
    expect(view.fotos).toBe(ticket.fotos)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = ticket.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(ticket.id)
    expect(typeof view.creado_por).toBe('object')
    expect(view.creado_por.id).toBe(user.id)
    expect(view.fecha_creacion).toBe(ticket.fecha_creacion)
    expect(view.estado).toBe(ticket.estado)
    expect(view.titulo).toBe(ticket.titulo)
    expect(view.descripcion).toBe(ticket.descripcion)
    expect(view.anotaciones).toBe(ticket.anotaciones)
    expect(view.asignaciones).toBe(ticket.asignaciones)
    expect(view.fotos).toBe(ticket.fotos)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
