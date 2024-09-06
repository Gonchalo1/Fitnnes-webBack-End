import { Sequelize } from 'sequelize';
import config from '../config/config.json';

const { username, password, database, host, dialect } = config.development;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: dialect as any // Sequelize acepta un string para 'dialect', pero podrías mejorar el tipado si tienes valores específicos
});

export default sequelize;
