"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db/db")); // Importamos la instancia de Sequelize desde db.ts
// Extender la clase Model de Sequelize para usar los atributos definidos
class Producto extends sequelize_1.Model {
}
// Definir el modelo con sus columnas y tipos
Producto.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    categoria: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    precio: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true
    },
    tela: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    sequelize: db_1.default,
    modelName: 'productos', // El nombre del modelo en la base de datos
    tableName: 'productos', // Nombre de la tabla explícitamente
    timestamps: true
});
exports.default = Producto;
