const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Route to create a new user
router.post('/post', userController.createUser);

// Route for login
router.post('/get/login', userController.loginUser);

// Ruta para obtener todos los usuarios
router.get('/get', userController.getAllUsers);

// Ruta para obtener un usuario por su ID
router.get('/get/:userId', userController.getUserById);

// Ruta para actualizar un usuario por su ID
router.put('/update/:userId', userController.updateUser);

// Ruta para eliminar un usuario por su ID
router.delete('/delete/:userId', userController.deleteUser);


module.exports = router; 
