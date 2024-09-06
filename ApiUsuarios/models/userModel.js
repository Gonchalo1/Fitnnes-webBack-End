const { DataTypes } = require('sequelize');
const sequelize = require('../db/db'); // Asegúrate de importar desde tu archivo de configuración de Sequelize
const argon2 = require('argon2'); // Asegúrate de haber instalado argon2

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  register_date: {
    type: DataTypes.DATE, // Cambiado a DATE para manejar fechas correctamente
    allowNull: false,
    defaultValue: DataTypes.NOW, // Esto establece el valor por defecto como la fecha y hora actuales
  },
}, {
  tableName: 'users',
  timestamps: false, // Deshabilitado para evitar las columnas createdAt y updatedAt
  hooks: {
    beforeCreate: async (user) => {
      if (user.password_hash) {
        user.password_hash = await argon2.hash(user.password_hash);
      }
    },
    beforeUpdate: async (user) => {
      if (user.password_hash) {
        user.password_hash = await argon2.hash(user.password_hash);
      }
    }
  }
});

module.exports = User;