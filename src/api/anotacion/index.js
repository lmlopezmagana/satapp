import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Anotacion, { schema } from './model'

const router = new Router()
const { fecha, cuerpo } = schema.tree

/**
 * @api {post} /anotaciones Create anotacion
 * @apiName CreateAnotacion
 * @apiGroup Anotacion
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam fecha Anotacion's fecha.
 * @apiParam cuerpo Anotacion's cuerpo.
 * @apiSuccess {Object} anotacion Anotacion's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Anotacion not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ fecha, cuerpo }),
  create)

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
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /anotaciones/:id Retrieve anotacion
 * @apiName RetrieveAnotacion
 * @apiGroup Anotacion
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} anotacion Anotacion's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Anotacion not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /anotaciones/:id Update anotacion
 * @apiName UpdateAnotacion
 * @apiGroup Anotacion
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam fecha Anotacion's fecha.
 * @apiParam cuerpo Anotacion's cuerpo.
 * @apiSuccess {Object} anotacion Anotacion's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Anotacion not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ fecha, cuerpo }),
  update)

/**
 * @api {delete} /anotaciones/:id Delete anotacion
 * @apiName DeleteAnotacion
 * @apiGroup Anotacion
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Anotacion not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
