import { success, notFound, authorOrAdmin, adminOrTecnico } from '../../services/response/'
import { Ticket } from '.'

export const create = (req, res, next) => {
  let nuevoTicket = {
    creado_por: req.user,
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    fecha_tope: req.body.fecha_tope
  }

  if ('tecnico' in req.body) {
    nuevoTicket.asignaciones = new Array()
    nuevoTicket.asignaciones.push({
      tecnico_id: req.body.tecnico
    })
  }

  if ('inventariable' in req.body) {
    nuevoTicket.inventariable = req.body.inventariable
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
    .then((ticket) => ticket.populate('creado_por').execPopulate())
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
    .populate('anotaciones')
    .then(notFound(res))
    .then((ticket) => ticket ? ticket.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Ticket.findById(params.id)
    .populate('creado_por')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'creado_por'))
    .then((ticket) => {

      let modificado = false

      if (body.titulo != undefined) {
        ticket.titulo = body.titulo
        modificado = true
      }
      if (body.descripcion != undefined) {
        ticket.descripcion = body.descripcion
        modificado = true
      }

      if (modificado)
        return ticket.save()
      else
        return res.status(400).json({'error': 'Petición incorrecta. Se necesita al menos un parámetro a modificar: título o descripción'})

        throw new Error("Error!!!")

    })
    .then((ticket) => {
      // console.dir(ticket)
      return ticket
    })
    .then((ticket) => ticket ? ticket.view(true) : null)
    .then(success(res))
    .catch(next)


// Añadir, como funcionalidad, el borrado en cascada de las anotaciones del ticket
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


// getTicketsUsuarioActual, getTicketsDispositivo

// export const getTicketsUsuarioActual = ({ querymen: { query, select, cursor } }, res, next) => {
/*export const getTicketsUsuarioActual = (req, res, next) => {
  console.log('Hola mundo!!!!')
  console.dir(req.querymen)
  let query = {}
  //query.creado_por = req.user._id
  Ticket.find(query, select, cursor)
    // .populate('creado_por')
    .then((tickets) => tickets.map((ticket) => ticket.view()))
    .then(success(res))
    .catch(next)
}*/

export const getTicketsUsuarioActual = ({ user, querymen: { query, select, cursor } }, res, next) => {
  query.creado_por = user._id
  return Ticket.find(query, select, cursor)
    //.populate('creado_por')
    .then((tickets) => tickets.map((ticket) => ticket.view()))
    .then(success(res))
    .catch(next)
}

export const getTicketsAsignadosUsuarioActual = ({ user, querymen: { query, select, cursor } }, res, next) => {
  query['asignaciones.tecnico_id'] = user._id
  console.log(query)
  return Ticket.find(query, select, cursor)
    .populate('creado_por')
    .then((tickets) => tickets.map((ticket) => ticket.view()))
    .then((tickets) => tickets.length > 0 ? tickets : res.sendStatus(404))
    .then(success(res))
    .catch(next)
}

export const getTicketsDispositivo = ({ querymen: { query, select, cursor }, params }, res, next) => {
  query.inventariable = params.id
  return Ticket.find(query, select, cursor)
    .populate('creado_por')
    .then((tickets) => tickets.map((ticket) => ticket.view()))
    .then(success(res))
    .catch(next)
}

export const cambiarEstado = ({ user, bodymen: { body }, params }, res, next) =>
  Ticket.findById(params.id)
    // .populate('creado_por')
    .then(notFound(res))
    .then(adminOrTecnico(res, user))
    .then((ticket) => {
      ticket.estado = body.estado
      return ticket.save()
    })
    .then((ticket) => ticket.populate('creado_por').execPopulate())
    .then((ticket) => ticket.populate('inventariable').execPopulate())
    .then((ticket) => ticket.populate('asignaciones.tecnico_id').execPopulate())
    .then((ticket) => ticket ? ticket.view(true) : null)
    .then(success(res))
    .catch(next)

export const asignarTicket = ({ user, bodymen: { body }, params }, res, next) =>
  Ticket.findById(params.id)
    // .populate('creado_por')
    .then(notFound(res))
    .then(adminOrTecnico(res, user))
    .then((ticket) => {
      if (ticket.asignaciones == undefined) {
        ticket.asignaciones = new Array()
      }
      ticket.asignaciones.push({
          tecnico_id: body.tecnico_id
      })
      ticket.estado = 'ASIGNADA'
      return ticket.save()
    })
    .then((ticket) => ticket.populate('creado_por').execPopulate())
    .then((ticket) => ticket.populate('inventariable').execPopulate())
    .then((ticket) => ticket.populate('asignaciones.tecnico_id').execPopulate())
    .then((ticket) => ticket ? ticket.view(true) : null)
    .then(success(res))
    .catch(next)
