const express = require('express');
const { payments, getPaymentById, getPaymentMethods } = require('../controller/pagoController');

const router = express.Router();

// Ruta para crear un pago
router.post('/payments', payments);
// Ruta para obtener un pago por su id
router.get('/payments/:id', getPaymentById);
// Ruta para obtener métodos de pago disponibles
router.get('/payments/methods', getPaymentMethods);

module.exports = router;
