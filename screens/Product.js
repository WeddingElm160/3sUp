import React, { useState, useContext, useEffect, useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { Images } from '../constants';
import { Text, Block, Button, Input, theme } from "galio-framework";
import { FontAwesome } from "@expo/vector-icons";
import { nowTheme } from "../constants";
import { UserContext } from "../context/UserContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused, CommonActions } from '@react-navigation/native';
import { RightButtonContext } from '../context/RightButtonContext';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import AwesomeAlert from 'react-native-awesome-alerts';
import stores from '../constants/stores';
import Carousel from "react-native-reanimated-carousel";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";


const { height, width } = Dimensions.get(Platform.constants.Brand === "Windows" ? "window" : "screen");
const formatter = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

function Product(props) {
  const { user, setShowAlert } = useContext(UserContext);
  const [product] = useState(user.carts[0].temporalProduct);
  const [quantity, setQuantity] = useState(product.quantity);
  const [price, setPrice] = useState("");
  const dectectIsFocused = useIsFocused();
  const { setButttonRight } = useContext(RightButtonContext)
  const showOptions = useRef(false);
  const [refresh, setRefresh] = useState(false);
  const [showAlertInfo, setShowAlertInfo] = useState(false);
  const [resetPrice, setResetPrice] = useState(false);
  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [goBack, setGoBack] = useState('');
  const [removePress, setRemovePress] = useState(false);


  const progressValue = useSharedValue(0);

  useEffect(
    () =>
      props.navigation.addListener('beforeRemove', (e) => {

        if ((product.added && resetPrice) && !goBack) {
          e.preventDefault();
          setShowWarningAlert(true)
        }
      }),
    [props.navigation, resetPrice, goBack]
  );

  useEffect(() => {
    if (goBack) {
      if (goBack != 'Back')
        props.navigation.navigate(goBack);
      else {
        props.navigation.goBack()

      }
    }
  }, [goBack]);

  const optionsPress = () => {
    showOptions.current = !showOptions.current;
    setRefresh(!refresh);
  }

  const resetPricePress = () => {
    formatCurrency(product.price.toString(), true);
    setResetPrice(false);
  }

  function formatNumber(n) {
    return n.replace(/\D/g, "").replace(/[^0-9.]/g, "");
  }

  const formatCurrency = (input_val, blur) => {
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

    setPrice(input_val);
  };

  useEffect(() => {
    if (dectectIsFocused)
      setButttonRight(
        <Button style={{ width: 40, height: 40, borderRadius: 11, opacity: 1, margin: 0, opacity: 0.6 }} onPress={optionsPress}>
          <Ionicons name='options-outline' size={20} color={nowTheme.COLORS.WHITE} />
        </Button>
      );
  }, [dectectIsFocused]);

  useEffect(() => {
    formatCurrency(product.price.toString(), true)
  }, []);

  const incrementQuantity = () => {
    if (quantity < 99) {
      if(user.carts[0].receipt.budget && ((user.carts[0].receipt.change-(price*(quantity+1)))<0) && !user.carts[0].warning){
        setShowAlert([()=>{
          setQuantity(quantity + 1);
          if (product.added)
            user.carts[0].updateSubtotal(product.price)
          setShowAlert(null);
        }])
      }else{
        setQuantity(quantity + 1);
        if (product.added)
          user.carts[0].updateSubtotal(product.price)
      }
      
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      if (product.added)
        user.carts[0].updateSubtotal(-product.price)
    }
  };

  useEffect(() => {
    product.setQuantity(quantity)
  }, [quantity]);

  const addPress = () => {


    if (!product.added) {
      if(user.carts[0].receipt.budget && ((user.carts[0].receipt.change-(price*quantity))<0) && !user.carts[0].warning){
        setShowAlert([()=>{
          product.setPrice(price);
          user.carts[0].addProduct(product);
          props.navigation.navigate('Cart');
          setShowAlert(null);
        }])
      }else{
        product.setPrice(price);
        user.carts[0].addProduct(product);
        setGoBack("Cart");
      }
    } else {
      user.carts[0].updateSubtotal(-product.price * quantity)
      user.carts[0].updateSubtotal(price * quantity)
      product.setPrice(price);
      setGoBack("Cart");
    }
    
  };
  return (
    <Block contentContainerStyle={styles.container} flex>
      <Block style={{ position: 'absolute', right: 16, top: -40, }}>
        <Menu
          visible={showOptions.current}
          onRequestClose={optionsPress}
          anchor={<></>}
        >
          {
            product.added && <MenuItem onPress={() => { setRemovePress(true); setShowWarningAlert(true); optionsPress(); }}>Eliminar Artículo</MenuItem>
          }
          <MenuItem disabled={true}>Compartir...</MenuItem>
          {
            !product.barcode && <>
              <MenuDivider />
              <MenuItem onPress={() => { optionsPress(); props.navigation.navigate("AddProduct") }}>Editar Artículo</MenuItem>
            </>
          }
        </Menu>
      </Block>
      {/* Sección superior */}
      <Block style={styles.topSection}>
        {product.image[0] ?
          <Carousel
            {...{
              width: width
            }}
            loop
            autoPlay={false}
            data={product.image}
            pagingEnabled={true}
            onProgressChange={(_, absoluteProgress) =>
              (progressValue.value = absoluteProgress)
            }
            renderItem={({ index }) => <Image
              source={{ uri: product.image[index] }}
              style={styles.image}
              resizeMode="contain"
            />}
          /> :
          <Image
            source={Images.productNotFound}
            style={styles.image}
            resizeMode="contain"
          />
        }

        <Block style={{ ...styles.PaginationItem, justifyContent: product.image.length == 1 ? 'center' : "space-between" }}>
          {product.image.map((_, index) => {
            return (
              <PaginationItem
                backgroundColor={nowTheme.COLORS.PRIMARY}
                animValue={progressValue}
                index={index}
                key={index}
                length={product.image.length}
              />
            );
          })}
        </Block>
      </Block>
      {/*<Block key={index} style={{backgroundColor: 'red'}}>
          <Text>Hola mundo</Text>
        </Block> */}
      <ScrollView>
        {/* Sección central */}
        <Block style={styles.middleSection}>
          <Text style={styles.productName} numberOfLines={2}>
            {product.name}
          </Text>
          <Block style={styles.productInfo}>
            <Block row>
              <Text style={styles.priceLabel}>Precio unitario</Text>
              <Button
                style={styles.infoButton}
                onPress={() => setShowAlertInfo(true)}
              >
                <Ionicons name="information-circle-outline" size={14} color={nowTheme.COLORS.BLACK} />
              </Button>
            </Block>
            <Block row space='between' middle>
              <Block style={styles.priceInputContainer} left flex={1}>
                <Input
                  style={styles.priceInput}
                  shadowless
                  color={nowTheme.COLORS.BLACK}
                  value={price}
                  placeholderTextColor="#747474"
                  placeholder="Gratis"
                  iconContent={
                    <Ionicons
                      name="logo-usd"
                      size={15}
                      color="#747474"
                      style={{ marginEnd: 5 }}
                    />
                  }
                  keyboardType="numeric"
                  onChangeText={(value) => { formatCurrency(value); setResetPrice(true); }}
                />
              </Block>
              {
                resetPrice &&
                <Button
                  style={styles.resetButton}
                  onPress={() => resetPricePress()}
                >
                  <Ionicons name="refresh-outline" size={16} color={nowTheme.COLORS.BLACK} />
                </Button>
              }

              <Block style={styles.counter} row middle>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={decrementQuantity}
                >
                  <Block style={{ ...styles.counterIcon, opacity: quantity > 1 ? 1 : 0.5 }}>
                    <FontAwesome
                      name="minus"
                      size={10}
                      color={nowTheme.COLORS.PRIMARY}
                    />
                  </Block>
                </TouchableOpacity>
                <Text style={styles.counterText}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={incrementQuantity}
                >
                  <Block style={styles.counterIcon}>
                    <FontAwesome
                      name="plus"
                      size={10}
                      color={nowTheme.COLORS.PRIMARY}
                    />
                  </Block>
                </TouchableOpacity>
              </Block>
            </Block>


          </Block>
          {
            product.description &&
            <ScrollView style={{ ...styles.description, maxHeight: product.barcode ? 101 : 'auto', }}>
              <Text style={styles.loremText}>
                {product.description}
              </Text>
            </ScrollView>
          }
          {/* Parte del código o visión a futuro */}
        <Block flex style={styles.table}>
          <Block row style={{...styles.row, backgroundColor: "rgba(85, 188, 174, 0.5)"}}>
            <Block center flex >
              <Text style={styles.headerText}>Tienda</Text>
            </Block>
            <Block center flex>
              <Text style={styles.headerText}>Precio</Text>
            </Block>
            <Block center flex>
              <Text style={styles.headerText}>Ahorras</Text>
            </Block>
          </Block>

          <Block row style={styles.row}>
            <Block center flex style={styles.cell}>
            <Image source={stores[4].image} style={{ width: 64, height: 64 }} />
            </Block>
            <Block flex center style={styles.cell}>
              <Text>{"$"+(product.price - 4).toFixed(2)}</Text>
            </Block>
            <Block center flex style={styles.cell}>
            <Text>{"$"+
            (product.price-(product.price - 4)).toFixed(2) }</Text>
            </Block>
          </Block>

          <Block row style={styles.row}>
            <Block center flex style={styles.cell}>
            <Image source={stores[3].image} style={{ width: 64, height: 64 }} />
            </Block>
            <Block flex center style={styles.cell}>
              <Text>{"$"+(product.price - 3).toFixed(2)}</Text>
            </Block>
            <Block center flex style={styles.cell}>
            <Text>{"$"+
            (product.price-(product.price - 3)).toFixed(2) }</Text>
            </Block>
          </Block>

          <Block row style={styles.row}>
            <Block center flex style={styles.cell}>
            <Image source={stores[2].image} style={{ width: 64, height: 64 }} />
            </Block>
            <Block flex center style={styles.cell}>
              <Text>{"$"+(product.price - 2).toFixed(2)}</Text>
            </Block>
            <Block center flex style={styles.cell}>
            <Text>{"$"+
            (product.price-(product.price - 2)).toFixed(2) }</Text>
            </Block>
          </Block>

          <Block row style={styles.row}>
            <Block center flex style={styles.cell}>
            <Image source={stores[5].image} style={{ width: 64, height: 64 }} />
            </Block>
            <Block flex center style={styles.cell}>
              <Text>{"$"+(product.price - 1).toFixed(2)}</Text>
            </Block>
            <Block center flex style={styles.cell}>
            <Text>{"$"+
            (product.price-(product.price - 1)).toFixed(2) }</Text>
            </Block>
          </Block>
        </Block>
        </Block>
        

        {/* Parte del código o visión a futuro */}
      </ScrollView>
      {/* Sección inferior */}
      <Block style={styles.bottomSection}>
        <Block style={styles.priceContainer} flex={1} left>
          <Block row middle>
            <Text style={styles.priceLabel}>Subtotal</Text>
          </Block>

          <Block style={styles.priceInputContainer} left>
            <Text style={{ fontSize: 18, fontFamily: 'lato-bold', color: '#55BCAE' }}>{formatter.format((price ? price : 0) * quantity)}</Text>
          </Block>
        </Block>
        <Block>
          <Button
            style={styles.addButton}
            onPress={addPress}
          >
            <Text style={styles.addButtonLabel}>{product.added ? 'Aceptar' : 'Agregar'}</Text>
          </Button>
        </Block>
      </Block>

      <AwesomeAlert
        show={showAlertInfo}
        showProgress={false}
        title="Precisión de precios"
        message="Es importante tener en cuenta que los precios mostrados en esta App pueden no siempre coincidir con los precios de tienda. Por ello, le recomendamos ajustar manualmente el precio para llevar un registro preciso de sus compras. De esta manera, podrá mantener un control efectivo de sus gastos y tomar decisiones informadas al administrar su presupuesto."
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Aceptar"
        confirmButtonColor="#8DC4BD"
        onConfirmPressed={() => {
          setShowAlertInfo(false)
        }}
        contentStyle={{
          textAlign: 'center',
          color: 'red'
        }}
      />

      <AwesomeAlert
        show={showWarningAlert}
        showProgress={false}
        title="Advertencia"
        message={!removePress ? '¿Estás seguro de salir sin guardar cambios?' : '¿Estás seguro de eliminar este producto?'}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, continuar"
        confirmText="Si, descartar"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setRemovePress(false)
          setShowWarningAlert(false);
        }}
        onConfirmPressed={() => {
          setShowWarningAlert(false);
          if (removePress) {
            user.carts[0].removeTemporalProduct();
            setGoBack('Cart')
          } else
            setGoBack('Back')
        }}
      />
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: nowTheme.COLORS.WHITE,
  },
  topSection: {
    width: "100%",
    aspectRatio: 1.5, // Ajusta el tamaño de acuerdo a tus necesidades
    backgroundColor: nowTheme.COLORS.WHITE,
    borderBottomEndRadius: 21,
    borderBottomStartRadius: 21,
    overflow: 'hidden'
  },
  PaginationItem: {
    flexDirection: "row",
    width: 100,
    alignSelf: "center",
    position: 'relative',
    top: -20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  middleSection: {
    padding: theme.SIZES.BASE,
    flex: 1
  },
  productInfo: {
    marginBottom: theme.SIZES.BASE,
  },
  sampleProductText: {
    maxWidth: width - 74 - theme.SIZES.BASE
  },
  productName: {
    fontWeight: "bold",
    marginBottom: theme.SIZES.BASE
  },
  counter: {

    justifyContent: "space-between",
    backgroundColor: "rgba(85, 188, 174, 0.5)",
    borderRadius: 7,
    width: 74,
    height: 23,
    marginVertical: 5
  },
  counterButton: {
    padding: 5,
  },
  counterIcon: {
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  counterText: {
    justifyContent: "center",
    alignItems: "center",
    color: nowTheme.COLORS.WHITE,
    fontFamily: "inter-medium",
  },
  loremText: {
    lineHeight: 18,
    marginVertical: theme.SIZES.BASE / 2,
    marginHorizontal: theme.SIZES.BASE,
    textAlign: 'justify'
  },
  bottomSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#ECECEC",
    backgroundColor: nowTheme.COLORS.BLOCK,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  priceContainer: {},
  priceLabel: {
    marginStart: 5
  },
  priceInputContainer: {
    with: "100%",
    marginEnd: theme.SIZES.BASE,
    padding: 0
  },
  priceIcon: {
    marginRight: 8,
  },
  priceInput: {
    fontFamily: "inter-medium",
    width: "100%",
    height: 30,
    borderWidth: 1,
    borderColor: "#ECECEC",
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginVertical: -8
  },
  priceValue: {
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: nowTheme.COLORS.PRIMARY,
    paddingHorizontal: 25,
    borderRadius: 11,
    width: "auto",
  },
  addButtonLabel: {
    color: nowTheme.COLORS.WHITE,
    fontWeight: "bold",
  },
  infoButton: {
    backgroundColor: nowTheme.COLORS.BORDER,
    height: 'auto',
    width: "auto",
    paddingHorizontal: 2.5,
    borderRadius: 25,
    marginStart: 5,
    margin: 0,

  },
  resetButton: {
    backgroundColor: '#88888888',
    height: 27,
    width: 27,
    borderRadius: 25,
    margin: 0,
    position: "absolute",
    right: 75 + theme.SIZES.BASE,
  },
  description: {
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 15,
  },
  table: {
    marginVertical: theme.SIZES.BASE,
    borderRadius: 15,
    overflow: 'hidden'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor:'lightgray',
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    backgroundColor: 'lightgray',
  },
  headerText: {
    fontWeight: 'bold',
    color: 'white'
  },
  cell: {
    flex: 1,
  },
});

const PaginationItem = (props) => {
  const { animValue, index, length, backgroundColor } = props;
  const width = 10;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <Block
      style={{
        backgroundColor: nowTheme.COLORS.BORDER,
        width,
        height: width,
        borderRadius: 50,
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </Block>
  );
};

export default Product;
