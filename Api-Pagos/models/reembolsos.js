// Modelo de reembolsos que cuando se pueda hacer el reembolso se toma de referencia el modelo para que luego se llene la transaccion del reembolso a la base de datos (cuando se pueda realizar el reembolso).
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db'); // Importa la instancia de Sequelize

const Reembolsos = sequelize.define('Reembolsos', {
  // Define los atributos del modelo
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pago_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pagos', // Nombre de la tabla a la que se refiere
      key: 'id', // Clave primaria de la tabla de referencia
    },
  },
  monto: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  razon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_procesado: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  // Configuración adicional del modelo
  tableName: 'reembolsos',
  timestamps: false, // Desactiva timestamps si no los necesitas
});

module.exports = Reembolsos;
