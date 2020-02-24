import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, getImage } from './controller'
import { schema } from './model'
export Ticket, { schema } from './model'

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })


const router = new Router()
const { fecha_creacion, estado, titulo, descripcion, anotaciones, asignaciones, fotos, usuario } = schema.tree

/**
 * @api {post} /tickets Create ticket
 * @apiName CreateTicket
 * @apiGroup Ticket
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam titulo Ticket's titulo.
 * @apiParam descripcion Ticket's descripcion.
 * @apiParam fotos Ticket's fotos.
 * @apiSuccess {Object} ticket Ticket's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ticket not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  upload.array('fotos'),
  // body({ titulo, descripcion, usuario }),
  create)

/**
 * @api {get} /tickets Retrieve tickets
 * @apiName RetrieveTickets
 * @apiGroup Ticket
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} tickets List of tickets.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /tickets/:id Retrieve ticket
 * @apiName RetrieveTicket
 * @apiGroup Ticket
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} ticket Ticket's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ticket not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /tickets/:id Update ticket
 * @apiName UpdateTicket
 * @apiGroup Ticket
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam fecha_creacion Ticket's fecha_creacion.
 * @apiParam estado Ticket's estado.
 * @apiParam titulo Ticket's titulo.
 * @apiParam descripcion Ticket's descripcion.
 * @apiParam anotaciones Ticket's anotaciones.
 * @apiParam asignaciones Ticket's asignaciones.
 * @apiParam fotos Ticket's fotos.
 * @apiSuccess {Object} ticket Ticket's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ticket not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ fecha_creacion, estado, titulo, descripcion, anotaciones, asignaciones, fotos }),
  update)

/**
 * @api {delete} /tickets/:id Delete ticket
 * @apiName DeleteTicket
 * @apiGroup Ticket
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Ticket not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)


router.get('/img/:id/:index',
  token({required:true}),
  getImage);


export default router
