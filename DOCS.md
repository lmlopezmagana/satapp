# satapp v1.1.3



- [Anotacion](#anotacion)
	- [Crear una anotación](#crear-una-anotación)
	- [Eliminar una anotacion](#eliminar-una-anotacion)
	- [Obtener una anotación por su ID](#obtener-una-anotación-por-su-id)
	- [Obtener las anotaciones de un ticket](#obtener-las-anotaciones-de-un-ticket)
	- [Retrieve anotacions](#retrieve-anotacions)
	- [Actualizar una anotación](#actualizar-una-anotación)
	
- [Auth](#auth)
	- [Authenticate](#authenticate)
	
- [Inventariable](#inventariable)
	- [Actualizar la imagen de un inventariable (PETICIÓN MULTIPARTE)](#actualizar-la-imagen-de-un-inventariable-(petición-multiparte))
	- [Actualizar un inventariable](#actualizar-un-inventariable)
	- [Crea un objeto inventariable (PETICIÓN MULTIPARTE)](#crea-un-objeto-inventariable-(petición-multiparte))
	- [Eliminar una imagen de un inventariable](#eliminar-una-imagen-de-un-inventariable)
	- [Eliminar un inventariable](#eliminar-un-inventariable)
	- [Obtiene la imagen de un inventariable](#obtiene-la-imagen-de-un-inventariable)
	- [Obtener los datos de un inventariable](#obtener-los-datos-de-un-inventariable)
	- [Obtener la lista de todos los inventariables](#obtener-la-lista-de-todos-los-inventariables)
	- [Obtener los tipos de inventariable](#obtener-los-tipos-de-inventariable)
	- [Obtener todas las ubicaciones](#obtener-todas-las-ubicaciones)
	
- [Ticket](#ticket)
	- [Actualizar estado de un ticket](#actualizar-estado-de-un-ticket)
	- [Actualizar ticket](#actualizar-ticket)
	- [Asignar un ticket a un tecnico](#asignar-un-ticket-a-un-tecnico)
	- [Crea un nuevo ticket (PETICIÓN MULTIPARTE)](#crea-un-nuevo-ticket-(petición-multiparte))
	- [Borrar ticket](#borrar-ticket)
	- [Obtener un ticket](#obtener-un-ticket)
	- [Obtener todos los tickets](#obtener-todos-los-tickets)
	- [Obtener todos los tickets asignados al usuario actual](#obtener-todos-los-tickets-asignados-al-usuario-actual)
	- [Obtener todos los tickets de un inventariable](#obtener-todos-los-tickets-de-un-inventariable)
	- [Obtener todos los tickets dados de alta por el usuario actual](#obtener-todos-los-tickets-dados-de-alta-por-el-usuario-actual)
	
- [User](#user)
	- [Actualizar la imagen del usuario (PETICIÓN MULTIPARTE)](#actualizar-la-imagen-del-usuario-(petición-multiparte))
	- [Actualizar contraseña](#actualizar-contraseña)
	- [Actualizar usuario (no actualiza la imagen)](#actualizar-usuario-(no-actualiza-la-imagen))
	- [Borrar imagen del usuario](#borrar-imagen-del-usuario)
	- [Borrar usuario](#borrar-usuario)
	- [Cambia el rol de un usuario a técnico](#cambia-el-rol-de-un-usuario-a-técnico)
	- [Obtiene la lista de usuarios](#obtiene-la-lista-de-usuarios)
	- [Obtiene la lista de usuarios no validados](#obtiene-la-lista-de-usuarios-no-validados)
	- [Obtiene una imagen del Ticket](#obtiene-una-imagen-del-ticket)
	- [Obtiene la imagen de un usuario](#obtiene-la-imagen-de-un-usuario)
	- [Obtener un usuario por su ID](#obtener-un-usuario-por-su-id)
	- [Obtiene el usuario actual](#obtiene-el-usuario-actual)
	- [Registro de usuario (PETICIÓN MULTIPARTE)](#registro-de-usuario-(petición-multiparte))
	- [Valida un usuario](#valida-un-usuario)
	


# Anotacion

## Crear una anotación



	POST /anotacion


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| id_ticket			| 			|  <p>ID del ticket al que se le añade la anotación</p>							|
| cuerpo			| 			|  <p>Cuerpo de la anotación</p>							|

## Eliminar una anotacion



	DELETE /anotaciones/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario</p>							|

## Obtener una anotación por su ID



	GET /anotaciones/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user Token JWT de un usuario</p>							|

## Obtener las anotaciones de un ticket



	GET /anotaciones/ticket


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve anotacions



	GET /anotaciones


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Actualizar una anotación



	PUT /anotaciones/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT del usuario</p>							|
| cuerpo			| 			|  <p>Cuerpo de la anotaciópn</p>							|

# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

# Inventariable

## Actualizar la imagen de un inventariable (PETICIÓN MULTIPARTE)



	PUT /inventariable/:id/img


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario administrador</p>							|
| imagen			| 			|  <p>Nueva imagen del inventariable</p>							|

## Actualizar un inventariable



	PUT /inventariable/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario administrador</p>							|
| nombre			| 			|  <p>Nombre</p>							|
| descripcion			| 			|  <p>Descripción</p>							|

## Crea un objeto inventariable (PETICIÓN MULTIPARTE)



	POST /inventariable


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario administrador</p>							|
| tipo			| 			|  <p>Tipo de inventariable. A escoger entre ['PC', 'MONITOR', 'IMPRESORA', 'RED', 'PERIFERICO', 'OTRO']</p>							|
| nombre			| 			|  <p>Nombre del inventariable</p>							|
| descripcion			| 			|  <p>Descripción del inventariable</p>							|
| ubicacion			| 			|  <p>Ubicación del inventariable</p>							|
| imagen			| 			|  <p>Imagen del inventariable</p>							|

## Eliminar una imagen de un inventariable



	DELETE /inventariable/:id/img


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario administrador</p>							|

## Eliminar un inventariable



	DELETE /inventariable/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario administrador</p>							|

## Obtiene la imagen de un inventariable



	GET /inventariable/img:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario</p>							|

## Obtener los datos de un inventariable



	GET /inventariable/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario</p>							|

## Obtener la lista de todos los inventariables



	GET /inventariable


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Obtener los tipos de inventariable



	GET /inventariable/tipos


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario</p>							|

## Obtener todas las ubicaciones



	GET /inventariable/ubicaciones


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario</p>							|

# Ticket

## Actualizar estado de un ticket



	PUT /ticket/:id/estado


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario técnico o un administrador</p>							|
| estado			| 			|  <p>Estado de la incidencia. A elegir entre ['PENDIENTE_ASIGNACION', 'ASIGNADA', 'EN_PROCESO', 'SOLUCIONADA'],</p>							|

## Actualizar ticket



	PUT /ticket/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT del usuario que creó el ticket o un administrador</p>							|
| titulo			| 			|  <p>Título</p>							|
| descripcion			| 			|  <p>Descripción</p>							|

## Asignar un ticket a un tecnico



	PUT /ticket/:id/asignar


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario técnico o un administrador</p>							|
| tecnico			| 			|  <p>ID del usuario técnico a la que se le asigna la incidencia</p>							|

## Crea un nuevo ticket (PETICIÓN MULTIPARTE)



	POST /ticket


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario</p>							|
| titulo			| 			|  <p>Título del ticket</p>							|
| descripcion			| 			|  <p>Descripción del ticket</p>							|
| inventariable			| 			|  <p>ID del dispositivo que presenta el fallo (no es obligatorio)</p>							|
| tecnico			| 			|  <p>ID del técnico al que se le asigna el ticket (optativo)</p>							|
| fotos			| files			|  <p>Fotos del ticket (puede no llevar ninguna)</p>							|

## Borrar ticket



	DELETE /ticket/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario administrador o el autor del ticket</p>							|

## Obtener un ticket



	GET /ticket/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario</p>							|

## Obtener todos los tickets



	GET /ticket


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Obtener todos los tickets asignados al usuario actual



	GET /ticket/asignados/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Obtener todos los tickets de un inventariable



	GET /ticket/inventariable/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Obtener todos los tickets dados de alta por el usuario actual



	GET /ticket/user/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# User

## Actualizar la imagen del usuario (PETICIÓN MULTIPARTE)



	PUT /users/:id/img


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario</p>							|
| avatar			| String			| **optional** <p>Imagen del usuario</p>							|

## Actualizar contraseña



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Autorización básica con nombre de usuario y contraseña</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>Nueva Contraseña</p>							|

## Actualizar usuario (no actualiza la imagen)



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario</p>							|
| name			| String			| **optional** <p>Nombre del usuario</p>							|

## Borrar imagen del usuario



	DELETE /users/:id/img


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario</p>							|

## Borrar usuario



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User Token JWT de un usuario administrador</p>							|

## Cambia el rol de un usuario a técnico



	PUT /users/:id/tecnico


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario administrador</p>							|

## Obtiene la lista de usuarios



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario administrador</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Obtiene la lista de usuarios no validados



	GET /users/no-validated


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario administrador</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Obtiene una imagen del Ticket



	GET /img/:id/:index


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario</p>							|

## Obtiene la imagen de un usuario



	GET /users/img/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario</p>							|

## Obtener un usuario por su ID



	GET /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario</p>							|

## Obtiene el usuario actual



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario</p>							|

## Registro de usuario (PETICIÓN MULTIPARTE)



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>Email</p>							|
| password			| String			|  <p>Contraseña</p>							|
| name			| String			| **optional** <p>User's Nombre.</p>							|
| avatar			| file			| **optional** <p>Imagen del usuario (ya no es obligatoria)</p>							|

## Valida un usuario



	PUT /users/:id/validate


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario</p>							|


