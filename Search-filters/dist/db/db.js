"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_json_1 = __importDefault(require("../config/config.json"));
const { username, password, database, host, dialect } = config_json_1.default.development;
const sequelize = new sequelize_1.Sequelize(database, username, password, {
    host,
    dialect: dialect // Sequelize acepta un string para 'dialect', pero podrías mejorar el tipado si tienes valores específicos
});
exports.default = sequelize;
