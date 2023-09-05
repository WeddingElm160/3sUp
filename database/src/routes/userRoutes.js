const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Route to create a new user
router.post('/post', userController.createUser); 

// Route for login
router.post('/get/login', userController.loginUser);

// route for update and add a cart
router.put('/update', userController.addCart);

// route for get the carts
router.get('/get', userController.getAllCarts);

module.exports = router; 
