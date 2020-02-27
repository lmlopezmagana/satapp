import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Anotacion } from '.'
import { Ticket } from '../ticket/'
const _ = require('lodash')

export const create = ({ user, bodymen: { body } }, res, next) => {
  let elTicket;
  let laAnotacion;
  Ticket.findById(body.id_ticket)
    .then(notFound(res))
    .then((ticket) => {
      elTicket = ticket
      return Anotacion.create({ ...body, id_usuario: user })
    })
    .then((anotacion) => {
      laAnotacion = anotacion
      elTicket.anotaciones.push(anotacion._id)
      return elTicket.save()
    })
    .then((ticket) => laAnotacion)
    .then((anotacion) => anotacion.populate('id_usuario').execPopulate())
    // .then((anotacion) => anotacion.populate('id_ticket').execPopulate())
    .then((anotacion) => anotacion.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Anotacion.find(query, select, cursor)
    .populate('id_usuario')
    .then((anotacions) => anotacions.map((anotacion) => anotacion.view()))
    .then(success(res))
    .catch(next)


export const anotacionesPorTicket = ({ querymen: { query, select, cursor }, params }, res, next) => {
  query.id_ticket = params.id
  Anotacion.find(query, select, cursor)
    .populate('id_usuario')
    .then((anotacions) => anotacions.map((anotacion) => anotacion.view()))
    .then(success(res))
    .catch(next)
}

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

export const destroy = ({ user, params }, res, next) => {
  let ticketId;
  let anotacionId;
  Anotacion.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'id_usuario'))
    .then((anotacion) => {
      ticketId = anotacion.id_ticket
      anotacionId = anotacion._id
      return anotacion
    })
    .then((anotacion) => anotacion ? anotacion.remove() : null)
    .then(() => Ticket.findById(ticketId))
    .then((ticket) => {
      ticket.anotaciones = _.remove(ticket.anotaciones, (v) => v == anotacionId)
      return ticket.save()
    })
    .then(success(res, 204))
    .catch(next)
}