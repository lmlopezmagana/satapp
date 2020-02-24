import { Inventariable } from '.'

let inventariable

beforeEach(async () => {
  inventariable = await Inventariable.create({ codigo: 'test', tipo: 'test', nombre: 'test', descripcion: 'test', imagen: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = inventariable.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(inventariable.id)
    expect(view.codigo).toBe(inventariable.codigo)
    expect(view.tipo).toBe(inventariable.tipo)
    expect(view.nombre).toBe(inventariable.nombre)
    expect(view.descripcion).toBe(inventariable.descripcion)
    expect(view.imagen).toBe(inventariable.imagen)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = inventariable.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(inventariable.id)
    expect(view.codigo).toBe(inventariable.codigo)
    expect(view.tipo).toBe(inventariable.tipo)
    expect(view.nombre).toBe(inventariable.nombre)
    expect(view.descripcion).toBe(inventariable.descripcion)
    expect(view.imagen).toBe(inventariable.imagen)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
