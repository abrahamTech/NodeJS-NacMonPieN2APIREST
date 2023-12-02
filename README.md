# API REST para Evaluación de Préstamos

Esta API REST permite calcular el monto estimado de un préstamo, basado en el tipo de material y su peso en gramos.

## Configuración del Proyecto

### Requisitos Previos

Asegúrate de tener instalados los siguientes elementos antes de ejecutar la aplicación:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Instalación de Dependencias

```bash
npm install
```

## Uso de la API

### 1. Registro de Usuarios

#### Ruta

```http
POST /register
```

## Uso de la API

### 1. Registro de Usuarios

#### Ruta

```http
POST /register
```

#### Descripción

Registra un nuevo usuario en el sistema.

#### Parámetros de la Solicitud

- `username` (string): Nombre de usuario.
- `password` (string): Contraseña del usuario.

#### Ejemplo JSON

Ejemplo de cómo debería ser el JSON para el método POST de la ruta `/register`:

```bash
{
  "username": "usuarioPrueba",
  "password": "123456"
}
```

- **"username"** Es el nombre de usuario del usuario que está intentando autenticarse.

- **"password"** Es la contraseña del usuario que está intentando autenticarse.

#### Respuestas

- `200 OK`: Usuario registrado exitosamente.
- `400 Bad Request`: El nombre de usuario ya está en uso.

### 2. Autenticación de Usuarios

#### Ruta

```http
POST /auth
```

#### Descripción

Autentica al usuario y devuelve un token JWT.

#### Parámetros de la Solicitud

- `username` (string): Nombre de usuario.
- `password` (string): Contraseña del usuario.

#### Ejemplo JSON

Ejemplo de cómo debería ser el JSON para el método POST de la ruta `/auth`:

```bash
{
  "username": "usuarioPrueba",
  "password": "123456"
}
```

- **"username"** Es el nombre de usuario del usuario que está intentando autenticarse.

- **"password"** Es la contraseña del usuario que está intentando autenticarse.

#### Respuestas

- `200 OK`: Token JWT generado exitosamente.
- `401 Unauthorized`: Credenciales incorrectas.

### 3. Cálculo del Préstamo

#### Ruta

```http
POST /calcprestamo
```

#### Descripción

Calcula el monto del préstamo basado en el tipo de material y el peso en gramos. La ruta está protegida y requiere un token JWT en el encabezado de la solicitud.

#### Parámetros de la Solicitud

- `Authorization` (header): Token JWT de autenticación.
- `codigo` (string): Código del material.
- `gramos` (number): Peso en gramos del material.

#### Ejemplo JSON

Ejemplo de cómo debería ser el JSON para el método POST de la ruta `/calcprestamo`:

```bash
{
    "codigo": "001",
    "gramos": 50
}
```

- **"codigo"** Es el identificador del material. Puedes usar uno de los códigos definidos en tu lista de materiales (por ejemplo, "001" para Oro puro 24k).

- **"gramos"** Es la cantidad de gramos del material con el que se calculará el préstamo.

En este JSON debe ser incluido en el cuerpo de la solicitud POST a la ruta `/calcprestamo`. Se debe de incluir el token de autenticación en la cabecera de la solicitud, ya que esta ruta está protegida por el middleware authenticateToken. El HEADER podría verse así:

```bash
Authorization: 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW9QcnVlYmEiLCJpYXQiOjE3MDE0MDc1Mzd9.rGYYA3xvm1ZEvTzDffoo0xxIhRE5qMwiRacTOnMGXJQ
```

#### Respuestas

- `200 OK`: Muestra el monto del préstamo calculado.
- `400 Bad Request`: Error si el material no es válido.
- `401 Unauthorized`: Token no proporcionado.
- `403 Forbidden`: Error al verificar el token.
- `500 Internal Server Error`: Error interno del servidor.

## Ejecución del Proyecto

```bash
npm run dev
```

La aplicación se ejecutará en [http://localhost:3000](http://localhost:3000).

## Documentación API

La documentación de la API está disponible en [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## Contribuciones

¡Contribuciones son bienvenidas! Si encuentras algún problema o tienes sugerencias, por favor crea un [issue](https://github.com/abrahamTech/NodeJS-NacMonPieN2APIREST/issues).


