import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, anotacionesPorTicket } from './controller'
import { schema } from './model'
export Anotacion, { schema } from './model'

const router = new Router()
const { id_ticket, cuerpo } = schema.tree

/**
 * @api {post} /anotacion Crear una anotación
 * @apiName CreateAnotacion
 * @apiGroup Anotacion
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam id_ticket ID del ticket al que se le añade la anotación
 * @apiParam cuerpo Cuerpo de la anotación
 * @apiSuccess {Object} anotacion Datos de la anotación
 * @apiError {Object} 400 Algún parámetro erróneo
 * @apiError 404 Anotación no encontrada
 * @apiError 401 Error de privilegios
 */
router.post('/',
  token({ required: true }),
  body({ id_ticket, cuerpo }),
  create)

// TODO Eliminar esta petición, puesto que no es necesaria
/**
 * @api {get} /anotaciones Retrieve anotacions
 * @apiName RetrieveAnotacions
 * @apiGroup Anotacion
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} anotacions List of anotacions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
/*
router.get('/',
  token({ required: true }),
  query(),
  index)
*/
/**
 * @api {get} /anotaciones/ticket Obtener las anotaciones de un ticket
 * @apiName RetrieveAnotacionesByTicket
 * @apiGroup Anotacion
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario
 * @apiUse listParams
 * @apiSuccess {Object[]} anotacions Lista de anotaciones del ticket
 * @apiError {Object} 400 Algún parámetro erróneo
 * @apiError 401 Error de privilegios
 */
router.get('/ticket/:id',
  token({ required: true }),
  query(),
  anotacionesPorTicket)

/**
 * @api {get} /anotaciones/:id Obtener una anotación por su ID
 * @apiName RetrieveAnotacionById
 * @apiGroup Anotacion
 * @apiPermission user
 * @apiParam {String} access_token user Token JWT de un usuario
 * @apiSuccess {Object} anotacion Datos de la anotación
 * @apiError {Object} 400 Algún parámetro erróneo
 * @apiError 404 Anotacion no encontrada
 * @apiError 401 Error de privilegios
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /anotaciones/:id Actualizar una anotación
 * @apiName UpdateAnotacion
 * @apiGroup Anotacion
 * @apiPermission user
 * @apiParam {String} access_token Token JWT del usuario
 * @apiParam cuerpo Cuerpo de la anotaciópn
 * @apiSuccess {Object} anotacion Datos de la anotación
 * @apiError {Object} 400 Algún parámetro erróneo
 * @apiError 404 Anotacion no encontrada
 * @apiError 401 Error de privilegios
 */
router.put('/:id',
  token({ required: true }),
  body({ cuerpo }),
  update)

/**
 * @api {delete} /anotaciones/:id Eliminar una anotacion
 * @apiName DeleteAnotacion
 * @apiGroup Anotacion
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Anotacion no encontrada
 * @apiError 401 Error de privilegios
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
