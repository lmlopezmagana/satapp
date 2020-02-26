import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Ticket } from '.'

export const create = (req, res, next) => {
  let nuevoTicket = {
    creado_por: req.user,
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    fecha_tope: req.body.fecha_tope
  }

  if ('tecnico' in req.body) {
    nuevoTicket.asignaciones.push({
      tecnico_id: req.body.tecnico
    })
  }

  if (req.files.length > 0) {
    nuevoTicket.fotos = new Array(req.files.length)
  }

  req.files.forEach(element => {
    nuevoTicket.fotos.push({
      data: element.buffer.toString('base64'),
      contentType: element.mimetype
    })
  });
  
  Ticket.create(nuevoTicket)
    .then((ticket) => ticket.populate('inventariable').execPopulate())
    .then((ticket) => ticket.populate('tecnico_id').execPopulate())
    .then((ticket) => ticket.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Ticket.find(query, select, cursor)
    .populate('creado_por')
    .then((tickets) => tickets.map((ticket) => ticket.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Ticket.findById(params.id)
    .populate('creado_por')
    .then(notFound(res))
    .then((ticket) => ticket ? ticket.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Ticket.findById(params.id)
    .populate('creado_por')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'creado_por'))
    .then((ticket) => ticket ? Object.assign(ticket, body).save() : null)
    .then((ticket) => ticket ? ticket.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Ticket.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'creado_por'))
    .then((ticket) => ticket ? ticket.remove() : null)
    .then(success(res, 204))
    .catch(next)


export const getImage = ({ params }, res, next) =>
  Ticket.findById(params.id)
    .then(notFound(res))
    .then((ticket) => {
      if (ticket.fotos[params.index] == undefined) {
        res.sendStatus(404)
      }
      res.contentType(ticket.fotos[params.index].contentType)
      res.send(Buffer.from(ticket.fotos[params.index].data,'base64'))
    })
    .catch(next)
