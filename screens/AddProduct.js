import React, { useState, useContext, useEffect, useRef } from "react";
import { StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Dimensions, Platform, Keyboard, LogBox } from "react-native";
import { Text, Block, Button, theme, Input } from "galio-framework";
import { FontAwesome } from "@expo/vector-icons";
import { nowTheme } from '../constants';
import { useIsFocused } from '@react-navigation/native';
import { UserContext } from "../context/UserContext";
import Ionicons from '@expo/vector-icons/Ionicons';
import { RightButtonContext } from '../context/RightButtonContext';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { Product } from "../Class/Product";
import Carousel from "react-native-reanimated-carousel";
import AwesomeAlert from 'react-native-awesome-alerts';
import * as ImagePicker from 'expo-image-picker';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { height, width } = Dimensions.get(Platform.constants.Brand === "Windows" ? "window" : "screen");
const formatter = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });


function AddProduct(props) {
  const { user } = useContext(UserContext);
  const [product] = useState(user.carts[0].temporalProduct);
  const [quantity, setQuantity] = useState(product.quantity);
  const [price, setPrice] = useState(product.price);
  const [productName, setProductName] = useState(product.name);
  const [productDescription, setProductDescription] = useState(product.description);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [images, setImages] = useState(product.image.concat(['']));
  const progressValue = useSharedValue(0);
  const [showAlertInfo, setShowAlertInfo] = useState(false);
  const { setButttonRight } = useContext(RightButtonContext)
  const dectectIsFocused = useIsFocused();
  const [refresh, setRefresh] = useState(false);
  const showOptions = useRef(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [resetPrice, setResetPrice] = useState(false);
  const [resetName, setResetName] = useState(false);
  const [resetDescription, setResetDescription] = useState(false);
  const [resetImages, setResetImages] = useState(false);
  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [goBack, setGoBack] = useState('');

  useEffect(
    () =>
    props.navigation.addListener('beforeRemove', (e) => {

        if ((product.added&&(resetPrice||resetDescription||resetImages||resetPrice||resetName))&&!goBack){
          e.preventDefault();
          setShowWarningAlert(true)
        }
          
      }),
    [props.navigation, goBack, resetPrice, resetDescription, resetImages, resetPrice, resetName]
  );

  useEffect(() => {
    if(goBack) {
      if(goBack!='Back')
        props.navigation.navigate(goBack); 
      else {
        props.navigation.goBack()
      
      }
    }
  },[goBack]);

  const resetPricePress = () => {
    formatCurrency(product.price.toString(), true);
    setResetPrice(false);
  }

  const resetNamePress = () => {
    setProductName(product.name);
    setResetName(false);
  }

  const resetImagesPress = () => {
    setImages(product.image.concat(['']));
    setResetImages(false);
  }

  const resetDescriptionPress = () => {
    setProductDescription(product.description);
    setResetDescription(false);
  }

  LogBox.ignoreAllLogs();

  const optionsPress = () => {
    showOptions.current = !showOptions.current;
    setRefresh(!refresh);
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [15, 10],
      quality: 1,
    });

    if (!result.canceled) {
      //console.log(result.assets[0].uri);
      setImages([result.assets[0].uri].concat(images))
      setResetImages(true);
      setShowAlertInfo(false)
    }
  };

  useEffect(() => {
    product.setQuantity(quantity)
  }, [quantity]);

  useEffect(() => {
    product.setQuantity(quantity)
  }, [quantity]);

  useEffect(() => {
    if (dectectIsFocused)
      setButttonRight(
        <Button style={{ width: 40, height: 40, borderRadius: 11, opacity: 1, margin: 0, opacity: 0.6 }} onPress={optionsPress}>
          <Ionicons name='options-outline' size={20} color={nowTheme.COLORS.WHITE} />
        </Button>
      );
  }, [dectectIsFocused]);

  const pickPhotoe = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [15, 10],
      quality: 1,
    });

    if (!result.canceled) {
      //console.log(result.assets[0].uri);
      setImages([result.assets[0].uri].concat(images))
      setResetImages(true);
      setShowAlertInfo(false)
    }
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    formatCurrency(product.price.toString(), true)

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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

  const handleProductNameChange = (value) => {
    setResetName(true)
    setProductName(value);
  };

  const handleProductDescriptionChange = (value) => {
    setResetDescription(true);
    setProductDescription(value);
  };

  const Addpress = () => {
    if (!product.added) {
      user.carts[0].addProduct(new Product(productName, productDescription, price, quantity, images.slice(0, -1)));
    } else {
      user.carts[0].updateSubtotal(-product.price * quantity);
      user.carts[0].updateSubtotal(price * quantity);
      product.setPrice(price);
      product.setName(productName);
      product.setDescription(productDescription);
      product.setQuantity(quantity);
      product.setImage(images.slice(0, -1));
    }
    setGoBack("Cart");
  };
  return (
    <Block contentContainerStyle={styles.container} flex>
      <Block style={{ position: 'absolute', right: 16, top: -40, }}>
        <Menu
          visible={showOptions.current}
          onRequestClose={optionsPress}
          anchor={<></>}
        >
          <MenuItem disabled={!images[imageIndex]} onPress={() => { let img = images; img.splice(imageIndex, 1); setImages(img); optionsPress(); }}>Borrar imagen actual</MenuItem>
          <MenuItem disabled={!images[0]} onPress={() => { setImages(['']); optionsPress(); }}>Borrar todas las imagenes</MenuItem>
          {
            product.added&&<MenuItem disabled={!resetImages} onPress={() => { resetImagesPress(); optionsPress(); }}>Restaurar Imagenes</MenuItem>
          }

        </Menu>
      </Block>
      {/* Sección superior */}
      <Block style={styles.topSection}>
        <Carousel
          {...{
            width: width
          }}
          loop={images[0] ? true : false}
          autoPlay={false}
          data={images}
          pagingEnabled={true}
          onProgressChange={(_, absoluteProgress) =>
            (progressValue.value = absoluteProgress)
          }
          onSnapToItem={index => setImageIndex(index)}
          renderItem={({ index }) =>
            images[index] ?
              <Image
                source={
                  !images
                    ? require("../assets/imgs/productNotFound.png")
                    : {
                      uri: images[index],
                    }
                }
                style={styles.image}
                resizeMode="contain"
              />
              :
              <TouchableOpacity style={styles.imageContainer} onPress={() => setShowAlertInfo(true)}>
                <Text style={styles.placeholderText}>Agregar Foto(s)</Text>
              </TouchableOpacity>
          }
        />
        <Block style={{ ...styles.PaginationItem, justifyContent: images[0] ? "space-between" : 'center' }}>
          {images.map((_, index) => {
            return (
              <PaginationItem
                backgroundColor={nowTheme.COLORS.PRIMARY}
                animValue={progressValue}
                index={index}
                key={index}
                length={images.length}
              />
            );
          })}
        </Block>
        {/* <TouchableOpacity style={styles.imageContainer} onPress={() => { }}>
          <Text style={styles.placeholderText}>Agregar Foto(s)</Text>
        </TouchableOpacity> */}
      </Block>

      {/* Sección central */}
      <Block style={styles.middleSection}>
        <Block style={styles.productInfo} row space="between">
          <TextInput
            style={styles.productInputName}
            value={productName}
            onChangeText={handleProductNameChange}
            placeholder="Nombre de producto"
          />
          {
              (resetName&&product.added )&&
                <Button
                  style={{...styles.resetButton, right: 0, top: 2}}
                  onPress={() => resetNamePress()}
                >
                  <Ionicons name="refresh-outline" size={16} color={nowTheme.COLORS.BLACK} />
                </Button>
            }
        </Block>
        

        <Block style={styles.productInfo}>
          <Block row>
            <Text style={styles.priceLabel}>Precio unitario</Text>
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
                onChangeText={(value) => { formatCurrency(value);  setResetPrice(true);}}
              />
            </Block>

            {
              (resetPrice&&product.added )&&
                <Button
                  style={{...styles.resetButton, right: 75 + theme.SIZES.BASE,}}
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

        <Block flex>
          <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
            <TextInput
              style={styles.productInputDescription}
              value={productDescription}
              onChangeText={handleProductDescriptionChange}
              placeholder="Añade una descripción (opcional)"
              multiline={true}
            />
          </ScrollView>
          {
              (resetDescription&&product.added )&&
                <Button
                  style={{...styles.resetButton, right: 0, top: 2}}
                  onPress={() => resetDescriptionPress()}
                >
                  <Ionicons name="refresh-outline" size={16} color={nowTheme.COLORS.BLACK} />
                </Button>
            }
        </Block>
      </Block>

      {/* Sección inferior */}
      {
        !isKeyboardVisible && <Block style={styles.bottomSection}>
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
              disabled={!Boolean(productName)}
              style={{ ...styles.addButton, backgroundColor: productName ? nowTheme.COLORS.PRIMARY : '#d4e9e6' }}
              onPress={() => Addpress()}
            >
              <Text style={styles.addButtonLabel}>{product.added?'Aceptar':'Agregar'}</Text>
            </Button>
          </Block>
        </Block>
      }
      <AwesomeAlert
        show={showAlertInfo}
        showProgress={false}
        title="Seleccionar imagen..."
        customView={<Block row>
          <Button style={styles.button} onPress={pickPhotoe}><Ionicons name="camera-outline" size={20} color={theme.COLORS.WHITE} /></Button>
          <Button style={styles.button} onPress={pickImage}><Ionicons name="images-outline" size={20} color={theme.COLORS.WHITE} /></Button>
        </Block>}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="Cancelar"
        confirmButtonColor="#8DC4BD"
        onCancelPressed={() => {
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
        message={'¿Estás seguro de salir sin guardar cambios?'}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, continuar"
        confirmText="Si, descartar"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setShowWarningAlert(false);
        }}
        onConfirmPressed={() => {
          setShowWarningAlert(false);
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
    aspectRatio: 1.5,
    backgroundColor: "#E4F4F2",
    borderBottomEndRadius: 21,
    borderBottomStartRadius: 21,
    overflow: 'hidden'
  },
  resetButton: {
    backgroundColor: '#88888888',
    height: 27,
    width: 27,
    borderRadius: 25,
    margin: 0,
    position: "absolute",
  },
  PaginationItem: {
    flexDirection: "row",
    width: 100,
    alignSelf: "center",
    position: 'relative',
    top: -20,
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
  infoButton: {
    backgroundColor: nowTheme.COLORS.BORDER,
    height: 'auto',
    width: "auto",
    paddingHorizontal: 2.5,
    borderRadius: 25,
    marginStart: 5,
    margin: 0,

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
    marginBottom: theme.SIZES.BASE,
  },
  productInputName: {
    fontFamily: "lato-semibold",
    height: 32,
    flex: 1,
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },
  productInputDescription: {
    fontFamily: "lato-semibold",
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    height: "100%",
    backgroundColor: 'white'
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
  button: {
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

export default AddProduct;
