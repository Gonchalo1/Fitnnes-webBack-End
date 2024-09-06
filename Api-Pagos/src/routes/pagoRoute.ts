import express, { Router } from 'express';
import { payments, getPaymentById, getPaymentMethods } from '../controller/pagoController';

const router: Router = express.Router();

// Ruta para crear un pago
router.post('/payments', payments);
// Ruta para obtener un pago por su id
router.get('/payments/:id', getPaymentById);
// Ruta para obtener métodos de pago disponibles
router.get('/payments/methods', getPaymentMethods);

export default router;
