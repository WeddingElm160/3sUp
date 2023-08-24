import React, { useState, useContext, useEffect, useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform
} from "react-native";
import { Text, Block, Button, Input, theme } from "galio-framework";
import { FontAwesome } from "@expo/vector-icons";
import { nowTheme } from "../constants";
import { UserContext } from "../context/UserContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from '@react-navigation/native';
import { RightButtonContext } from '../context/RightButtonContext';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import AwesomeAlert from 'react-native-awesome-alerts';

const { height, width } = Dimensions.get(Platform.constants.Brand === "Windows" ? "window" : "screen");
const formatter = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN'});

function Product(props) {
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState(user.carts[0].temporalProduct);
  const [quantity, setQuantity] = useState(product.quantity);
  const [price, setPrice] = useState("");
  const dectectIsFocused = useIsFocused();
  const { setButttonRight } = useContext(RightButtonContext)
  const showOptions = useRef(false);
  const [refresh, setRefresh] = useState(false);
  const [showAlertInfo, setShowAlertInfo] = useState(false);

  const optionsPress = () => {
    showOptions.current = !showOptions.current;
    setRefresh(!refresh);
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
      setQuantity(quantity + 1);
      if (product.added)
        user.carts[0].updateSubtotal(product.price)
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
      user.carts[0].addProduct(user.carts[0].temporalProduct);
    }
    props.navigation.navigate("Cart")
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
            product.added?<MenuItem onPress={optionsPress}>Eliminar Artículo</MenuItem>:<></>
          }
          <MenuItem disabled={true}>Compartir...</MenuItem>
          <MenuDivider />
          <MenuItem onPress={() => { optionsPress(); }}>Editar Artículo</MenuItem>
        </Menu>
      </Block>
      {/* Sección superior */}
      <Block style={styles.topSection}>
        <Image
          source={
            !product.image
              ? require("../assets/imgs/productNotFound.png")
              : {
                uri: product
                  .image[0],
              }
          }
          style={styles.image}
          resizeMode="contain"
        />
      </Block>

      {/* Sección central */}
      <Block style={styles.middleSection}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        <Block style={styles.productInfo}>
          <Block style={styles.priceContainer} flex={1} left>
            <Block row middle>
              <Text style={styles.priceLabel}>Precio unitario</Text>
              <Button
                style={styles.infoButton}
                onPress={() => setShowAlertInfo(true)}
              >
                <Ionicons name="information-circle-outline" size={14} color={nowTheme.COLORS.BLACK} />
              </Button>
            </Block>

            <Block style={styles.priceInputContainer} left>
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
                onChangeText={(value) => formatCurrency(value)}
              />
            </Block>
          </Block>
          <Block bottom>
            <Block style={styles.counter}>
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
        <ScrollView style={styles.description}>
          <Text style={styles.loremText}>
            {product.description}
          </Text>
        </ScrollView>
      </Block>

      {/* Sección inferior */}
      <Block style={styles.bottomSection}>
        <Block style={styles.priceContainer} flex={1} left>
          <Block row middle>
            <Text style={styles.priceLabel}>Subtotal</Text>
          </Block>

          <Block style={styles.priceInputContainer} left>
          <Text style={{ fontSize: 18, fontFamily: 'lato-bold', color: '#55BCAE' }}>{formatter.format(product.price*quantity)}</Text>
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
  },
  image: {
    width: "100%",
    height: "100%",
  },
  middleSection: {
    padding: theme.SIZES.BASE,
    flex: 1,
  },
  productInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    marginEnd: 20,
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
    borderRadius: 25,
    marginStart: 5,
    margin: 0,

  },
  description: {
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 15,
    maxHeight: 101,

  }
});

export default Product;
