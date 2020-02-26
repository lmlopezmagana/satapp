import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { password as passwordAuth, master, token } from '../../services/passport'
import { index, showMe, show, create, updateName, updateImg,  updatePassword, destroy, getImage, deleteImg, validarUsuario, noValidated, convertirEnTecnico } from './controller'
import User, { schema } from './model'
export User, { schema } from './model'

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = new Router()
const { email, password, name, picture, role } = schema.tree

/**
 * @api {get} /users Obtiene la lista de usuarios
 * @apiName ListarUsuarios
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token Token JWT de un usuario administrador
 * @apiUse listParams
 * @apiSuccess {Object[]} users Lista de los usuarios
 * @apiError {Object} 400 Algún parámetro no es válido
 * @apiError 401 El usuario no tiene privilegios.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)


/**
 * @api {get} /users/no-validated Obtiene la lista de usuarios no validados
 * @apiName ListarUsuariosNoValidados
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token Token JWT de un usuario administrador
 * @apiUse listParams
 * @apiSuccess {Object[]} users Lista de usuarios no validados
 * @apiError {Object} 400 Algún parámetro no es válido
 * @apiError 401 El usuario no tiene privilegios.
 * @apiError 404 No hay usuarios sin validar.
 */
router.get('/no-validated',
  token({ required: true, roles: ['admin'] }),
  query(),
  noValidated)


/**
 * @api {get} /users/me Obtiene el usuario actual
 * @apiName ObtenerUsuarioActual
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario
 * @apiSuccess {Object} user Datos del usuario
 */
router.get('/me',
  token({ required: true }),
  showMe)

/**
 * @api {get} /users/:id Obtener un usuario por su ID
 * @apiName ObtenerUsuario
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario
 * @apiSuccess {Object} user Datos del usuario
 * @apiError 404 Usuario no encontrado.
 */
router.get('/:id',
  token({required: true}),
  show)

/**
 * @api {post} /users Registro de usuario (PETICIÓN MULTIPARTE)
 * @apiName RegistrodeUsuario
 * @apiGroup User
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiParam {String} email Email
 * @apiParam {String{6..}} password Contraseña
 * @apiParam {String} [name] User's Nombre.
 * @apiParam {file} [avatar] Imagen del usuario
 * @apiSuccess (Sucess 201) {Object} user Datos del usuario
 * @apiError {Object} 400 Algún parámetro no es válido.
 * @apiError 401 Error en la MASTERKEY
 * @apiError 409 Email ya registrado
 */
router.post('/',
  master(),
  upload.single('avatar'),
  create)

/**
 * @api {get} /img/:id Obtiene la imagen de un usuario
 * @apiName ObtenerImagenUsuario
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario
 * @apiSuccess {Object} user Imagen del usuario.
 * @apiError 401 El usuario no tiene privilegios.
 * @apiError 404 Usuario no encontrado.
 */
router.get('/img/:id',
  token({required:true}),
  getImage);


/**
 * @api {put} /users/:id Actualizar usuario (no actualiza la imagen)
 * @apiName ActualizarUsuario
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario
 * @apiParam {String} [name] Nombre del usuario
 * @apiSuccess {Object} user Datos del usuario
 * @apiError {Object} 400 Algún parámetro no es válido.
 * @apiError 401 El usuario no tiene privilegios.
 * @apiError 404 Usuario no encontrado.
 */
router.put('/:id',
  token({ required: true }),
  body({ name }),
  updateName)


/**
 * @api {put} /users/:id/validate Valida un usuario
 * @apiName ValidarUsuaros
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token Token JWT de un usuario
 * @apiSuccess {Object} user Datos del usuario
 * @apiError 401 El usuario no tiene privilegios.
 * @apiError 404 Usuario no encontrado.
 */
router.put('/:id/validate',
  token({ required: true }),
  validarUsuario)

/**
 * @api {put} /users/:id/img Actualizar la imagen del usuario (PETICIÓN MULTIPARTE)
 * @apiName ActualizarImagenUsuario
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token Token JWT de un usuario
 * @apiParam {String} [avatar] Imagen del usuario
 * @apiSuccess {Object} user Datos del usuario.
 * @apiError {Object} 400 Some Algun parámetro es erróneo
 * @apiError 401 El usuario no tiene privilegios.
 * @apiError 404 Usuario no encontrado.
 */
router.put('/:id/img',
  token({ required: true }),
  // body({ name }),
  upload.single('avatar'),
  updateImg)


/**
 * @api {put} /users/:id/password Actualizar contraseña
 * @apiName ActualizarPassword
 * @apiGroup User
 * @apiHeader {String} Authorization Autorización básica con nombre de usuario y contraseña
 * @apiParam {String{6..}} password Nueva Contraseña
 * @apiSuccess (Success 201) {Object} user Datos del usuario
 * @apiError {Object} 400 Some Algun parámetro es erróneo
 * @apiError 401 El usuario no tiene privilegios.
 * @apiError 404 Usuario no encontrado.
 */
router.put('/:id/password',
  passwordAuth(),
  body({ password }),
  updatePassword)

/**
 * @api {delete} /users/:id Borrar usuario
 * @apiName BorrarUsuario
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User Token JWT de un usuario administrador
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 El usuario no tiene privilegios.
 * @apiError 404 Usuario no encontrado.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)


/**
 * @api {delete} /users/:id/img Borrar imagen del usuario
 * @apiName BorrarImagenUsuario
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token Token JWT de un usuario
 * @apiSuccess (Success 200) 200 Datos del usuario
 * @apiError 401 El usuario no tiene privilegios.
 * @apiError 404 Usuario no encontrado.
 */
router.delete('/:id/img',
  token({ required: true }),
  deleteImg)



// TODO Añadir petición de promoción de un usuario a técnico
/**
 * @api {put} /users/:id/tecnico Cambia el rol de un usuario a técnico
 * @apiName ConvertirEnTecnico
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token Token JWT de un usuario administrador
 * @apiSuccess {Object} user Datos del usuario
 * @apiError 401 El usuario no tiene privilegios.
 * @apiError 404 Usuario no encontrado.
 */
router.put('/:id/tecnico',
  token({ required: true, roles: ['admin'] }),
  convertirEnTecnico)




/**
  Se lanza al inicializar. Si no hay ningún administrador, creamos uno
 */
User.countDocuments({role: 'admin'}, function(err, count){
  if (err) console.log(err)
  if (count < 1) {
    User.create({
      name: 'Admin',
      email: 'admin@administrador.com',
      password: '12345678',
      role: 'admin',
      validated: true
    })
    .then((user) => console.log('Usuario admin creado'))
    .catch(err)
  } else
    console.log('Ya existe un usuario administrador')
})



export default router
