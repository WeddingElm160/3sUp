// This file is for make request on the database 

// Add User -> Only add an email, password and name user
const addUser = async (usuario, email, contraseña) => {
  try {
    //   const newUser = { name, email, password };
    const newUser = { usuario, email, contraseña };
    console.log(JSON.stringify(newUser));
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
const handleLogin = async (usuario, contraseña, navigation) => {
    try {
      const response = await fetch('http://192.168.100.35:3000/users/get/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, contraseña }),
      });
      
      if (response.status != 404) {
        const data = await response.json();
        // console.log('Token de acceso:', data.token);
        navigation.navigate('App')
      } else {
        console.error('Credenciales Invalidas');
      }
    } catch (error) {
      console.error(error);
    }
  };

// const 

export { addUser, handleLogin };
