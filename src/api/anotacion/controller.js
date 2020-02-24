import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Anotacion } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Anotacion.create({ ...body, id_usuario: user })
    .then((anotacion) => anotacion.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Anotacion.find(query, select, cursor)
    .populate('id_usuario')
    .then((anotacions) => anotacions.map((anotacion) => anotacion.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Anotacion.findById(params.id)
    .populate('id_usuario')
    .then(notFound(res))
    .then((anotacion) => anotacion ? anotacion.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Anotacion.findById(params.id)
    .populate('id_usuario')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'id_usuario'))
    .then((anotacion) => anotacion ? Object.assign(anotacion, body).save() : null)
    .then((anotacion) => anotacion ? anotacion.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Anotacion.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'id_usuario'))
    .then((anotacion) => anotacion ? anotacion.remove() : null)
    .then(success(res, 204))
    .catch(next)
