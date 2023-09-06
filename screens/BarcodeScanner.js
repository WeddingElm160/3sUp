import React, { useState, useEffect, useRef, useContext } from 'react';
import { Animated, KeyboardAvoidingView, StyleSheet, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import { Camera } from 'expo-camera';
import { Input } from '../components';
import { nowTheme } from '../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RightButtonContext } from '../context/RightButtonContext';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import fetchData from '../constants/apiCaller';
import { UserContext } from '../context/UserContext';
import { Product } from '../Class/Product';
import Card from "../components/Card";

const { height, width } = Dimensions.get(Platform.constants.Brand === "Windows" ? "window" : "screen");

export default function BarcodeScanner(props) {
  const { user } = useContext(UserContext);
  const { setButttonRight } = useContext(RightButtonContext)
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  //const [text, setText] = useState('Not yet scanned');
  const [cameraWidth, setcameraWidth] = useState(0);
  const [cameraHeight, setcameraHeight] = useState(0);
  const [barCode, setBarCode] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);
  const [isLoad, setIsLoad] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const disabledFlash = useRef(true);
  const dectectIsFocused = useIsFocused();
  const cameraRef = useRef();
  const [statusCode, setStatusCode] = useState(0);

  const [barCodeBox, setBarCodeBox] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const viewfinderHeight = 180;
  const viewfinderWidth = 300;

  const aabb = (obj1, obj2) => obj1.x < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x && obj1.y < obj2.y + obj2.height && obj1.y + obj1.height > obj2.y;

  const viewFinderBounds = {
    height: viewfinderHeight,
    width: viewfinderWidth,
    x: (cameraWidth - viewfinderWidth) / 2,
    y: (cameraHeight - viewfinderHeight) / 2,
  };

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  const ButttonRight = () => <Button
    key="flash-button"
    color="info"
    textStyle={{ fontFamily: 'inter-bold', fontSize: 12 }}
    style={{ ...styles.buttonFlash, opacity: disabledFlash.current ? 0.4 : 0.6 }}
    onPress={() => { flashPress(); }}
  >
    <Ionicons key="flash-icon" name={disabledFlash.current ? 'flash-off' : 'flash'} size={16} color="white" />
  </Button>

  const flashPress = () => {
    disabledFlash.current = !disabledFlash.current;
    setButttonRight(
      ButttonRight()
    );
  }

  useEffect(() => {
    if (dectectIsFocused)
      setButttonRight(ButttonRight());
  }, [dectectIsFocused]);

  useEffect(() => {
    askForCameraPermission();
  }, []);


  useEffect(() => {
    setDisabledButton(!Boolean(barCode));
  }, [barCode]);


  const handleBarCodeScanned = ({ data, boundingBox }) => {
    const barCodeBox = {
      height: boundingBox.size.width,
      width: boundingBox.size.height,
      x: boundingBox.origin.y,
      y: boundingBox.origin.x,
    }

    if (aabb(viewFinderBounds, barCodeBox)) {
      setScanned(true);
      Animated.timing(fadeAnim, {
        toValue: -184,
        duration: 500,
        useNativeDriver: true,
      }).start();
      setBarCodeBox(barCodeBox);
      setBarCode(data)
    }
  };

  const onGetItemPress = () => {
    if(!statusCode){
      setIsLoad(true);
      if(user.carts[0].productIsAdded(barCode)){
        setStatusCode(1)
        setIsLoad(false)
        return
      }
        
      fetchData(barCode, user.carts[0].storeName)
        .then((element) => {        
          if(element.statusCode === 200){
            //Actualizar el estado del usuario
            //user.carts[0].addProduct(product);
            //props.navigation.navigate('Cart')
            user.carts[0].setTemporalProduct(new Product(element.body.name, element.body.description, element.body.price, 1, element.body.images, element.body.barCode));
          }
          setStatusCode(element.statusCode);
          setIsLoad(false)
          //console.log(element);
        })
        .catch(error => {
          console.error(error);
        });
    }else if (statusCode == 1) 
      props.navigation.navigate('Product');
      else{
        user.carts[0].addProduct(user.carts[0].temporalProduct);
        props.navigation.navigate('Cart')
      }
  }

  const onCancelPress = () => {
    setScanned(false);
    setStatusCode(0);
    setBarCode('');
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  const findComponentHeight = ({ width, height }) => {
    setcameraHeight(height);
    setcameraWidth(width);
  }

  return (
    <KeyboardAvoidingView style={styles.root}>
      <Block style={styles.upperSection} onLayout={(event) => { findComponentHeight(event.nativeEvent.layout) }}>
        {
          hasPermission === null ?
            <Block center >
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 19,
                  marginTop: 15,
                  marginBottom: 30,
                  zIndex: 2
                }}
              >
                Camera problems!
              </Text>
              <Text
                size={16}
                muted
                style={{
                  textAlign: 'center',
                  zIndex: 2,
                  lineHeight: 25,
                  color: '#9A9A9A',
                  paddingHorizontal: 15
                }}
              >
                Requesting for camera permission.
              </Text>
            </Block>
            : hasPermission === false ?
              <Block center >
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 19,
                    marginTop: 15,
                    marginBottom: 30,
                    zIndex: 2
                  }}
                >
                  Camera problems!
                </Text>
                <Text
                  size={16}
                  muted
                  style={{
                    textAlign: 'center',
                    zIndex: 2,
                    lineHeight: 25,
                    color: '#9A9A9A',
                    paddingHorizontal: 15
                  }}
                >
                  No access to camera
                </Text>
                <Button onPress={() => askForCameraPermission()} >
                  Allow Camera
                </Button>
              </Block>
              : dectectIsFocused ?
                <>
                  <Camera
                    ref={cameraRef}
                    style={styles.backgroundBarCodeScanner}
                    flashMode={disabledFlash.current ? Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.torch}
                    barCodeScannerSettings={{
                      barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
                    }}
                    BarCodeBounds={{
                      origin: { x: 0, y: 0 },
                      size: { height: 5, width: 5 }
                    }}
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    onMountError={(error) => {
                      console.error("Camera Error:", error);
                    }}
                  />
                  <BarcodeMask width={viewfinderWidth} height={viewfinderHeight} />
                </> : <></>
        }

      </Block>
      {/*
      <Block
        backgroundColor="red"
        //style={styles.rectangle}
        style={{
          backgroundColor: 'red',
          width: barCodeBox.width,
          height: barCodeBox.height,
          top: barCodeBox.y,
          left: barCodeBox.x,
          position: 'absolute',
        }}
      />
      <Block
        backgroundColor="green"
        style={{
          backgroundColor: 'green',
          width: 300,
          height: 200,
          top: viewFinderBounds.y,
          left: viewFinderBounds.x,
          position: 'absolute'
        }}
      /> */}
      {
        scanned ? <Block style={styles.curtain} /> : <></>
      }
      <Block style={styles.manuaSection} flex middle>
        <Button style={styles.manualButtom} onPress={() => {
          setScanned(true);
          Animated.timing(fadeAnim, {
            toValue: -184,
            duration: 500,
            useNativeDriver: true,
          }).start();
          setBarCode('')
        }}><Text size={16} family="lato-semibold" color={theme.COLORS.WHITE}>Añadir manualmente</Text></Button>
      </Block>


      <Animated.View style={{ ...styles.lowerSection, translateY: fadeAnim }}>
        <Block style={{ paddingHorizontal: !statusCode? theme.SIZES.BASE:0 }}>
        {
          !statusCode?
          <Input
            value={barCode}
            placeholder="Escanea el código del producto"
            shadowless
            editable={!isLoad}
            iconContent={
              <Ionicons name="barcode-outline" size={32} color="#747474" style={{ marginEnd: 5 }} />
            }
            onChangeText={(value) => setBarCode(value)}
            keyboardType="numeric"
          />:
          statusCode==1?<Text size={16} family="lato-semibold" color={theme.COLORS.DEFAULT} style={{textAlign: 'center', marginBottom: theme.SIZES.BASE}}>
            PRODUCTO YA AÑADIDO AL CARRITO
          </Text>
          :statusCode==200?
          (dectectIsFocused?<Card onClick={()=>{props.navigation.navigate('Product');}}/>:<></>)
          :<Text size={16} family="lato-semibold" color={theme.COLORS.DEFAULT} style={{textAlign: 'center', marginBottom: theme.SIZES.BASE}}>
            {statusCode==404?'PRODUCTO NO DISPONIBLE':'HAY PROBLEMAS CON LOS SERVIDORES'}
          </Text>

        }
          
        </Block>
        <Block center row>
          <Button textStyle={{ fontFamily: 'inter-bold', fontSize: 12 }}
            style={{ ...styles.button, backgroundColor: isLoad ? theme.COLORS.GREY : nowTheme.COLORS.DEFAULT }}
            onPress={onCancelPress}
            disabled={isLoad}
          >
            CANCELAR
          </Button>
          {(!statusCode||statusCode==200||statusCode==1)?
            <Button textStyle={{ fontFamily: 'inter-bold', fontSize: 12 }}
            style={{ ...styles.button, backgroundColor: disabledButton ? theme.COLORS.DEFAULT : nowTheme.COLORS.PRIMARY }}
            onPress={onGetItemPress}
            disabled={disabledButton||isLoad}
            loading={isLoad}
          >
            {!statusCode ? 'BUSCAR PRODUCTO': statusCode==200?'AÑADIR PRODUCTO':'VER PRODUCTO'}
          </Button>:<></>
          }
          
        </Block>
      </Animated.View>
      <StatusBar style="light" backgroundColor="#000000" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  curtain: {
    position: 'absolute',
    backgroundColor: theme.COLORS.BLACK,
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    bottom: 0,
    opacity: .9
  },
  upperSection: {
    flex: 1,
    backgroundColor: theme.COLORS.BLACK
  },
  lowerSection: {
    position: 'absolute',
    width: '100%',
    bottom: -184,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25
  },
  manuaSection: {
    position: 'absolute',
    bottom: theme.SIZES.BASE,
    width: '100%',
  },
  manualButtom: {
    borderRadius: 25,
    opacity: 0.6,
    width: 'auto',
    paddingHorizontal: theme.SIZES.BASE
  },
  container: {
    backgroundColor: theme.COLORS.BLACK,
    left: 0,
    right: 0,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
    left: 0,
    right: 0
  },
  button: {
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 100,
    left: 0,
    right: 0,
  },
  topButttons: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    margin: 10,
  },
  buttonFlash: {
    width: 40,
    height: 40,
    borderRadius: 250,
    backgroundColor: nowTheme.COLORS.PRIMARY,
    margin: 0,
  },
  buttonDisabled: {
    backgroundColor: theme.COLORS.DEFAULT,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 100,
    left: 0,
    right: 0,
  },

  rectangle: {
    backgroundColor: 'green',
    width: 300,
    height: 200,
    top: (height - (Platform.OS === 'android' && Platform.constants.Brand !== "Windows" ? 28 : 0) - 200) / 2,
    left: (width - 300) / 2,
    position: 'absolute',
  },

  backgroundBarCodeScanner: {
    height: "100%",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
});
