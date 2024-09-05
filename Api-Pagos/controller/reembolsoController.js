//Importaciones 
const Pagos = require('../models/pagos');
const axios = require('axios');

// Controlador para procesar un reembolso
const refundPayment = async (req, res) => {
  try {
    const { id } = req.params; // ID del pago a reembolsar
    const { amount } = req.body; // Monto del reembolso (opcional)
    const xIdempotencyKey = `refund-${id}-${Date.now()}`; // Llave idempotente para evitar duplicados

    const pago = await Pagos.findOne({ where: { pedido_id: id } });

    if (!pago) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }

    // Crear el cuerpo de la solicitud de reembolso
    const data = {};
    if (amount) {
      data.amount = amount;
    }

    // Realizar la solicitud de reembolso a Mercado Pago
    const response = await axios.post(
      `https://api.mercadopago.com/v1/payments/${id}/refunds`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${process.env.MERCADO_PAGO_TOKEN}`, // Aquí usamos la variable de entorno correctamente
          'X-Idempotency-Key': xIdempotencyKey,
        },
      }
    );
    //MANEJO DE ERRORES
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al procesar el reembolso:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error al procesar el reembolso' });
  }
};

module.exports = { refundPayment };
