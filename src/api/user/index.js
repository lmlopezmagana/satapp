import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { password as passwordAuth, master, token } from '../../services/passport'
import { index, showMe, show, create, updateName, updateImg,  updatePassword, destroy, getImage, deleteImg, validarUsuario, noValidated } from './controller'
import User, { schema } from './model'
export User, { schema } from './model'

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = new Router()
const { email, password, name, picture, role } = schema.tree

/**
 * @api {get} /users Retrieve users
 * @apiName RetrieveUsers
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiUse listParams
 * @apiSuccess {Object[]} users List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)


/**
 * @api {get} /users Retrieve users no validated
 * @apiName RetrieveUsersNoValidate
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiUse listParams
 * @apiSuccess {Object[]} users List of users no validated
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 * @apiError 404 No hay usuarios sin validar.
 */
router.get('/no-validated',
  token({ required: true }),
  query(),
  noValidated)


/**
 * @api {get} /users/me Retrieve current user
 * @apiName RetrieveCurrentUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiSuccess {Object} user User's data.
 */
router.get('/me',
  token({ required: true }),
  showMe)

/**
 * @api {get} /users/:id Retrieve user
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiPermission user
 * @apiSuccess {Object} user User's data.
 * @apiError 404 User not found.
 */
router.get('/:id',
  token({required: true}),
  show)

/**
 * @api {post} /users Create user
 * @apiName CreateUser
 * @apiGroup User
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiParam {String} email User's email.
 * @apiParam {String{6..}} password User's password.
 * @apiParam {String} [name] User's name.
 * @apiParam {String} [picture] User's picture.
 * @apiParam {String=user,admin} [role=user] User's role.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 * @apiError 409 Email already registered.
 */
router.post('/',
  master(),
  upload.single('avatar'),
  create)

/**
 * @api {get} /img/:id Get user's avatar
 * @apiName GetUserImage
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiSuccess {Object} user User's image.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.get('/img/:id',
  token({required:true}),
  getImage);


/**
 * @api {put} /users/:id Update user's name
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiParam {String} [name] User's name.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.put('/:id',
  token({ required: true }),
  body({ name }),
  updateName)


/**
 * @api {put} /users/:id/validate Valida un usuario
 * @apiName ValidateUser
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiSuccess {Object} user User's data.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.put('/:id/validate',
  token({ required: true }),
  body({ name }),
  validarUsuario)

/**
 * @api {put} /users/:id/img Update user's picture
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiParam {String} [picture] User's picture.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.put('/:id/img',
  token({ required: true }),
  // body({ name }),
  upload.single('avatar'),
  updateImg)


/**
 * @api {put} /users/:id/password Update password
 * @apiName UpdatePassword
 * @apiGroup User
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiParam {String{6..}} password User's new password.
 * @apiSuccess (Success 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user access only.
 * @apiError 404 User not found.
 */
router.put('/:id/password',
  passwordAuth(),
  body({ password }),
  updatePassword)

/**
 * @api {delete} /users/:id Delete user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 User not found.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)


/**
 * @api {delete} /users/:id/img Delete user's image
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiSuccess (Success 200) 200 User's data
 * @apiError 401 Admin access only.
 * @apiError 404 User not found.
 */
router.delete('/:id/img',
  token({ required: true, roles: ['admin'] }),
  deleteImg)


// TODO Añadir petición de promoción de un usuario a técnico

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
