import React, { useState, useRef, useEffect, useContext } from "react";
import { Animated, StyleSheet, Dimensions, ScrollView, Image } from "react-native";
import { Block, Button, theme, Text, Input } from "galio-framework";
import Card from "../components/Card";
import { nowTheme } from '../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import AwesomeAlert from 'react-native-awesome-alerts';
import { UserContext } from "../context/UserContext";
import { useIsFocused } from '@react-navigation/native';
import { Images } from "../constants";
import { RightButtonContext } from '../context/RightButtonContext';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import fetchData from '../constants/apiCaller';

const { width, height } = Dimensions.get("window");
const formatter = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

function Cart(props) {
  const { user } = useContext(UserContext)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showAlert, setShowAlert] = useState(false);
  const [temporalBudget, setTemporalBudget] = useState(0.0);
  const dectectIsFocused = useIsFocused();
  const [updateScreen, setUpdateScreen] = useState(false);
  const { setButttonRight } = useContext(RightButtonContext)
  //const actualCart = useRef(new CartClass())
  const showOptions = useRef(false);
  const [refreshItems, setRefreshItems] = useState(true);
  const [refreshPrice, setRefreshPrice] = useState(true);
  const [products] = useState(user.carts[0].products);


  const optionsPress = () => {
    showOptions.current = !showOptions.current;
    setUpdateScreen(!updateScreen);
  }

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: -156,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(function () {
      setShowAlert(true);
    }, 400);

  }, []);

  useEffect(() => {
    if (!dectectIsFocused)
      setButttonRight(<></>);
    else
      setButttonRight(
        <Button style={{ width: 40, height: 40, borderRadius: 11, opacity: 1, margin: 0 }} onPress={optionsPress}>
          <Ionicons name='options-outline' size={20} color={nowTheme.COLORS.WHITE} />
        </Button>
      );
  }, [dectectIsFocused]);

  useEffect(() => {
    setRefreshItems(true);
  }, [refreshItems]);

  useEffect(() => {
    setRefreshPrice(true);
  }, [refreshPrice]);



  function formatNumber(n) {
    return n.replace(/\D/g, "").replace(/[^0-9.]/g, '')
  }

  function formatCurrency(input_val, blur) {
    if (input_val.indexOf(".") >= 0) {
      var decimal_pos = input_val.indexOf(".");
      var left_side = input_val.substring(0, decimal_pos);
      var right_side = input_val.substring(decimal_pos);
      left_side = formatNumber(left_side);
      right_side = formatNumber(right_side);
      if (blur) {
        right_side += "00";
      }
      right_side = right_side.substring(0, 2);
      input_val = left_side + "." + right_side;

    } else {
      input_val = formatNumber(input_val);
      input_val = input_val;
      if (blur) {
        input_val += ".00";
      }
    }

    setTemporalBudget(input_val);
  }

  return (
    <Block flex center style={styles.contain}>
      <Block style={{ position: 'absolute', right: 16, top: -40, }}>
        <Menu
          visible={showOptions.current}
          onRequestClose={optionsPress}
          anchor={<></>}
        >
          <MenuItem disabled={!products.length} onPress={optionsPress}>Seleccionar</MenuItem>
          <MenuItem disabled={!products.length} onPress={optionsPress}>Borrar todo</MenuItem>
          <MenuItem disabled={true}>Compartir...</MenuItem>
          <MenuDivider />
          {
            !user.carts[0].receipt.budget ?
              <MenuItem onPress={() => { optionsPress(); setShowAlert(true) }}>Añadir Presupesto</MenuItem>
              :
              <MenuItem onPress={() => { optionsPress(); user.carts[0].setBudget(0); setTemporalBudget(0) }}>Eliminar Presupesto</MenuItem>
          }


        </Menu>
      </Block>

      <Block style={styles.upperSection} row middle >
        {
          user.carts[0].receipt.budget ? <>
            <Text size={16} family="lato-semibold" >Presupesto   </Text>
            <Block style={{ maxWidth: width - 32 - 92.7 - 25 }}>
              <Text size={16} family="inter-bold" color="#B7814F" bold>{formatter.format(user.carts[0].receipt.budget)}</Text>
            </Block>
            <Button style={{ ...styles.optionButton, marginStart: 5 }} onPress={() => setShowAlert(true)} >
              <Ionicons name="create-outline" size={10} color={nowTheme.COLORS.BLACK} />
            </Button>
          </>
            : <></>
        }
        {/* <Button style={{ backgroundColor: '#def0eb', borderRadius: 30, margin: 0, height: 32, width: '100%'}} onPress={()=>setShowAlert(true)} >
          <Block flex middle row style={{}}>
            <Text size={16} family="lato-semibold" style={{lineHeight: 16}}>Añadir Presupesto</Text>
            <Ionicons name="cash-outline" size={18} color={nowTheme.COLORS.BLACK} style={{lineHeight: 16, marginLeft: 8}}/>
          </Block>
        </Button> */}



      </Block>
      <Block style={styles.mainSection} middle>
        {products.length ?
          <ScrollView style={{ width: '100%' }}>
            {dectectIsFocused && refreshItems ? products.map((product, i) => <Card key={i} remove={() => { user.carts[0].removeProduct(i); setRefreshItems(false); }} updateScreen={() => setRefreshPrice(false)} onClick={() => { user.carts[0].setTemporalProduct(product); props.navigation.navigate('Product'); }} index={i} />)
              : <></>}

            <Block height={theme.SIZES.BASE + 40} />
          </ScrollView>
          :
          <Image source={Images.emptyCart} style={{ width: '65%' }} resizeMode={'contain'} />
        }
      </Block>
      <Animated.View style={{ ...styles.lowerSection, translateY: fadeAnim }}>
        <Block styles={styles.buttonSection} row flex middle>
          <Button textStyle={{ fontFamily: 'inter-bold', fontSize: 12 }}
            style={[styles.allButtonsSection, styles.buttonRight]}
            onPress={() => props.navigation.navigate('AddProduct')}
          >
            <Block flex middle row>
              <Ionicons name="pencil-sharp" size={18} color={theme.COLORS.WHITE} /><Text size={12} family="lato-semibold" color={theme.COLORS.WHITE} >  Nuevo</Text>
            </Block>
          </Button>
          <Block style={{ backgroundColor: nowTheme.COLORS.PRIMARY }} width={1} height={40} middle>
            <Block style={{ backgroundColor: nowTheme.COLORS.WHITE }} width={1} height={24} />
          </Block>
          <Button textStyle={{ fontFamily: 'inter-bold', fontSize: 12 }}
            style={[styles.allButtonsSection, styles.buttonCenter]}
            onPress={() => props.navigation.navigate('BarcodeScanner')}
          >
            <Block flex middle row>
              <Ionicons name="barcode-outline" size={24} color={theme.COLORS.WHITE} /><Text size={12} family="lato-semibold" color={theme.COLORS.WHITE} >  Escanear</Text>
            </Block>
          </Button>
          <Block style={{ backgroundColor: nowTheme.COLORS.PRIMARY }} width={1} height={40} middle>
            <Block style={{ backgroundColor: nowTheme.COLORS.WHITE }} width={1} height={24} />
          </Block>
          <Button textStyle={{ fontFamily: 'lato-semibold', fontSize: 12 }}
            style={[styles.allButtonsSection, styles.buttonLeft]}
          //onPress={fetchData}
          >
            <Block flex middle row>
              <Ionicons name="filter" size={20} color={theme.COLORS.WHITE} /><Text size={12} family="lato-semibold" color={theme.COLORS.WHITE} >  Filtrar</Text>
            </Block>
          </Button>
        </Block>
        <Block style={styles.accountSection} row center>
          {refreshPrice ?
            <Block flex center>
              <Block row>
                <Block>
                  <Text size={16} family="lato-semibold" >Subtotal     </Text>
                </Block>
                <Block flex>
                  <Text size={16} family="inter-bold" color="#B5B74F" bold >{formatter.format(user.carts[0].receipt.subtotal)}</Text>
                </Block>

              </Block>
              {
                user.carts[0].receipt.budget ?
                  <Block row>
                    <Block>
                      <Text size={16} family="lato-semibold" >Cambio      </Text>
                    </Block>
                    <Block flex>
                      <Text size={16} family="inter-bold" color="#55BCAE" bold>{formatter.format(user.carts[0].receipt.change)}</Text>
                    </Block>
                  </Block>
                  : <></>
              }
            </Block>
            : <></>
          }

          <Block>
            <Button textStyle={{ fontFamily: 'inter-bold', fontSize: 12 }}
              style={{ ...styles.button, backgroundColor: products.length ? nowTheme.COLORS.PRIMARY : '#d4e9e6' }}
              onPress={() => console.log(user.carts[0].products[0])}
              disabled={!Boolean(products.length)}
            >
              <Ionicons name="receipt-outline" size={20} color={theme.COLORS.WHITE} />
            </Button>
          </Block>

        </Block>

      </Animated.View>

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={user.carts[0].receipt.budget ? "Actualizar presupuesto" : "Antes de empezar..."}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText={user.carts[0].receipt.budget ? "Cancelar" : "No necesito"}
        confirmText="Aceptar"
        confirmButtonColor={Boolean(temporalBudget) ? nowTheme.COLORS.PRIMARY : '#d4e9e6'}
        onCancelPressed={() => setShowAlert(false)}
        customView={<Input
          shadowless
          color={theme.COLORS.BLACK}
          value={Boolean(temporalBudget) ? temporalBudget : ""}
          placeholderTextColor="#747474"
          placeholder="Presupuesto inicial."
          iconContent={
            <Ionicons name="logo-usd" size={15} color="#747474" style={{ marginEnd: 5 }} />
          }
          keyboardType="numeric"
          onChangeText={(value) => formatCurrency(value)}
        />}
        onConfirmPressed={() => {
          if (temporalBudget) {
            formatCurrency(temporalBudget, true)
            user.carts[0].setBudget(temporalBudget);
            setShowAlert(false)
          }
        }}
        overlayStyle={{ height: height + 48 }}
      />
    </Block>
  );
}

