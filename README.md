# NodeJS-NacMonPieN2APIREST
API REST that evaluates the estimated loan amount, based on the material and weight of the item.


## JSON Ruta /auth 

Ejemplo de cómo debería ser el JSON para el método POST de la ruta `/auth`:

```bash
{
  "username": "usuarioPrueba",
  "password": "123456"
}
```

- **"username"** Es el nombre de usuario del usuario que está intentando autenticarse.

- **"password"** Es la contraseña del usuario que está intentando autenticarse.


## JSON Ruta /calcprestamo 

Ejemplo de cómo debería ser el JSON para el método POST de la ruta `/calcprestamo`:

```bash
{
  "id": "001",
  "gramos": "50"
}
```

- **"id"** Es el identificador del material. Puedes usar uno de los códigos definidos en tu lista de materiales (por ejemplo, "001" para Oro puro 24k).

- **"gramos"** Es la cantidad de gramos del material con el que se calculará el préstamo.

En este JSON debe ser incluido en el cuerpo de la solicitud POST a la ruta `/calcprestamo`. Se debe de incluir el token de autenticación en la cabecera de la solicitud, ya que esta ruta está protegida por el middleware authenticateToken. El HEADER podría verse así:

```bash
Authorization: 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW9QcnVlYmEiLCJpYXQiOjE3MDE0MDA0Mjl9.i27QKtvEPW7CM66MjkT2p25mmb9jODHAwBw-3PB13Jw
```