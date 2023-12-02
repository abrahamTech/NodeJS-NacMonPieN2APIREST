/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra un nuevo usuario.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: body
 *         name: requestBody
 *         description: Credenciales del nuevo usuario.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               description: Nombre de usuario.
 *             password:
 *               type: string
 *               description: Contraseña del usuario.
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente.
 *         schema:
 *           type: object
 *           properties:
 *             mensaje:
 *               type: string
 *               description: Mensaje de éxito.
 *       400:
 *         description: El nombre de usuario ya está en uso.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: Mensaje de error.
 * 
 * 
 * /auth:
 *   post:
 *     summary: Autentica al usuario y devuelve un token JWT.
 *     tags:
 *       - Autenticación
 *     parameters:
 *       - in: body
 *         name: requestBody
 *         description: Credenciales del usuario para la autenticación.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               description: Nombre de usuario.
 *             password:
 *               type: string
 *               description: Contraseña del usuario.
 *     responses:
 *       200:
 *         description: Token JWT generado exitosamente.
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               description: Token JWT.
 *       401:
 *         description: Credenciales incorrectas.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: Mensaje de error.
 * 
 * 
 * /calcprestamo:
 *   post:
 *     summary: Calcula el monto del préstamo basado en el tipo de material y el peso en gramos.
 *     tags:
 *       - Préstamo
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Token de autenticación (Bearer token).
 *         required: true
 *         type: string
 *       - in: body
 *         name: requestBody
 *         description: Objeto JSON con el código y los gramos del material.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             codigo:
 *               type: string
 *               description: Código del material.
 *             gramos:
 *               type: number
 *               description: Peso en gramos del material.
 *     responses:
 *       200:
 *         description: Muestra el monto del préstamo calculado.
 *         schema:
 *           type: object
 *           properties:
 *             montoPrestamo:
 *               type: number
 *               description: Monto del préstamo calculado.
 *       400:
 *         description: Error si el material no es válido.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: Mensaje de error.
  *       401:
 *         description: Token no proporcionado.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: Mensaje de error.
 *       403:
 *         description: Error al verificar el token.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: Mensaje de error.
 *       500:
 *         description: Error interno del servidor.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: Mensaje de error interno.
 */