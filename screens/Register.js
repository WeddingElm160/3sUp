import React from 'react';
import { nowTheme } from '../constants/';
import { StyleSheet, TextInput, Dimensions, ImageBackground } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { Ionicons } from '@expo/vector-icons'; 'google-it/lib/utils';
const { width } = Dimensions.get("window");
import { Images } from '../constants';
import {addUser} from '../constants/api'


export default function Register(props) {
  const { navigation } = props;
  const [password, onChangePassword] = React.useState("")
  const [nameUser, onChangeUser] = React.useState("")
  const [email, onChangeEmail] = React.useState("")
  const [confirmPw, onChangePw] = React.useState("")

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (email ==="") {
      return true
    }
    else {
      return emailRegex.test(email)
    }
  };

  return (

    <ImageBackground resizeMode="cover"
      source={Images.login}
      style={styles.background}
    >
      <Block flex size={width}>
        <Block center >
          <Text size={15} style={styles.font}>Scan | Spend | Save UP!</Text>
        </Block>
        <Button style={{ width: 40, height: 40, borderRadius: 11, opacity: 1, margin: 0 }} onPress={() => navigation.navigate('Login')}>
          <Ionicons name='chevron-back-outline' size={20} color={nowTheme.COLORS.WHITE} />
        </Button>
        <Block flex center>
          <Block style={styles.group}>
            <Text center size={25} style={styles.font} adjustsFontSizeToFit={true} numberOfLines={2}>
              ¡Hola!{'\n'} Esta es la página de registro
            </Text>

            <Text size={20} style={styles.font} adjustsFontSizeToFit={true} numberOfLines={1}>
              Digita un correo eléctronico
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeEmail}
              value={email}
              placeholder="E-mail"
            />
            {!isValidEmail(email) && (
              <Text style={{ color: 'red' }}>Ingrese un correo electrónico válido.</Text>
            )}
            <Text size={20} style={styles.font} adjustsFontSizeToFit={true} numberOfLines={1}>
              Ingresa tu nombre de usuario
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeUser}
              value={nameUser}
              placeholder="Name User"
            />

            <Text size={20} style={styles.font} adjustsFontSizeToFit={true} numberOfLines={1}>
              Ingresa una contraseña
            </Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              onChangeText={onChangePassword}
              value={password}
              placeholder="Password"
            />

            <Text size={20} style={styles.font} adjustsFontSizeToFit={true} numberOfLines={1}>
              Confirma tu contraseña
            </Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              onChangeText={onChangePw}
              value={confirmPw}
              placeholder="Confirm Password"
            />
            {password !== confirmPw && (
            <Text style={{ color: 'red' }}>Las contraseñas no coinciden.</Text>
            )}

            {password.length <= 3 && password.length >=1 && (<Text style={{ color: 'red' }}>Minimo 4 caracteres en la contraseña</Text>)}
            <Block flex center >
              <Button
                disabled={(nameUser === "" || password === ""  || password.length <= 3 || email === "" || !(confirmPw === password)) ? true : false }
                shadowless
                style={styles.button}
                color={(nameUser === "" || password === "" || password.length <= 3 || email === "" || !(confirmPw === password)) ? nowTheme.COLORS.BLACK : nowTheme.COLORS.ACTIVE}
                // onPress={ () => navigation.navigate('Login')}
                onPress={ () => addUser(nameUser.trim(), email.trim(), password) ? navigation.navigate('Login') : false}
              >
                <Text
                  style={{ fontFamily: 'lato-bold', fontSize: 14 }}
                  color={theme.COLORS.WHITE}
                >
                  Registrar
                </Text>
              </Button>
            </Block>
          </Block>
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
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  group: {
    paddingTop: theme.SIZES.BASE / 2
  },
})