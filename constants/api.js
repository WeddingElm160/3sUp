// This file is for make request on the database
let userEmail = ""
let element = ""
// Add User -> Only add an email, password and name user
const addUser = async (usuario, email, contraseña) => {
  try {
    //   const newUser = { name, email, password };
    const newUser = { usuario, email, contraseña };
    // console.log(JSON.stringify(newUser));
    const response = await fetch("http://192.168.100.35:3000/users/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      console.log("Usuario agregado exitosamente");
      return true;
    } else {
      console.error("Error al agregar el usuario");
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};

// Loggin -> This funtion only do a login with hash keys
const handleLogin = async (email, contraseña, navigation) => {
  try {
    const response = await fetch("http://192.168.100.35:3000/users/get/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, contraseña }),
    });

    if (response.status != 404) {
      const data = await response.json();
      userEmail = email;
      // console.log('Token de acceso:', data.token);
      navigation.navigate("App");
    } else {
      console.error("Credenciales Invalidas");
    }
  } catch (error) {
    console.error(error);
  }
};

function fillArray(cart) {
  const productSchema = [];
  for (let products of cart.products) {
    const product = {
      name: products.name,
      price: products.price,
      quantity: products.quantity,
      image: products.image[0],
      barcode: products.barcode,
    };
    productSchema.push(product);
  }
  return productSchema;
}

function getDate() {
  // Get actual date
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  return `${day}/${month}/${year}`;
}

function getHour() {
  // get the current date
  const currentDate = new Date();
  const hour = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  return `${hour}:${minutes}:00`;
}

const addCart = async (cart, email, navigation) => {
  try {
    const shoppingLists = {
      date: getDate(),
      hour: getHour(), 
      storeName: cart.storeName,
      products: fillArray(cart),
      budget: cart.receipt.budget,
      subtotal: cart.receipt.subtotal,
    };
    // shoppingListSchema = JSON.stringify(products, null, 2);
    // console.log(shoppingListSchema);
    // console.log(userEmail);
    const response = await fetch("http://192.168.100.35:3000/users/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, shoppingLists }),
    });

    if (response.status === 200) {
      userEmail = email;
      console.log("Cart added succesfully");
      navigation.navigate('Supermarket');
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error(error);
  }
};

const getEveryCarts = async (email) => {
  try {
    const response = await fetch(`http://192.168.100.35:3000/users/get?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(email);
    if (response.status == 404) {
      console.error("User not found");
    }
    userEmail = email;
    const data = await response.json();
    // console.log(data.carts.shoppingLists[0]);
    return data
    
    // console.log(data.carts.shoppingLists); // To extract the info

  } catch (error) {
    console.log(error);
  }
}

function getUserById( user, navigation ) {
  element = user;
  navigation.navigate('Ticket');
  // console.log(JSON.stringify((element), null, 2))
}

export { addUser, handleLogin, addCart, getEveryCarts, getUserById, userEmail, element };
