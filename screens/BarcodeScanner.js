import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme, Item } from 'galio-framework';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import { Camera } from 'expo-camera';
import { Input, Icon } from '../components';
import { nowTheme } from '../constants';
import Ionicons from '@expo/vector-icons/Ionicons';

const { height, width } = Dimensions.get(Platform.constants.Brand === "Windows" ? "window" : "screen");

export default function BarcodeScanner(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  //const [text, setText] = useState('Not yet scanned');
  const [cameraWidth, setcameraWidth] = useState(0);
  const [cameraHeight, setcameraHeight] = useState(0);
  const [barCode, setBarCode] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);
  const [disabledFlash, setDisabledFlash] = useState(true);

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


  useEffect(() => {
    askForCameraPermission();
  }, []);
  useEffect(() => {
    setDisabledButton(!Boolean(barCode));
  }, [barCode]);


  const handleBarCodeScanned = ({ data, boundingBox }) => {
    setScanned(true);
    const barCodeBox = {
      height: boundingBox.size.height,
      width: boundingBox.size.width,
      x: boundingBox.origin.y,
      y: boundingBox.origin.x,
    }

    setBarCodeBox(barCodeBox);

    if (aabb(viewFinderBounds, barCodeBox)) {
      setBarCode(data)
    }
  };

  const onGetItemPress = () => {
    // do something with button press
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
              : <>
                <Camera
                  style={styles.backgroundBarCodeScanner}
                  flashMode={disabledFlash ? Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.torch}
                  barCodeScannerSettings={{
                    barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
                  }}
                  BarCodeBounds={{
                    origin: { x: 0, y: 0 },
                    size: { height: 5, width: 5 }
                  }}
                  onBarCodeScanned={handleBarCodeScanned}
                />
                <BarcodeMask width={viewfinderWidth} height={viewfinderHeight} />
                <Block row space='between' style={styles.topButttons}>

                  <Button
                    color="info"
                    textStyle={{ fontFamily: 'inter-bold', fontSize: 12 }}
                    style={{ ...styles.buttonFlash, opacity: disabledFlash ? 0.5 : 1 }}
                    onPress={() => setDisabledFlash(!disabledFlash)}
                  >
                    <Ionicons name={disabledFlash ? 'flash-off' : 'flash'} size={18} color="white" />
                  </Button>
                </Block>
              </>
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

      <Block style={styles.lowerSection}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input
            value={barCode}
            placeholder="Escanea el código del producto"
            shadowless
            iconContent={
              <Ionicons name="barcode-outline" size={32} color="#747474" />
            }
            onChangeText={(value) => setBarCode(value)}
          />
        </Block>
        <Block center>
          <Button textStyle={{ fontFamily: 'inter-bold', fontSize: 12 }}
            style={{ ...styles.button, backgroundColor: disabledButton ? theme.COLORS.DEFAULT : nowTheme.COLORS.PRIMARY }}
            onPress={onGetItemPress}
            disabled={disabledButton}
          >
            BUSCAR PRODUCTO
          </Button>
        </Block>
      </Block>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  upperSection: {
    flex: 1,
    backgroundColor: theme.COLORS.BLACK
  },
  lowerSection: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: 'white',
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
    width: 30,
    height: 30,
    borderRadius: 250,
    backgroundColor: nowTheme.COLORS.PRIMARY
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