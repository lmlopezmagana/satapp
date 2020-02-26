# satapp v1.0.4



- [Anotacion](#anotacion)
	- [Create anotacion](#create-anotacion)
	- [Delete anotacion](#delete-anotacion)
	- [Retrieve anotacion](#retrieve-anotacion)
	- [Retrieve anotacions](#retrieve-anotacions)
	- [Update anotacion](#update-anotacion)
	
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
	- [Create ticket](#create-ticket)
	- [Delete ticket](#delete-ticket)
	- [Retrieve ticket](#retrieve-ticket)
	- [Retrieve tickets](#retrieve-tickets)
	- [Update ticket](#update-ticket)
	
- [User](#user)
	- [Actualizar la imagen del usuario (PETICIÓN MULTIPARTE)](#actualizar-la-imagen-del-usuario-(petición-multiparte))
	- [Actualizar contraseña](#actualizar-contraseña)
	- [Actualizar usuario (no actualiza la imagen)](#actualizar-usuario-(no-actualiza-la-imagen))
	- [Borrar imagen del usuario](#borrar-imagen-del-usuario)
	- [Borrar usuario](#borrar-usuario)
	- [Cambia el rol de un usuario a técnico](#cambia-el-rol-de-un-usuario-a-técnico)
	- [Obtiene la lista de usuarios](#obtiene-la-lista-de-usuarios)
	- [Obtiene la lista de usuarios no validados](#obtiene-la-lista-de-usuarios-no-validados)
	- [Obtiene la imagen de un usuario](#obtiene-la-imagen-de-un-usuario)
	- [Obtener un usuario por su ID](#obtener-un-usuario-por-su-id)
	- [Obtiene el usuario actual](#obtiene-el-usuario-actual)
	- [Registro de usuario (PETICIÓN MULTIPARTE)](#registro-de-usuario-(petición-multiparte))
	- [Valida un usuario](#valida-un-usuario)
	


# Anotacion

## Create anotacion



	POST /anotaciones


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| fecha			| 			|  <p>Anotacion's fecha.</p>							|
| cuerpo			| 			|  <p>Anotacion's cuerpo.</p>							|

## Delete anotacion



	DELETE /anotaciones/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve anotacion



	GET /anotaciones/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

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

## Update anotacion



	PUT /anotaciones/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| fecha			| 			|  <p>Anotacion's fecha.</p>							|
| cuerpo			| 			|  <p>Anotacion's cuerpo.</p>							|

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

## Create ticket



	POST /tickets


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| titulo			| 			|  <p>Ticket's titulo.</p>							|
| descripcion			| 			|  <p>Ticket's descripcion.</p>							|
| fotos			| 			|  <p>Ticket's fotos.</p>							|

## Delete ticket



	DELETE /tickets/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve ticket



	GET /tickets/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve tickets



	GET /tickets


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update ticket



	PUT /tickets/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| fecha_creacion			| 			|  <p>Ticket's fecha_creacion.</p>							|
| estado			| 			|  <p>Ticket's estado.</p>							|
| titulo			| 			|  <p>Ticket's titulo.</p>							|
| descripcion			| 			|  <p>Ticket's descripcion.</p>							|
| anotaciones			| 			|  <p>Ticket's anotaciones.</p>							|
| asignaciones			| 			|  <p>Ticket's asignaciones.</p>							|
| fotos			| 			|  <p>Ticket's fotos.</p>							|

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

## Obtiene la imagen de un usuario



	GET /img/:id


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
| avatar			| file			| **optional** <p>Imagen del usuario</p>							|

## Valida un usuario



	PUT /users/:id/validate


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Token JWT de un usuario</p>							|


