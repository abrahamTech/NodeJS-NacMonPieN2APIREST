const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// Configuración del secreto para el token
const SECRET_KEY = 'secreto_para_token';

// Datos de los materiales
const materiales = {
  '001': { nombre: 'Oro puro 24k', precioGramo: 1500.00 },
  '002': { nombre: 'Oro alto 18k', precioGramo: 1000.00 },
  '003': { nombre: 'Oro medio 14k', precioGramo: 800.00 },
  '004': { nombre: 'Oro bajo 10k', precioGramo: 500.00 },
  '005': { nombre: 'Plata ley .925', precioGramo: 300.00 },
  '006': { nombre: 'Titanio', precioGramo: 200.00 },
  '007': { nombre: 'Rodio', precioGramo: 100.00 },
};

// Usuario y contraseña hardcoded para propósitos de ejemplo
const usuarioEjemplo = {
    username: 'usuarioPrueba',
    password: '123456',
  };

//Settings
app.set('port', 3000);

//Middlewares
app.use(express.json());

app.get('/prestamo', (req, res) => {
    res.send("Obteniendo el monto del Prestamo:")
})

// Middleware para la autenticación con token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    }); 
  };
  
  // Ruta para autenticar y obtener un token
  app.post('/auth', (req, res) => {
    const { username, password } = req.body;
    
    // Verificar las credenciales del usuario
    if (username === usuarioEjemplo.username && password === usuarioEjemplo.password) {
        // Generar y devolver un token
        const user = { username: usuarioEjemplo.username };
        const token = jwt.sign(user, SECRET_KEY);
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
    }

  });
  
  // Ruta protegida con autenticación
  app.post('/calcprestamo', authenticateToken, (req, res) => {
    const { id, gramos } = req.body;
    const material = materiales[id];
  
    if (!material) {
      return res.status(400).json({ error: 'Material no válido' });
    }
  
    const montoPrestamo = (gramos * material.precioGramo) * 0.8;
  
    res.json({ montoPrestamo });
  });

app.listen(app.get('port'), () => {
    console.log(`Server listen on port ${app.get("port")}`)
})
