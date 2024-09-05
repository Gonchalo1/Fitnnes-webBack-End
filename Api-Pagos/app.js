//Importaciones
require('dotenv').config();
const express = require('express');
const path = require('path');
const pagoRoute = require('./routes/pagoRoute');
const reembolsoRoute = require('./routes/reembolsoRoute');
const { testConnection } = require('./db/db'); 

// Crear una instancia de Express
const app = express();

// Configurar el middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Prefijos para las rutas de pagos y reembolsos.
app.use('/api', pagoRoute);
app.use('/api', reembolsoRoute);

// Configurar una ruta básica
app.get('/', (req, res) => {
  res.send('¡Hola, mundo xd!');
});

// Servir archivos estáticos (opcional)
app.use(express.static(path.join(__dirname, 'public')));

// Configurar el puerto y escuchar peticiones
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  
  // Probar la conexión a la base de datos
  await testConnection();
});

// Manejo de errores (opcional)
app.use((req, res, next) => {
  res.status(404).send('Página no encontrada');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error del servidor');
});


//Hice todo, nomas no se puede hacer el reembolso, por que hay que poner datos reales y hacer un pago real, cosa que se supone que no tenemos que hacerlo
//Asique estoy limitado por hacer proyectos ficticios, igualmente el resto de las funcionalidades estan terminadas, asique mi trabajo termina aquí.
// La petición se manda de manera manual, pasando el los headers el token y la llave para no repetír la petición (X-idempontecy-key) y se pasa el id del pedido en la url (se saca ese id por la base de datos)