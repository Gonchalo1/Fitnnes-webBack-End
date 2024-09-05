//Migracion para crear la tabla de pagos con sus respectivos campos, que se migran con sequelize y el archivo config.js.
'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pagos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pedido_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      monto: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      metodo_pago: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fecha_transaccion: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      detalles_transaccion: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pagos');
  }
};