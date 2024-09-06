import { QueryInterface, DataTypes } from 'sequelize';
import { Migration } from 'sequelize-cli';

/** @type {Migration} */
const migration: Migration = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('pagos', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      pedido_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      monto: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      metodo_pago: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha_transaccion: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      detalles_transaccion: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('pagos');
  }
};

export default migration;
