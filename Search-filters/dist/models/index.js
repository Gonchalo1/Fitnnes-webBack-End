"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const process_1 = __importDefault(require("process"));
// Importar el archivo JSON como un módulo
const config_json_1 = __importDefault(require("../config/config.json"));
const basename = path_1.default.basename(__filename);
const env = process_1.default.env.NODE_ENV || 'development';
const configData = config_json_1.default;
const db = {};
let sequelize;
const dbConfig = configData[env];
const options = {
    host: dbConfig.host,
    dialect: dbConfig.dialect, // Asegúrate de que el dialecto sea un valor válido
};
if (dbConfig.use_env_variable) {
    sequelize = new sequelize_1.Sequelize(process_1.default.env[dbConfig.use_env_variable], options);
}
else {
    sequelize = new sequelize_1.Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, options);
}
fs_1.default.readdirSync(__dirname)
    .filter((file) => {
    return (file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.ts' && // Cambiado a '.ts' para TypeScript
        file.indexOf('.test.ts') === -1);
})
    .forEach((file) => {
    const model = require(path_1.default.join(__dirname, file))(sequelize, sequelize_1.DataTypes);
    db[model.name] = model;
});
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
