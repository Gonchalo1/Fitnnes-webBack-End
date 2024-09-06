// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/autenticateToken');


router.post('/', userController.createUser); // Registro de usuario
router.post('/auth/login', userController.login); // Autenticar usuario
router.get('/:id', authMiddleware, userController.getUser); // Ruta protegida
router.put('/:id', authMiddleware, userController.updateUser); // Ruta protegida
router.post('/auth/forgot-password', userController.forgotPassword); // Solicitar recuperación de contraseña
router.post('/auth/reset-password', userController.resetPassword); // Restablecer contraseña


module.exports = router;
