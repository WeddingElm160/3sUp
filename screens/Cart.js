import React, { useState, useRef, useEffect } from "react";
import { Animated, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, Button, theme, Text, Input } from "galio-framework";
import Card from "../components/Card";
import { nowTheme } from '../constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import AwesomeAlert from 'react-native-awesome-alerts';
import {Cart as CartClass} from '../Class/Cart'

const { width, height } = Dimensions.get("window");

function Home(props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [disabledButton, setDisabledButton] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [temporalBudget, setTemporalBudget] = useState(0.0);
  const [budget, setBudget] = useState(0.0);
  const actualCart = useRef(new CartClass())

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: -156,
      duration: 500,
      useNativeDriver: true,
    }).start();
    
    setTimeout(function(){
      setShowAlert(true);
    }, 400);
    
  }, []);

  return (
    <Block flex center style={styles.contain}>
      <Block style={styles.upperSection} row middle>
        <Text size={16} family="lato-semibold" >Presupesto   </Text>
        <Text size={16} family="inter-bold" color="#B7814F" bold>${budget}</Text>
        <Button style={{ ...styles.optionButton, marginStart: 5 }} onPress={()=>setShowAlert(true)} >
          <Ionicons name="create-outline" size={10} color={nowTheme.COLORS.BLACK} />
        </Button>
        
      </Block>
      <Block style={styles.mainSection} middle>
        <ScrollView style={{ width: '100%' }}>
          {/* <Card /> */}
          <Block height={theme.SIZES.BASE + 40} />
        </ScrollView>
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
          <Block style={{backgroundColor: nowTheme.COLORS.PRIMARY}} width={1} height={40} middle>
            <Block style={{backgroundColor: nowTheme.COLORS.WHITE}} width={1} height={24}/>
          </Block>
          <Button textStyle={{ fontFamily: 'inter-bold', fontSize: 12 }}
            style={[styles.allButtonsSection, styles.buttonCenter]}
            onPress={() => props.navigation.navigate('BarcodeScanner')}
          >
            <Block flex middle row>
              <Ionicons name="barcode-outline" size={24} color={theme.COLORS.WHITE} /><Text size={12} family="lato-semibold" color={theme.COLORS.WHITE} >  Escanear</Text>
            </Block>
          </Button>
          <Block style={{backgroundColor: nowTheme.COLORS.PRIMARY}} width={1} height={40} middle>
            <Block style={{backgroundColor: nowTheme.COLORS.WHITE}} width={1} height={24}/>
          </Block>
          <Button textStyle={{ fontFamily: 'lato-semibold', fontSize: 12 }}
            style={[styles.allButtonsSection, styles.buttonLeft]}
          //onPress={}
          >
            <Block flex middle row>
              <Ionicons name="filter" size={20} color={theme.COLORS.WHITE} /><Text size={12} family="lato-semibold" color={theme.COLORS.WHITE} >  Filtrar</Text>
            </Block>
          </Button>
        </Block>
        <Block style={styles.accountSection} center row flex >
          <Block flex>
            <Block row>
              <Text size={16} family="lato-semibold" >Sub. Total   </Text>
              <Text size={16} family="inter-bold" color="#B5B74F" bold>$150.00</Text>
            </Block>
            <Block row>
              <Text size={16} family="lato-semibold" >Cambio       </Text>
              <Text size={16} family="inter-bold" color="#55BCAE" bold>$150.00</Text>
            </Block>
            
          </Block>
          <Button textStyle={{ fontFamily: 'inter-bold', fontSize: 12 }}
            style={{ ...styles.button, backgroundColor: disabledButton ? '#d4e9e6' : nowTheme.COLORS.PRIMARY }}
            //onPress={}
            disabled={disabledButton}
          >
            CUENTA
          </Button>
        </Block>
        
      </Animated.View>

      <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={budget?"Actualizar presupuesto":"Antes de empezar..."}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText={budget?"Cancelar":"No necesito"}
          confirmText="Aceptar"
          confirmButtonColor={Boolean(temporalBudget)?nowTheme.COLORS.PRIMARY: '#d4e9e6'}
          onCancelPressed={() => setShowAlert(false)}
          customView={<Input
            shadowless
            color={theme.COLORS.BLACK}
            value={Boolean(temporalBudget)?temporalBudget:""}
            placeholderTextColor="#747474"
            placeholder="Presupuesto inicial."
            iconContent={
              <Ionicons name="logo-usd" size={15} color="#747474" style={{ marginEnd: 5 }} />
            }
            onChangeText={(value) => setTemporalBudget(value.replace(/[^0-9.]/g, ''))}
          />}
          onConfirmPressed={() => {
            if(temporalBudget){
              setBudget(temporalBudget)
            setShowAlert(false)
            }
          }}
          overlayStyle={{height: height+48}}
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
    paddingBottom: theme.SIZES.BASE
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
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 8,
    left: 0,
    right: 0,
    width: 120,
  },
  accountSection: {
    paddingVertical: 16,
    paddingHorizontal: 16,
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

export default Home;
