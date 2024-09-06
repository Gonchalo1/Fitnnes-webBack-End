import express, { Router } from 'express';
import { refundPayment } from '../controller/reembolsoController';

const router: Router = express.Router();

// Ruta para procesar un reembolso
router.post('/payments/:id/refund', refundPayment);

export default router;
