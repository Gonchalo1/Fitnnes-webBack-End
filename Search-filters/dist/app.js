"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const route_1 = __importDefault(require("./routes/route")); // Asegúrate de que route.ts está en ../routes
// Cargar las variables de entorno
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware para parsear JSON en las peticiones
app.use(express_1.default.json());
// Rutas principales
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});
// Usar las rutas de productos en la ruta base /productos
app.use('/productos', route_1.default);
// Escuchar en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
