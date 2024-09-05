const express = require('express');
const { refundPayment } = require('../controller/reembolsoController');

const router = express.Router();

// Ruta para procesar un reembolso
router.post('/payments/:id/refund', refundPayment);

module.exports = router;
