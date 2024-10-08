"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            // Crear la tabla productos
            yield queryInterface.createTable('productos', {
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
            });
        });
    },
    down(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            // Eliminar la tabla productos
            yield queryInterface.dropTable('productos');
        });
    }
};
