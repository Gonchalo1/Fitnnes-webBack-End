const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

// Crear un nuevo usuario
const createUser = async (req, res) => {
  const { name, email, password, address, phone } = req.body;
  try {
    // Generar hash de la contraseña
    const password_hash = await argon2.hash(password);

    // Crear usuario con el hash de la contraseña
    const user = await User.create({ name, email, password_hash, address, phone });

    // Generar token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Retornar el ID del usuario y el token
    res.status(201).json({ id: user.id, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login de usuario
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await argon2.verify(user.password_hash, password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un usuario por ID
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, { attributes: ['id', 'name', 'email', 'address', 'phone', 'register_date'] });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, address, phone } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password_hash = password; // Será encriptada automáticamente por el hook
    if (address) user.address = address;
    if (phone) user.phone = phone;

    await user.save();
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Solicitar recuperación de contraseña
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Generar un token de restablecimiento de contraseña
    const resetToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Aquí puedes enviar el token por correo electrónico

    res.json({ message: 'Password reset link sent', resetToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Restablecer contraseña
const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;
  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.password_hash = newPassword; // Será encriptada automáticamente por el hook
    await user.save();

    res.json({ message: 'Password has been reset successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  login,
  getUser,
  updateUser,
  forgotPassword,
  resetPassword
};