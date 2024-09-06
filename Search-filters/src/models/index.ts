import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Options } from 'sequelize';
import process from 'process';

// Importar el archivo JSON como un módulo
import config from '../config/config.json'; 

// Tipado para la configuración
interface SequelizeConfig {
  [key: string]: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: string;
    use_env_variable?: string;
  };
}

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configData: SequelizeConfig = config as SequelizeConfig;
const db: { [key: string]: any } = {};

let sequelize: Sequelize;
const dbConfig = configData[env];
const options: Options = {
  host: dbConfig.host,
  dialect: dbConfig.dialect as any, // Asegúrate de que el dialecto sea un valor válido
};

if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable] as string, options);
} else {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, options);
}

fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' && // Cambiado a '.ts' para TypeScript
      file.indexOf('.test.ts') === -1
    );
  })
  .forEach((file: string) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName: string) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
