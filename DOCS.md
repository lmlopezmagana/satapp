# satapp v0.0.0



- [Anotacion](#anotacion)
	- [Create anotacion](#create-anotacion)
	- [Delete anotacion](#delete-anotacion)
	- [Retrieve anotacion](#retrieve-anotacion)
	- [Retrieve anotacions](#retrieve-anotacions)
	- [Update anotacion](#update-anotacion)
	
- [Auth](#auth)
	- [Authenticate](#authenticate)
	
- [Inventariable](#inventariable)
	- [Create inventariable](#create-inventariable)
	- [Delete inventariable](#delete-inventariable)
	- [Delete inventariable&#39;s image](#delete-inventariable&#39;s-image)
	- [Retrieve inventariable](#retrieve-inventariable)
	- [Retrieve inventariable img](#retrieve-inventariable-img)
	- [Retrieve inventariables](#retrieve-inventariables)
	- [Retrieve ubicaciones](#retrieve-ubicaciones)
	- [Update inventariable](#update-inventariable)
	- [Update inventariable&#39;s image](#update-inventariable&#39;s-image)
	
- [Ticket](#ticket)
	- [Create ticket](#create-ticket)
	- [Delete ticket](#delete-ticket)
	- [Retrieve ticket](#retrieve-ticket)
	- [Retrieve tickets](#retrieve-tickets)
	- [Update ticket](#update-ticket)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Get user&#39;s avatar](#get-user&#39;s-avatar)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user&#39;s name](#update-user&#39;s-name)
	


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

## Create inventariable



	POST /inventariable


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| codigo			| 			|  <p>Inventariable's codigo.</p>							|
| tipo			| 			|  <p>Inventariable's tipo.</p>							|
| nombre			| 			|  <p>Inventariable's nombre.</p>							|
| descripcion			| 			|  <p>Inventariable's descripcion.</p>							|
| imagen			| 			|  <p>Inventariable's imagen.</p>							|

## Delete inventariable



	DELETE /inventariable/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Delete inventariable&#39;s image



	DELETE /inventariable/:id/img


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve inventariable



	GET /inventariable/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve inventariable img



	GET /inventariable/img:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve inventariables



	GET /inventariable


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Retrieve ubicaciones



	GET /inventariable/ubicaciones


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Update inventariable



	PUT /inventariable/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| codigo			| 			|  <p>Inventariable's codigo.</p>							|
| tipo			| 			|  <p>Inventariable's tipo.</p>							|
| nombre			| 			|  <p>Inventariable's nombre.</p>							|
| descripcion			| 			|  <p>Inventariable's descripcion.</p>							|

## Update inventariable&#39;s image



	PUT /inventariable/:id/img


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| imagen			| 			|  <p>Inventariable's imagen.</p>							|

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

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Get user&#39;s avatar



	GET /img/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user&#39;s name



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|


