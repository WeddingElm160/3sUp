import React, {useEffect} from 'react';
import { ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import { Block, Text, Button as GaButton, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';

const { width } = Dimensions.get("window");
function Home(props) {
  const dectectIsFocused = useIsFocused();
  useEffect(
    () =>
      props.navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
      }),
    [props.navigation]
  );
  
  return (
    <Block flex center>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{  width }}
        style={{marginBottom: 0}}
      >
        <Block style={styles.imageContainer}>
          <Image
            source={require("../assets/imgs/home.jpg")}
            style={styles.gradient}
          />
          {
            dectectIsFocused&&
            <LottieView source={require('../assets/Anim/logo.json')} autoPlay loop={false} style={{/*backgroundColor:'red',*/ height: 'auto',}}/>
          }
          
        </Block>
        <Block flex style={styles.group}>
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

        <Block center style={{...styles.group, paddingHorizontal: 0, width: '100%'}}>
          <GaButton
            onPress={() => props.navigation.navigate('Login')}
            style={styles.button}
            color={nowTheme.COLORS.PRIMARY}
          >
            ¡Empieza a ahorrar ahora!
          </GaButton>
        </Block>
        
          

      </ScrollView>
      <LottieView source={require('../assets/Anim/wave.json')} autoPlay loop colorFilters={[
        {
          keypath: 'Shape Layer 1',
          color: nowTheme.COLORS.PRIMARY,
        },
        {
          keypath: 'Shape Layer 2',
          color: nowTheme.COLORS.PRIMARY,
        },
        {
          keypath: 'Shape Layer 3',
          color: nowTheme.COLORS.PRIMARY,
        },
      ]}
      style={{/*backgroundColor:'red',*/ height: 'auto',}}/>
      
    </Block>
  );
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
    width: 'auto',
    borderBottomRightRadius:25,
    borderBottomLeftRadius:25,
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
  },
  image: {
    width: (width - theme.SIZES.BASE * 6) / 2,
    height: (width - theme.SIZES.BASE * 6) / 2,
    resizeMode: "contain",
    zIndex: 1,
  },
});

export default Home;
