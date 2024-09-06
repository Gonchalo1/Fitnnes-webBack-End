import dotenv from 'dotenv';
dotenv.config(); // Asegúrate de que las variables de entorno están disponibles

// Verifica si las variables de entorno están definidas
const requiredEnvVars = ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST'];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`La variable de entorno ${envVar} no está definida.`);
  }
});

export default {
  development: {
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    dialect: 'postgres',
  }
};
