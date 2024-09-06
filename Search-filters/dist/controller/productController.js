"use strict";
// controllers/productController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarPorNombreYTela = exports.buscarPorNombreYCategoria = exports.buscarPorCategoria = exports.buscarPorNombre = void 0;
const productModel_1 = __importDefault(require("../models/productModel")); // Importamos el modelo tipado
// Helper function to get query params as string
const getQueryParam = (query, key) => {
    if (Array.isArray(query[key])) {
        return query[key][0]; // Solo toma el primer valor si es un array
    }
    return query[key];
};
// Controlador para buscar productos por nombre
const buscarPorNombre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nombre = getQueryParam(req.query, 'nombre');
    try {
        const productos = yield productModel_1.default.findAll({
            where: { nombre }
        });
        res.json(productos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al buscar productos.' });
    }
});
exports.buscarPorNombre = buscarPorNombre;
// Controlador para buscar productos por categoría
const buscarPorCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = getQueryParam(req.query, 'categoria');
    try {
        const productos = yield productModel_1.default.findAll({
            where: { categoria }
        });
        res.json(productos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al buscar productos.' });
    }
});
exports.buscarPorCategoria = buscarPorCategoria;
// Controlador para buscar productos por nombre y categoría
const buscarPorNombreYCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nombre = getQueryParam(req.query, 'nombre');
    const categoria = getQueryParam(req.query, 'categoria');
    try {
        const productos = yield productModel_1.default.findAll({
            where: { nombre, categoria }
        });
        res.json(productos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al buscar productos.' });
    }
});
exports.buscarPorNombreYCategoria = buscarPorNombreYCategoria;
// Controlador para buscar productos por nombre y tela
const buscarPorNombreYTela = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nombre = getQueryParam(req.query, 'nombre');
    const tela = getQueryParam(req.query, 'tela');
    try {
        const productos = yield productModel_1.default.findAll({
            where: { nombre, tela }
        });
        res.json(productos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al buscar productos.' });
    }
});
exports.buscarPorNombreYTela = buscarPorNombreYTela;
