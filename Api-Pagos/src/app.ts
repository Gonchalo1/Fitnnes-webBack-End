// Importaciones
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import pagoRoute from './routes/pagoRoute';
import reembolsoRoute from './routes/reembolsoRoute';
import { testConnection } from './db/db';

// Cargar las variables de entorno
dotenv.config();

// Crear una instancia de Express
const app = express();

// Configurar el middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Prefijos para las rutas de pagos y reembolsos
app.use('/api', pagoRoute);
app.use('/api', reembolsoRoute);

// Configurar una ruta básica
app.get('/', (req: Request, res: Response) => {
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
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('Página no encontrada');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Error del servidor');
});
