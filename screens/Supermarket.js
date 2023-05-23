import React from 'react'
import { Input } from '../components';
import { KeyboardAvoidingView, StyleSheet, Image, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { Images } from '../constants/';
import Ionicons from '@expo/vector-icons/Ionicons';

const { height, width } = Dimensions.get(Platform.constants.Brand === "Windows" ? "window" : "screen");

function Supermarket() {
  return (
    <KeyboardAvoidingView style={{height: '100%'}}>
      <Block flex center style={styles.contain}>
        <Block style={styles.upperSection}>
          <Input
            placeholder="Selecciona tu tienda."
            shadowless
            iconContent={
              <Ionicons name="search" size={24} color="#747474" style={{ marginEnd: 5 }} />
            }
          />
        </Block>
        <Block style={styles.lowerSection}>
          <Block style={{ opacity: 0.8}} center>
            <Image source={Images.searchSuperMarket} style={{ width: 320, height: 320}}/>
            <Text style={{fontSize: 18, fontWeight: 'bold',fontFamily: 'lato-bold', color: '#303030'}}>Encuentra tu tienda preferida</Text>
          </Block>
        </Block>
      </Block>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  contain: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    height: '100%'
  },

  upperSection: {
    width: '100%',
  },
  lowerSection: {
    width: '100%',
    height: '100%',
    
    
    
  }
});

export default Supermarket;