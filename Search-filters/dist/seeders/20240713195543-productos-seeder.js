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
exports.up = up;
exports.down = down;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.bulkInsert('productos', [
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
    });
}
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        // Usa un objeto vacío en lugar de null
        yield queryInterface.bulkDelete('productos', {}, {});
    });
}
