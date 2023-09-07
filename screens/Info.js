import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Dimensions, ScrollView, Image } from "react-native";
import { Block, theme, Text } from "galio-framework";
import { nowTheme } from '../constants';

const { width, height } = Dimensions.get("window");

function Info() {

  return (
  <Block flex center>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30, width }}
      >
        <Block style={styles.imageContainer}>
          <Image
            source={require("../assets/imgs/home.jpg")}
            style={styles.gradient}
          />
          <Image
            source={require("../assets/imgs/Logo-Leters.png")}
            style={styles.image}
          />
        </Block>

        <Block flex style={styles.group}>
          <Text size={16} style={styles.body}>
            Con 3S UP!, escanea el código de barras de cada producto y lleva la cuenta de tu carrito físico.
            Nuestra aplicación registrará automáticamente la cantidad acumulada en tu carrito virtual,
            para que siempre sepas cuánto llevas gastado.
            {"\n\n"}
            Toma el control de tus finanzas y evita sorpresas desagradables en la caja registradora.
            Con 3S UP!, puedes establecer un presupuesto personalizado y monitorear el monto total acumulado
            en tu carrito virtual. Ahorra y toma decisiones financieras inteligentes.
          </Text>
        </Block>
        <Block style={{...styles.imageContainer, height: 150, marginBottom: 0}}>
          <Image
            source={require("../assets/imgs/Escudo.png")}
            style={styles.image}
          />
        </Block>
          <Text size={16} style={{ textAlign: "center" }}>
            Benemérita Universidad Autónoma de Puebla
          </Text>

        <Block style={styles.body}>
          <Text size={16} style={[styles.title, { textAlign: "center" }]}>
            Desarrolladores:
          </Text>
          <Text size={16} style={{ textAlign: "center" }}>
            José Manuel Balderas Estrada
          </Text>
          <Text size={16} style={{ textAlign: "center" }}>
            Victor Hugo Arista Tecpa
          </Text>

          <Text size={16} style={[styles.title, { textAlign: "center" }]}>
            Creado con:
          </Text>
          <Text size={16} style={{ textAlign: "center" }}>
            React Native <Ionicons name="logo-react" size={18} color={ 'black'} />
          </Text>
          
        </Block>

      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'DMSans-Bold',
    textAlign: 'center',
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: theme.SIZES.BASE,
    color: nowTheme.COLORS.HEADER
  },
  body: {
    fontFamily: 'DMSans-Medium',
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 1,
    color: nowTheme.COLORS.HEADER,
    textAlign: 'justify',
    color: '#737373'
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE * 2,
    height: width/2,
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    opacity: 0.6,
    borderRadius: 15
  },
  buttonText: {
    fontFamily: 'DMSans-Bold',
    marginBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    textAlign: 'center',
  },
  buttonTextIn: {
    fontFamily: 'inter-bold',
    marginBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    textAlign: 'center',
  },
  group: {
    paddingTop: theme.SIZES.BASE/2
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    padding: 0,
    paddingHorizontal: theme.SIZES.BASE * 2,
    width: 'auto'
  },
  image: {
    width: (width - theme.SIZES.BASE * 6) / 2,
    height: '100%',
    resizeMode: "contain",
    zIndex: 1,
  },
});

export default Info;
