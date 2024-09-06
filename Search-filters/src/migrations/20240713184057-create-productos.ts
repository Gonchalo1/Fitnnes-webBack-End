import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    // Crear la tabla productos
    await queryInterface.createTable('productos', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: true
      },
      precio: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      tela: {
        type: DataTypes.STRING,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    });
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    // Eliminar la tabla productos
    await queryInterface.dropTable('productos');
  }
};
