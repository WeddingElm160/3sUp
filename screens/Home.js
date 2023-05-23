import React from 'react';
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { Block, Text, Button as GaButton, theme } from 'galio-framework';
import { Icon, Header } from '../components';

const { width } = Dimensions.get("window");

class Home extends React.Component {
  render() {
    return (
      <Block flex center>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30, width }}
        >
          <Block flex style={styles.group}>
            <Text size={16} style={styles.title}>
              ¡Bienvenido a 3S UP! Tu aliado para ahorrar mientras compras en el supermercado.
            </Text>
          </Block>

          <Block flex style={styles.group}>
            <Text size={16} style={styles.title}>
              Con 3S UP!, escanea el código de barras de cada producto y lleva la cuenta de tu carrito físico.
              Nuestra aplicación registrará automáticamente la cantidad acumulada en tu carrito virtual,
              para que siempre sepas cuánto llevas gastado.
            </Text>
          </Block>

          <Block flex style={styles.group}>
            <Text size={16} style={styles.title}>
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
              color={theme.COLORS.PRIMARY}
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
    fontFamily: 'lato-semibold',
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 1,
    color: theme.COLORS.HEADER
  },
  body:{
    
  },
  buttonText: {
    fontFamily: 'lato-bold',
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
  }
});

export default Home;
