import { success, notFound } from '../../services/response/'
import { Inventariable, tipos } from '.'
import { getCompleteCode } from './sequence'



export const create = (req, res, next) => {
  // Inventariable.create(body)
  

  if (tipos.includes(req.body.tipo)) {
    const tiposAbreviados = ['PC', 'MON', 'IMP', 'RED', 'PER', 'OTR']
    let index = tipos.indexOf(req.body.tipo)
    let tipoElegido = tiposAbreviados[index]

    getCompleteCode(tipoElegido)
      .then((code) => 
          Inventariable.create({
            // codigo: req.body.codigo,
            codigo: code,
            tipo: req.body.tipo,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            ubicacion: req.body.ubicacion,
            inventariable: req.body.ubicacion,
            imagen: {
              data: req.file.buffer.toString('base64'),
              contentType: req.file.mimetype
            }
          })

      )

    /*
    Inventariable.create({
      codigo: req.body.codigo,
      tipo: req.body.tipo,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      inventariable: req.body.ubicacion,
      imagen: {
        data: req.file.buffer.toString('base64'),
        contentType: req.file.mimetype
      }
    })*/
      .then((inventariable) => inventariable.view(true))
      .then(success(res, 201))
      .catch(next)

  } else
    res.status(400).json({ error: "Tipo de inventariable no permitido"})

}
export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Inventariable.find(query, select, cursor)
    .then((inventariables) => inventariables.map((inventariable) => inventariable.view()))
    .then(success(res))
    .catch(next)


export const show = ({ params }, res, next) =>
  Inventariable.findById(params.id)
    .then(notFound(res))
    .then((inventariable) => inventariable ? inventariable.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Inventariable.findById(params.id)
    .then(notFound(res))
    // .then((inventariable) => inventariable ? Object.assign(inventariable, body).save() : null)
    .then((inventariable) => {
      inventariable.nombre = body.nombre
      inventariable.descripcion = body.descripcion
      inventariable.ubicacion = body.ubicacion
      return inventariable.save()
    })
    .then((inventariable) => inventariable ? inventariable.view(true) : null)
    .then(success(res))
    .catch(next)

export const updateImg = (req, res, next) =>
  Inventariable.findById(req.params.id)
    .then(notFound(res))
    // .then((inventariable) => inventariable ? Object.assign(inventariable, body).save() : null)
    .then((inventariable) => {
      inventariable.imagen.data = req.file.buffer.toString('base64')
      inventariable.imagen.contentType = req.file.mimetype
      return inventariable.save()
    })
    .then((inventariable) => inventariable ? inventariable.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Inventariable.findById(params.id)
    .then(notFound(res))
    .then((inventariable) => inventariable ? inventariable.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const deteleImage = ({ params }, res, next) =>
  Inventariable.findById(params.id)
    .then(notFound(res))
    .then((inventariable) => {
      if (inventariable) {
        delete inventariable['imagen'];
      } else
        return null
    })
    .then(success(res, 204))
    .catch(next)

export const getImage = ({ params }, res, next) =>
  Inventariable.findById(params.id)
    .then(notFound(res))
    .then((inventariable) => {
      if (inventariable.imagen != undefined) {
        res.contentType(inventariable.imagen.contentType)
        res.send(Buffer.from(inventariable.imagen.data,'base64'))
      }
      else
        return res.sendStatus(404)
    })
    // .then(success(res, 200))
    .catch(next)

export const getUbicaciones = (req, res, next) =>
  Inventariable.distinct('ubicacion')
    // .then((inventariables) => inventariables.map((inventariable) => inventariable.view()))
    .then((ubicaciones) => {
      if (ubicaciones.length == 0)
        res.sendStatus(404)
      else
        return ubicaciones
    })
    .then(success(res))
    .catch(next)

export const getTipos = (req, res, next) => {
  res.json(tipos)
}