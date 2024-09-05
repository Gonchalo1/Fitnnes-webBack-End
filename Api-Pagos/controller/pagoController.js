//Importaciones
const { MercadoPagoConfig, Payment } = require('mercadopago');
const axios = require('axios');
const Pagos = require('../models/pagos'); // Importa el modelo de Pagos

// Inicializa el objeto cliente de Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_TOKEN,
  options: {
    timeout: 5000,
    idempotencyKey: 'abc'  // Este valor debería ser único por cada solicitud para evitar duplicados
  }
});

// Inicializa el objeto de pago
const payment = new Payment(client);

// Controlador para crear un pago que manda los datos arcorde a cómo la api los necesita tipeados.
const payments = async (req, res) => {
  console.log("REQUEST");
  console.log(req.body);

  const body = {
    transaction_amount: req.body.transaction_amount,
    description: req.body.description,
    payment_method_id: req.body.paymentMethodId,
    payer: {
      email: req.body.email,
      identification: {
        type: req.body.identificationType,
        number: req.body.number
      }
    }
  };

  try {
    // Crea el pago con Mercado Pago
    const result = await payment.create({ body });
    console.log("result");
    console.log(result);

    const response = result.response || result;

    // Extrae el ID de pedido generado por Mercado Pago
    const pedido_id = response.id;
    //Se almacena el resultado del pago con las variables de las columnas que van en español, para la base de datos.
    const pagoData = {
      pedido_id: pedido_id,
      monto: req.body.transaction_amount,
      metodo_pago: req.body.paymentMethodId,
      estado: response.status || 'pendiente',
      fecha_transaccion: new Date(),
      detalles_transaccion: response // Guarda la respuesta completa de Mercado Pago
    };

    // Guarda el pago en la base de datos
    const nuevoPago = await Pagos.create(pagoData);

    res.status(200).json(nuevoPago);  // Se usa .json para enviar el objeto en formato JSON
  } catch (error) {
    console.log("ERROR");
    console.log(error);
    res.status(400).json({ error: 'Error al procesar el pago' });  // Envía un mensaje más claro en la respuesta de error
  }
};


//MANEJO DE ERRORES
// Controlador para obtener un pago por id
const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const pago = await Pagos.findByPk(id);

    if (!pago) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }

    res.json(pago);
  } catch (error) {
    console.error('Error al obtener el pago:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
const getPaymentMethods = async (req, res) => {
  try {
    const response = await axios.get('https://api.mercadopago.com/v1/payment_methods', {
      headers: {
        Authorization: `Bearer ${process.env.MERCADO_PAGO_TOKEN}`
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error al obtener los métodos de pago:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error al obtener los métodos de pago' });
  }
};

module.exports = {
  payments,
  getPaymentById,
  getPaymentMethods
};
