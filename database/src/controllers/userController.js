const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Controller to create a new user
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador para obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener un usuario por su ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para actualizar un usuario por su ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para eliminar un usuario por su ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Controller for login
exports.loginUser = async (req, res) => {
  try {
    const { usuario, contraseña} = req.body;
    const user = await User.findOne({ usuario });
    if (user == null){
      // console.log('Wrong User')
      res.status(404).json({ error: 'Credenciales: User inválidas'});
    }
    else if (user.contraseña === contraseña){
      // console.log('Login')
      const token = jwt.sign({ userId: user._id }, 'secreto', { expiresIn: '1h' });
      res.json({ token });
    }else{
      // console.log('Wrong Password')
      res.status(404).json({ error: 'Credenciales: Password inválidas'});
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};