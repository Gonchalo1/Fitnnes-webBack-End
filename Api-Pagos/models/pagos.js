// Modelo de pagos.
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db'); // Asegúrate de que esta ruta es correcta y que 'sequelize' está exportado como propiedad del objeto

const Pagos = sequelize.define('Pagos', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  pedido_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  metodo_pago: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_transaccion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  detalles_transaccion: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
    field: 'createdAt' // Define el nombre de la columna en la base de datos
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
    field: 'updatedAt' // Define el nombre de la columna en la base de datos
  }
}, {
  tableName: 'pagos', // Nombre de la tabla en la base de datos
  timestamps: true // Asegúrate de que esta opción esté habilitada para gestionar createdAt y updatedAt automáticamente
});

module.exports = Pagos;
