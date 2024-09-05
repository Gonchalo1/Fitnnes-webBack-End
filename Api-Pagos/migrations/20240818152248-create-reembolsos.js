//Migracion para crear la tabla de reembolsos con sus respectivos campos, que se migran con sequelize y el archivo config.js.
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reembolsos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pago_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pagos',
          key: 'id',
        },
      },
      monto: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      razon: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fecha_procesado: {
        type: Sequelize.DATE,
        allowNull: false,
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
    await queryInterface.dropTable('reembolsos');
  }
};