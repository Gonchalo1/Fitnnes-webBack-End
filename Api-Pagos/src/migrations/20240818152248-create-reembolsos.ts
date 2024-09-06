import { QueryInterface, DataTypes } from 'sequelize';
import { Migration } from 'sequelize-cli';

/** @type {Migration} */
const migration: Migration = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('reembolsos', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
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
    await queryInterface.dropTable('reembolsos');
  }
};

export default migration;
