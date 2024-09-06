import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Asegúrate de tener dotenv configurado para acceder a las variables de entorno

// Configuración de la base de datos desde las variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME as string, 
  process.env.DB_USER as string, 
  process.env.DB_PASSWORD as string, 
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Opcional: Desactiva el logging de SQL para evitar desorden en la consola
  }
);

const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

// Exporta la instancia de Sequelize para usarla en otros archivos
export { sequelize, testConnection };
