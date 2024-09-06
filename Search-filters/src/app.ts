import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import productosRouter from './routes/route'; // Asegúrate de que route.ts está en ../routes

// Cargar las variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Rutas principales
app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola, mundo!');
});

// Usar las rutas de productos en la ruta base /productos
app.use('/productos', productosRouter);

// Escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