const styles = StyleSheet.create({
  contain: {
    width: '100%',
    paddingHorizontal: theme.SIZES.BASE
  },
  upperSection: {
    width: '100%',
    paddingTop: 8,
    paddingBottom: theme.SIZES.BASE,
  },
  mainSection: {
    width: '100%',
    marginBottom: 142,
  },
  lowerSection: {
    position: 'absolute',
    width: width,
    bottom: -156,

  },
  button: {
    margin: 0,
    marginStart: theme.SIZES.BASE,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 8,
    left: 0,
    right: 0,
    width: 'auto',
    height: 'auto',
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE - 5
  },
  accountSection: {
    padding: theme.SIZES.BASE,
    backgroundColor: '#F6F6F6',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: theme.SIZES.BASE
  },
  buttonSection: {
  },
  allButtonsSection: {
    margin: 0,
    width: 100,
    height: 40,
    borderRadius: 0
  },
  buttonRight: {
    borderBottomStartRadius: 20,
    borderTopStartRadius: 20
  },
  buttonCenter: {
  },
  buttonLeft: {
    borderBottomEndRadius: 20,
    borderTopEndRadius: 20
  },
  optionButton: {
    backgroundColor: '#def0eb',
    borderRadius: 6,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 0
  }
});

export default Cart;
