import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, getImage, getTicketsUsuarioActual, getTicketsDispositivo, asignarTicket, cambiarEstado, getTicketsAsignadosUsuarioActual } from './controller'
import { schema } from './model'
export Ticket, { schema } from './model'

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })


const router = new Router()
const { fecha_creacion, estado, titulo, descripcion, anotaciones, asignaciones, fotos, usuario, tecnico_id, inventariable } = schema.tree

/**
 * @api {post} /ticket Crea un nuevo ticket (PETICIÓN MULTIPARTE)
 * @apiName CrearTicket
 * @apiGroup Ticket
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario
 * @apiParam titulo Título del ticket
 * @apiParam descripcion Descripción del ticket
 * @apiParam inventariable ID del dispositivo que presenta el fallo (no es obligatorio)
 * @apiParam tecnico ID del técnico al que se le asigna el ticket (optativo)
 * @apiParam {files} fotos Fotos del ticket (puede no llevar ninguna)
 * @apiSuccess {Object} ticket Datos del ticket
 * @apiError {Object} 400 Algún parámetro erróneo
 * @apiError 401 Error en los permisos
 */
router.post('/',
  token({ required: true }),
  upload.array('fotos'),
  // body({ titulo, descripcion, usuario }),
  create)



/**
 * @api {get} /ticket/asignados/me Obtener todos los tickets asignados al usuario actual
 * @apiName RetrieveTicketsAsignadosUsuario
 * @apiGroup Ticket
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario
 * @apiUse listParams
 * @apiSuccess {Object[]} tickets Lista de los tickets
 * @apiError {Object} 400 Algún parámetro erróneo
 * @apiError 401 Error en los permisos
 */
 
router.get('/asignados/me',
  token({required: true}),
  query(),
  getTicketsAsignadosUsuarioActual)



/**
 * @api {get} /ticket/user/me Obtener todos los tickets dados de alta por el usuario actual
 * @apiName RetrieveTicketsUser
 * @apiGroup Ticket
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario
 * @apiUse listParams
 * @apiSuccess {Object[]} tickets Lista de los tickets
 * @apiError {Object} 400 Algún parámetro erróneo
 * @apiError 401 Error en los permisos
 */
 
router.get('/user/me',
  token({required: true}),
  query(),
  getTicketsUsuarioActual)



/**
 * @api {get} /ticket/inventariable/:id Obtener todos los tickets de un inventariable
 * @apiName RetrieveTicketsInventariable
 * @apiGroup Ticket
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario
 * @apiUse listParams
 * @apiSuccess {Object[]} tickets Lista de los tickets
 * @apiError {Object} 400 Algún parámetro erróneo
 * @apiError 401 Error en los permisos
 */
router.get('/inventariable/:id',
  token({required: true}),
  query(),
  getTicketsDispositivo)

/**
 * @api {get} /ticket Obtener todos los tickets
 * @apiName RetrieveTickets
 * @apiGroup Ticket
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario
 * @apiUse listParams
 * @apiSuccess {Object[]} tickets Lista de los tickets
 * @apiError {Object} 400 Algún parámetro erróneo
 * @apiError 401 Error en los permisos
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /ticket/:id Obtener un ticket
 * @apiName ObtenerTicket
 * @apiGroup Ticket
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario 
 * @apiSuccess {Object} ticket Datos del ticket
 * @apiError {Object} 400 Algún parámetro erróneo
 * @apiError 404 Ticket no encontrado
 * @apiError 401 Error de privilegios
 */
 
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /ticket/:id Actualizar ticket
 * @apiName ActualizarTicket
 * @apiGroup Ticket
 * @apiPermission user
 * @apiParam {String} access_token Token JWT del usuario que creó el ticket o un administrador
 * @apiParam titulo Título
 * @apiParam descripcion Descripción
 * @apiSuccess {Object} ticket Datos del ticket modificado
 * @apiError {Object} 400 Algún parámetro erróneo
 * @apiError 404 Ticket no encontrado
 * @apiError 401 Error de privilegios
 */
router.put('/:id',
  token({ required: true }),
  body({ titulo, descripcion }),
  update)

/**
 * @api {put} /ticket/:id/estado Actualizar estado de un ticket
 * @apiName ActualizarEstadoTicket
 * @apiGroup Ticket
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario técnico o un administrador
 * @apiParam estado Estado de la incidencia. A elegir entre ['PENDIENTE_ASIGNACION', 'ASIGNADA', 'EN_PROCESO', 'SOLUCIONADA'],
 * @apiSuccess {Object} ticket Datos del ticket modificado
 * @apiError {Object} 400 Algún parámetro erróneo
 * @apiError 404 Ticket no encontrado
 * @apiError 401 Error de privilegios
 */
router.put('/:id/estado',
  token({ required: true }),
  body({ estado }),
  cambiarEstado)



/**
 * @api {put} /ticket/:id/asignar Asignar un ticket a un tecnico
 * @apiName AsignarTicket
 * @apiGroup Ticket
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario técnico o un administrador
 * @apiParam tecnico ID del usuario técnico a la que se le asigna la incidencia
 * @apiSuccess {Object} ticket Datos del ticket modificado
 * @apiError {Object} 400 Algún parámetro erróneo
 * @apiError 404 Ticket no encontrado
 * @apiError 401 Error de privilegios
 */
router.put('/:id/asignar',
  token({ required: true }),
  body({ tecnico_id }),
  asignarTicket)


/**
 * @api {delete} /ticket/:id Borrar ticket
 * @apiName EliminarTicket
 * @apiGroup Ticket
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario administrador o el autor del ticket
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Ticket no encontrado
 * @apiError 401 Error de privilegios
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

/**
 * @api {get} /img/:id/:index Obtiene una imagen del Ticket
 * @apiName ObtenerImagenTicket
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario
 * @apiSuccess {Object} ticket Imagen del ticket.
 * @apiError 401 El usuario no tiene privilegios.
 * @apiError 404 Usuario no encontrado.
 */
router.get('/img/:id/:index',
  token({required:true}),
  getImage);


export default router
