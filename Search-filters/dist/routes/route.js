"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/route.ts
const express_1 = require("express");
const productController_1 = require("../controller/productController");
const router = (0, express_1.Router)();
// Definir las rutas usando los controladores importados
router.get('/productos/nombre', productController_1.buscarPorNombre);
router.get('/productos/categoria', productController_1.buscarPorCategoria);
router.get('/productos/nombre-categoria', productController_1.buscarPorNombreYCategoria);
router.get('/productos/nombre-tela', productController_1.buscarPorNombreYTela);
exports.default = router;
