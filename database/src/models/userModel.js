const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  // Agregar url de la imagen del producto en la posicion[0]
  image: String,
  barcode: String,
});

const shoppingListSchema = new mongoose.Schema({
  // Agregar feha y hora
  date: String,
  hour: String,
  storeName: String,
  products: [productSchema], // Product's Array
  budget: Number,
  subtotal: Number,
  // Hacer la formula del cambio en la pantalla del ticket
});


// Define el esquema del modelo de usuario
const userSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contraseña: {
    type: String,
    required: true
  },
  cart:{
    shoppingLists: [shoppingListSchema]
  }
});

// Crea el modelo de usuario a partir del esquema
const User = mongoose.model('User', userSchema);

module.exports = User;
