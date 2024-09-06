import { QueryInterface, DataTypes } from 'sequelize';
import { Sequelize } from 'sequelize/types';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkInsert('productos', [
    {
      nombre: 'Camiseta deportiva',
      categoria: 'Ropa deportiva',
      precio: 29.99,
      tela: 'Algodón',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Pantalones deportivos',
      categoria: 'Ropa deportiva',
      precio: 39.99,
      tela: 'Poliéster',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    // Agrega más objetos si es necesario para completar los 50 registros
  ], {});
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  // Usa un objeto vacío en lugar de null
  await queryInterface.bulkDelete('productos', {}, {});
}
