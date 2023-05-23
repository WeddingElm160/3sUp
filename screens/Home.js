import React from 'react';
import { ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import { Block, Text, Button as GaButton, theme } from 'galio-framework';
import { nowTheme } from '../constants';

const { width } = Dimensions.get("window");

class Home extends React.Component {
  render() {
    return (
      <Block flex center>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30, width }}
        >
          <Block style={styles.imageContainer}>
            <Image
              source={require("../assets/imgs/gradient.png")}
              style={styles.gradient}
            />
            <Image
              source={require("../assets/imgs/Logo-Leters.png")}
              style={styles.image}
            />
          </Block>
          <Block flex style={styles.group}>
            <Text size={32} style={styles.title}>
              ¡Bienvenido a 3S UP!
            </Text>
            <Text size={24} style={styles.title}>
              Tu aliado para ahorrar mientras compras en el supermercado.
            </Text>
          </Block>

          <Block flex style={styles.group}>
            <Text size={16} style={styles.body}>
              Con 3S UP!, escanea el código de barras de cada producto y lleva la cuenta de tu carrito físico.
              Nuestra aplicación registrará automáticamente la cantidad acumulada en tu carrito virtual,
              para que siempre sepas cuánto llevas gastado.
            </Text>
          </Block>

          <Block flex style={styles.group}>
            <Text size={16} style={styles.body}>
              Toma el control de tus finanzas y evita sorpresas desagradables en la caja registradora.
              Con 3S UP!, puedes establecer un presupuesto personalizado y monitorear el monto total acumulado
              en tu carrito virtual. Ahorra y toma decisiones financieras inteligentes.
            </Text>
          </Block>

          <Block flex style={styles.group}>
            <Text size={16} style={styles.buttonText}>
              ¿Qué esperas? ¡Empieza a ahorrar ahora! Ve a tu carrito virtual:
            </Text>
            <GaButton
              onPress={() => this.props.navigation.navigate('Carrito')}
              style={styles.button}
              color={nowTheme.COLORS.PRIMARY}
            >
              Carrito
            </GaButton>
          </Block>

        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'DMSans-Bold',
    textAlign: 'center',
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 1,
    color: nowTheme.COLORS.HEADER
  },
  body: {
    fontFamily: 'DMSans-Medium',
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 1,
    color: nowTheme.COLORS.HEADER
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
    paddingTop: theme.SIZES.BASE
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
  },
  image: {
    width: (width - theme.SIZES.BASE * 6) / 2,
    height: (width - theme.SIZES.BASE * 6) / 2,
    resizeMode: "contain",
    zIndex: 1,
  },
});

export default Home;
