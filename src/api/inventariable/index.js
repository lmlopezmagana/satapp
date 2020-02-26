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
const { codigo, tipo, nombre, descripcion, imagen, ubicacion } = schema.tree

/**
 * @api {post} /inventariable Crea un objeto inventariable (PETICIÓN MULTIPARTE)
 * @apiName CrearInventariable
 * @apiGroup Inventariable
 * @apiPermission admin
 * @apiParam {String} access_token Token JWT de un usuario administrador
 * @apiParam tipo Tipo de inventariable. A escoger entre ['PC', 'MONITOR', 'IMPRESORA', 'RED', 'PERIFERICO', 'OTRO']
 * @apiParam nombre Nombre del inventariable
 * @apiParam descripcion Descripción del inventariable
 * @apiParam ubicacion Ubicación del inventariable
 * @apiParam imagen Imagen del inventariable
 * @apiSuccess {Object} inventariable Datos del inventariable
 * @apiError {Object} 400 Algún parámetro no es correcto
 * @apiError 401 Error de permisos
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  upload.single('imagen'), 
  create)

/**
 * @api {get} /inventariable Obtener la lista de todos los inventariables
 * @apiName ObtenerInventariables
 * @apiGroup Inventariable
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario
 * @apiUse listParams
 * @apiSuccess {Object[]} inventariables Lista de inventariables
 * @apiError {Object} 400 Algún parámetro no es correcto
 * @apiError 401 Error de permisos
 */
router.get('/',
  token({ required: true }),
  query(),
  index)


/**
 * @api {get} /inventariable/img:id Obtiene la imagen de un inventariable
 * @apiName ObtenerImagenInventariable
 * @apiGroup Inventariable
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario
 * @apiSuccess {Object} inventariable Imagen del inventariable
 * @apiError 404 Inventariable no encontrado.
 * @apiError 401 Error de permisos
 */
router.get('/img/:id',
  token({required:true}),
  getImage);


/**
 * @api {get} /inventariable/ubicaciones Obtener todas las ubicaciones
 * @apiName ObtenerUbicaciones
 * @apiGroup Inventariable
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario
 * @apiSuccess {String[]} Array de ubicaciones.
 * @apiError {Object} 400 Algún parámetro no es correcto
 * @apiError 404 No hay ningún inventariable y por tanto, ninguna ubicación
 * @apiError 401 Error de privilegios
 */
router.get('/ubicaciones',
  token({required: true}),
  getUbicaciones
)


/**
 * @api {get} /inventariable/tipos Obtener los tipos de inventariable
 * @apiName ObtenerTipos
 * @apiGroup Inventariable
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario
 * @apiSuccess {String[]} Array de tipos.
 * @apiError {Object} 400 Algún parámetro no es correcto
 * @apiError 401 Error de privilegios
 */
router.get('/tipos',
  token({required: true}),
  getTipos
)


/**
 * @api {get} /inventariable/:id Obtener los datos de un inventariable
 * @apiName ObtenerInventariable
 * @apiGroup Inventariable
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario
 * @apiSuccess {Object} inventariable Datos del inventariable
 * @apiError {Object} 400 Algún parámetro no es correcto
 * @apiError 404 No hay ningún inventariable y por tanto, ninguna ubicación
 * @apiError 401 Error de privilegios
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /inventariable/:id Actualizar un inventariable
 * @apiName ActualizarInventariable
 * @apiGroup Inventariable
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario administrador
 * @apiParam nombre Nombre
 * @apiParam descripcion Descripción
 * @apiParam descripcion Ubicación
 * @apiSuccess {Object} inventariable Datos del inventariable
 * @apiError {Object} 400 Algún parámetro no es correcto
 * @apiError 404 No hay ningún inventariable y por tanto, ninguna ubicación
 * @apiError 401 Error de privilegios
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ nombre, descripcion, ubicacion }),
  update)

/**
 * @api {put} /inventariable/:id/img Actualizar la imagen de un inventariable (PETICIÓN MULTIPARTE)
 * @apiName ActualizarImagenInventariable
 * @apiGroup Inventariable
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario administrador
 * @apiParam imagen Nueva imagen del inventariable
 * @apiSuccess {Object} inventariable Inventariable's data.
 * @apiError {Object} 400 Algún parámetro no es correcto
 * @apiError 404 No hay ningún inventariable y por tanto, ninguna ubicación
 * @apiError 401 Error de privilegios
 */
router.put('/:id/img',
  token({ required: true, roles: ['admin'] }),
  upload.single('imagen'),
  updateImg)


/**
 * @api {delete} /inventariable/:id Eliminar un inventariable
 * @apiName EliminarInventariable
 * @apiGroup Inventariable
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario administrador
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 No hay ningún inventariable y por tanto, ninguna ubicación
 * @apiError 401 Error de privilegios
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

/**
 * @api {delete} /inventariable/:id/img Eliminar una imagen de un inventariable
 * @apiName EliminarImagenInventariable
 * @apiGroup Inventariable
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario administrador
 * @apiSuccess (Success 200) 200 Datos del inventariable
 * @apiError 404 No hay ningún inventariable y por tanto, ninguna ubicación
 * @apiError 401 Error de privilegios
 */
router.delete('/:id/img',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
