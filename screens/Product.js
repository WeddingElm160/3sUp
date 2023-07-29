import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Text, Block, Button, Input } from "galio-framework";
import { FontAwesome } from "@expo/vector-icons";
import { nowTheme } from "../constants";
import { UserContext } from "../context/UserContext";
import Ionicons from "@expo/vector-icons/Ionicons";

function Product(props) {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const { user } = useContext(UserContext);

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
    formatCurrency(user.carts[0].products[user.carts[0].productIndex].price.toString(), true)
  }, []);

  const incrementQuantity = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addPress = (value) => {
    formatCurrency(price)
    props.navigation.navigate("Cart")
  };
  return (
    <Block contentContainerStyle={styles.container} flex>
      {/* Sección superior */}
      <Block style={styles.topSection}>
        <Image
          source={
            !user.carts[0].products[user.carts[0].productIndex].image
              ? require("../assets/imgs/productNotFound.png")
              : {
                  uri: user.carts[0].products[user.carts[0].productIndex]
                    .image[0],
                }
          }
          style={styles.image}
          resizeMode="contain"
        />
      </Block>

      {/* Sección central */}
      <Block style={styles.middleSection}>
        <Block style={styles.productInfo}>
          <Text style={styles.sampleProductText} numberOfLines={2}>
            {user.carts[0].products[user.carts[0].productIndex].name}
          </Text>
          <Block style={styles.counter}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={decrementQuantity}
            >
              <Block style={{...styles.counterIcon, opacity: quantity > 1 ? 1 : 0.5}}>
                <FontAwesome
                  name="minus"
                  size={10}
                  color={nowTheme.COLORS.BLACK}
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
                  color={nowTheme.COLORS.BLACK}
                />
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>
        <ScrollView>
          <Text style={styles.loremText}>
            {user.carts[0].products[user.carts[0].productIndex].description}
          </Text>
        </ScrollView>
      </Block>

      {/* Sección inferior */}
      <Block style={styles.bottomSection}>
        <Block style={styles.priceContainer} flex={1} left>
          <Text style={styles.priceLabel}>Precio</Text>
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
        <Block>
          <Button
            style={styles.addButton}
            onPress={addPress}
          >
            <Text style={styles.addButtonLabel}>Agregar</Text>
          </Button>
        </Block>
      </Block>
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
    padding: 20,
    flex: 1,
  },
  productInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  sampleProductText: {
    maxWidth: "70%",
    fontWeight: "bold",
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
    color: nowTheme.COLORS.BLACK,
    fontFamily: "inter-medium",
  },
  loremText: {
    lineHeight: 24,
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
});

export default Product;
