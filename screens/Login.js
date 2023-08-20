import React, { useContext, useEffect } from 'react';
import { ImageBackground, Image, StyleSheet, TextInput, Dimensions } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { Images, nowTheme } from '../constants/';
const { width } = Dimensions.get("window");

export default function Login(props) {
  const { navigation } = props;
  const [nameUser, onChangeUser] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  return (

    <ImageBackground resizeMode={"cover"}

      source={Images.login}
      style={styles.background}
    >
      <Block flex center >
        <Block center >
          <Text size={15} style={styles.font}>Scan | Spend | Save UP!</Text>
        </Block>
        <Block center space="evenly" style={styles.imageContainer}>
          <Image source={Images.Logo} style={[styles.image]} />
        </Block>
        <Block flex >
          <Text size={25} style={styles.font} >
            Ingresa tu nombre de usuario
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeUser}
            value={nameUser}
            placeholder="User or email"
          />

          <Text size={25} style={styles.font}>
            Digita tu contraseña
          </Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Password"
          />
          <Button
            disabled={(password === "" || nameUser === "") ? true : false}
            shadowless
            style={styles.button}
            color={(password === "" || nameUser === "") ? nowTheme.COLORS.BLACK : nowTheme.COLORS.ACTIVE}
            onPress={() => navigation.navigate('App')}>
            <Text
              style={{ fontFamily: 'lato-bold', fontSize: 14 }}
              color={theme.COLORS.WHITE}
            >
              Iniciar Sesion
            </Text>
          </Button>


          <Text size={25} style={[styles.font]}>
            ¿Aún no estás registrado?
          </Text>


          <Button
            shadowless
            style={styles.button}
            color={nowTheme.COLORS.ACTIVE}
            onPress={() => navigation.navigate('Register')}
          >
            <Text
              style={{ fontFamily: 'lato-bold', fontSize: 14 }}
              color={theme.COLORS.WHITE}
            >
              Registrarse
            </Text>
          </Button>
        </Block>
      </Block>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    marginTop: 15,
  },
  font: {
    fontFamily: 'DMSans-Bold',
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    height: width / 2,
    position: 'relative',
  },
  group: {
    paddingTop: theme.SIZES.BASE / 2
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    padding: 0,
    paddingHorizontal: theme.SIZES.BASE * 2,
    width: 'auto'
  },
  image: {
    width: (width - theme.SIZES.BASE * 2) / 2,
    height: (width - theme.SIZES.BASE * 2) / 2,
    resizeMode: "contain",
    zIndex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    position: "relative",
  }
});
