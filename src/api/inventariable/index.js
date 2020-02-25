import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, getImage, updateImg, getUbicaciones, getTipos } from './controller'
import { schema } from './model'
import { tipos } from './model'
export Inventariable, { schema, tipos } from './model'

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = new Router()
const { codigo, tipo, nombre, descripcion, imagen } = schema.tree

/**
 * @api {post} /inventariable Create inventariable
 * @apiName CreateInventariable
 * @apiGroup Inventariable
 * @apiPermission admin
 * @apiParam {String} access_token user access token.
 * @apiParam codigo Inventariable's codigo.
 * @apiParam tipo Inventariable's tipo.
 * @apiParam nombre Inventariable's nombre.
 * @apiParam descripcion Inventariable's descripcion.
 * @apiParam imagen Inventariable's imagen.
 * @apiSuccess {Object} inventariable Inventariable's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Inventariable not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  // body({ codigo, tipo, nombre, descripcion, imagen }),
  upload.single('imagen'), 
  create)

/**
 * @api {get} /inventariable Retrieve inventariables
 * @apiName RetrieveInventariables
 * @apiGroup Inventariable
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} inventariables List of inventariables.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)


/**
 * @api {get} /inventariable/img:id Retrieve inventariable img
 * @apiName RetrieveInventariableImage
 * @apiGroup Inventariable
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} inventariable Inventariable's image.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Inventariable not found.
 * @apiError 401 user access only.
 */
router.get('/img/:id',
  token({required:true}),
  getImage);


/**
 * @api {get} /inventariable/ubicaciones Retrieve ubicaciones
 * @apiName RetrieveUbicaciones
 * @apiGroup Inventariable
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {String[]} Array de ubicaciones.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Inventariable not found.
 * @apiError 401 user access only.
 */
router.get('/ubicaciones',
  token({required: true}),
  getUbicaciones
)


/**
 * @api {get} /inventariable/tipos Retrieve tipos
 * @apiName RetrieveTipos
 * @apiGroup Inventariable
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {String[]} Array de tipos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 No hay tipos.
 * @apiError 401 user access only.
 */
router.get('/tipos',
  token({required: true}),
  getTipos
)


/**
 * @api {get} /inventariable/:id Retrieve inventariable
 * @apiName RetrieveInventariable
 * @apiGroup Inventariable
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} inventariable Inventariable's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Inventariable not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /inventariable/:id Update inventariable
 * @apiName UpdateInventariable
 * @apiGroup Inventariable
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam codigo Inventariable's codigo.
 * @apiParam tipo Inventariable's tipo.
 * @apiParam nombre Inventariable's nombre.
 * @apiParam descripcion Inventariable's descripcion.
 * @apiSuccess {Object} inventariable Inventariable's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Inventariable not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ codigo, tipo, nombre, descripcion, imagen }),
  update)

/**
 * @api {put} /inventariable/:id/img Update inventariable's image
 * @apiName UpdateInventariableImage
 * @apiGroup Inventariable
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam imagen Inventariable's imagen.
 * @apiSuccess {Object} inventariable Inventariable's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Inventariable not found.
 * @apiError 401 user access only.
 */
router.put('/:id/img',
  token({ required: true, roles: ['admin'] }),
  upload.single('imagen'),
  updateImg)


/**
 * @api {delete} /inventariable/:id Delete inventariable
 * @apiName DeleteInventariable
 * @apiGroup Inventariable
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Inventariable not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

/**
 * @api {delete} /inventariable/:id/img Delete inventariable's image
 * @apiName DeleteInventariableImage
 * @apiGroup Inventariable
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 200) 200 Inventariable's data.
 * @apiError 404 Inventariable not found.
 * @apiError 401 user access only.
 */
router.delete('/:id/img',
  token({ required: true, roles: ['admin'] }),
  destroy)




export default router
