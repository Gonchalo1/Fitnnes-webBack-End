import { Request, Response } from 'express';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import axios from 'axios';
import Pagos from '../models/pagos'; // Importa el modelo de Pagos

// Inicializa el objeto cliente de Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_TOKEN || '', // Asegúrate de proporcionar un valor predeterminado para evitar errores
  options: {
    timeout: 5000,
    idempotencyKey: 'abc'  // Este valor debería ser único por cada solicitud para evitar duplicados
  }
});

// Inicializa el objeto de pago
const payment = new Payment(client);

// Controlador para crear un pago
const payments = async (req: Request, res: Response): Promise<void> => {
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

    // Suponiendo que la respuesta del resultado es directamente la respuesta de Mercado Pago
    const response = result as any; // Cast para manejar el tipo genérico si es necesario

    // Extrae el ID de pedido generado por Mercado Pago
    const pedido_id = response.id;
    // Se almacena el resultado del pago con las variables de las columnas que van en español, para la base de datos.
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
  } catch (error: any) {
    console.log("ERROR");
    console.log(error);
    res.status(400).json({ error: 'Error al procesar el pago' });  // Envía un mensaje más claro en la respuesta de error
  }
};

// Controlador para obtener un pago por id
const getPaymentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const pago = await Pagos.findByPk(id);

    if (!pago) {
      res.status(404).json({ error: 'Pago no encontrado' });
      return;
    }

    res.json(pago);
  } catch (error: any) {
    console.error('Error al obtener el pago:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Controlador para obtener métodos de pago
const getPaymentMethods = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get('https://api.mercadopago.com/v1/payment_methods', {
      headers: {
        Authorization: `Bearer ${process.env.MERCADO_PAGO_TOKEN || ''}`
      }
    });
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Error al obtener los métodos de pago:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error al obtener los métodos de pago' });
  }
};

export {
  payments,
  getPaymentById,
  getPaymentMethods
};
