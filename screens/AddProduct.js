import React, { useState } from "react";
import { StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import { Text, Block, Button, theme } from "galio-framework";
import { nowTheme } from '../constants';
import Ionicons from '@expo/vector-icons/Ionicons';

function AddProduct() {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("0.00");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");

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

  const handlePriceChange = (value) => {
    setPrice(value);
  };

  const handleProductNameChange = (value) => {
    setProductName(value);
  };

  const handleProductDescriptionChange = (value) => {
    setProductDescription(value);
  };

  return (
    <Block contentContainerStyle={styles.container} flex>
      {/* Sección superior */}
      <Block style={styles.topSection}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => { }}>
          {productName ? (
            <Image source={{ uri: productName }} style={styles.image} resizeMode="cover" />
          ) : (
            <Text style={styles.placeholderText}>Agregar Foto(s)</Text>
          )}
        </TouchableOpacity>
      </Block>

      {/* Sección central */}
      <Block style={styles.middleSection}>
        <Block style={styles.productInfo} middle>
          <TextInput
            style={styles.productInputName}
            value={productName}
            onChangeText={handleProductNameChange}
            placeholder="Agrega nombre de producto"
          />
          <Block style={styles.counter} middle row space="between" width={74} height={23}>
            <Button style={styles.counterButton} onPress={decrementQuantity}>
              <Ionicons name="remove" size={10} color={nowTheme.COLORS.BLACK} />
            </Button>
            <Text style={styles.counterText}>{quantity}</Text>
            <Button style={styles.counterButton} onPress={incrementQuantity}>
              <Ionicons name="add" size={10} color={nowTheme.COLORS.BLACK} />
            </Button>
          </Block>
        </Block>
        <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
          <TextInput
            style={styles.productInputDescription}
            value={productDescription}
            onChangeText={handleProductDescriptionChange}
            placeholder="Añade una descripción (opcional)"
            multiline={true}
          />
        </ScrollView>
      </Block>

      {/* Sección inferior */}
      <Block style={styles.bottomSection} middle>
        <Block style={styles.priceContainer} flex={1} left>
          <Text style={styles.priceLabel}>Añade el Precio</Text>
          <Block style={styles.priceInputContainer} left>
            <Ionicons name="logo-usd" size={16} color={nowTheme.COLORS.BLACK} style={styles.priceIcon} />
            <TextInput
              style={styles.priceInput}
              value={price}
              onChangeText={handlePriceChange}
              keyboardType="numeric"
            />
          </Block>
        </Block>
        <Button style={styles.addButton}>
          <Text style={styles.addButtonLabel}>Agregar</Text>
        </Button>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: nowTheme.COLORS.WHITE,
  },
  topSection: {
    flex: 1,
    backgroundColor: "#F2F3F8",
    borderBottomEndRadius: 21,
    borderBottomStartRadius: 21,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderText: {
    textAlign: "center",
    fontSize: 24,
    color: nowTheme.COLORS.PRIMARY,
    fontFamily: "lato-bold",
  },
  middleSection: {
    flex: 1,
    padding: 20,
  },
  productInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  productInputName: {
    fontFamily: "lato-semibold",
    height: 32,
    flex: 1,
    marginEnd: theme.SIZES.BASE,
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  productInputDescription: {
    fontFamily: "lato-semibold",
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    height: "100%",
  },
  counter: {
    backgroundColor: "rgba(85, 188, 174, 0.5)",
    borderRadius: 7,
  },
  counterButton: {
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
  bottomSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ECECEC",
    height:118,
  },
  priceContainer: {
  },
  priceLabel: {
    marginStart: 25,
  },
  priceInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  priceIcon: {
    marginRight: 8,
    color: nowTheme.COLORS.PRIMARY,
  },
  priceInput: {
    fontFamily: "inter-medium",
    width: 100,
    height: 30,
    borderWidth: 1,
    borderColor: "#ECECEC",
    color: nowTheme.COLORS.PRIMARY,
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  priceValue: {
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: nowTheme.COLORS.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 54,
    width: 153,
    borderRadius: 11,
  },
  addButtonLabel: {
    color: nowTheme.COLORS.WHITE,
    fontWeight: "bold",
  },
});

export default AddProduct;
