import { Anotacion } from '.'
import { User } from '../user'

let user, anotacion

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  anotacion = await Anotacion.create({ id_usuario: user, fecha: 'test', cuerpo: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = anotacion.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(anotacion.id)
    expect(typeof view.id_usuario).toBe('object')
    expect(view.id_usuario.id).toBe(user.id)
    expect(view.fecha).toBe(anotacion.fecha)
    expect(view.cuerpo).toBe(anotacion.cuerpo)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = anotacion.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(anotacion.id)
    expect(typeof view.id_usuario).toBe('object')
    expect(view.id_usuario.id).toBe(user.id)
    expect(view.fecha).toBe(anotacion.fecha)
    expect(view.cuerpo).toBe(anotacion.cuerpo)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
