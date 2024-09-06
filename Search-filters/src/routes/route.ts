// routes/route.ts
import { Request, Response, Router } from 'express';
import { buscarPorNombre, buscarPorCategoria, buscarPorNombreYCategoria, buscarPorNombreYTela } from '../controller/productController';

const router = Router();

// Definir las rutas usando los controladores importados
router.get('/productos/nombre', buscarPorNombre);
router.get('/productos/categoria', buscarPorCategoria);
router.get('/productos/nombre-categoria', buscarPorNombreYCategoria);
router.get('/productos/nombre-tela', buscarPorNombreYTela);

export default router;
