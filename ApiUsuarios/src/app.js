const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Utiliza el puerto de las variables de entorno o el puerto 3000 por defecto

// Importar Sequelize y el modelo de usuario
const sequelize = require('../db/db'); // Asegúrate de que la ruta sea correcta
const User = require('../models/userModel');

console.log('JWT_SECRET:', process.env.JWT_SECRET);

// Importar rutas
const userRoutes = require('../routes/userRouter'); // Asegúrate de que la ruta sea correcta

// Middleware para parsear JSON
app.use(express.json());

// Usar rutas
app.use('/user', userRoutes);

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Sincronizar la base de datos y arrancar el servidor
sequelize.sync({ force: false }) // Cambia force a true para forzar la sincronización (esto borrará los datos existentes)
  .then(() => {
    console.log('Database & tables created!');
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
