import React, { useContext, useEffect } from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { Images, nowTheme } from '../constants/';


export default function Login(props) {
  const { navigation } = props;
  return (
    <Block >
      <Text>Esto es el login</Text>
      <Button
        shadowless
        style={styles.button}
        color={nowTheme.COLORS.PRIMARY}
        onPress={() => navigation.navigate('Register')}
      >
        <Text
          style={{ fontFamily: 'lato-bold', fontSize: 14 }}
          color={theme.COLORS.WHITE}
        >
          Registrar
        </Text>
      </Button>

    </Block>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});
