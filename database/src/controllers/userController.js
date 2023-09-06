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

// Controller for login
exports.loginUser = async (req, res) => {
  try {
    const { email, contraseña} = req.body;
    const user = await User.findOne({ email: email });
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

// contoller for add a new cart
exports.addCart = async (req, res) =>{
  try{
    const { email, shoppingLists} = req.body;
    const user = await User.findOne({ email });

    if(!user){
      return res.status(404).json({ message:"User not found"})
    }
    user.cart.shoppingLists.push(shoppingLists)
    await user.save()
    res.status(200).json({ message: "Cart added successfully"})


  }catch(error){
    console.error(error)
  }
}

// controller to get all carts
exports.getAllCarts = async(req, res) =>{
  try{
    const { email } = req.query;
    const user = await User.findOne({ email })
    if(!user){
      res.status(404).json({message : "User not found"})
    }
      const carts = user.cart;
      res.status(200).json({ carts })
  }catch(error){
    console.error(error)
  }
}