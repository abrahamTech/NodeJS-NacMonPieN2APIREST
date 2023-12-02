const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const connectDB = require('./db');
const Material = require('./models/materialModel');

const { swaggerDocs: V1SwaggerDocs } = require('./swagger');

const app = express();

connectDB();

// Configuración del secreto para el token
const SECRET_KEY = 'secreto_para_token';

// Lista de usuarios registrados
const usuariosRegistrados = [];

//Settings
app.set('port', 3000);

//Middlewares
app.use(express.json());

app.get('/prestamo', (req, res) => {
    res.send("Obteniendo el monto del Prestamo:")
})

// Ruta /register de registro de usuarios
app.post('/register', (req, res) => {
    const { username, password } = req.body;
  
    // Verificar si el usuario ya existe
    const existingUser = usuariosRegistrados.find(user => user.username === username);
  
    if (existingUser) {
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    }
  
    // Agregar el nuevo usuario a la lista
    const user = { username, password };

    usuariosRegistrados.push(user);

    res.json({ mensaje: 'Usuario registrado exitosamente'});
});

// Middleware para la autenticación con token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    }); 
};
  
// Ruta /auth para autenticar y obtener un token
app.post('/auth', (req, res) => {
    const { username, password } = req.body;
    
    // Verificar las credenciales del usuario
    const usuario = usuariosRegistrados.find(user => user.username === username && user.password === password);

    if (!usuario) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Generar y devolver un token
    const token = jwt.sign({username}, SECRET_KEY);
    res.json({ token });

});
  
// Ruta /calcprestamo protegida con autenticación
app.post('/calcprestamo', authenticateToken, async (req, res) => {

    const { codigo, gramos } = req.body;

    try {
        // Consultar la base de datos para obtener el material según el código
        const material = await Material.findOne({ codigo });
    
        if (!material) {
          return res.status(400).json({ error: 'Material no válido' });
        }
    
        // Calcular el monto del préstamo
        const montoPrestamo = (gramos * material.precioGramo) * 0.8;
    
        res.json({ montoPrestamo });
      } catch (error) {
        console.error('Error al obtener material desde MongoDB:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
      }

});

app.listen(app.get('port'), () => {
    console.log(`Server listen on port ${app.get("port")}`)

    //Documentación
    V1SwaggerDocs(app, app.get('port'));
})
