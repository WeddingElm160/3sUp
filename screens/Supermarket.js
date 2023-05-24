import React, { useState } from 'react'
import { Input } from '../components';
import { KeyboardAvoidingView, StyleSheet, Image, Dimensions, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Images } from '../constants/';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createFilter } from 'react-native-search-filter';
import stores from '../constants/stores';
const KEYS_TO_FILTERS = ['name'];

const { height, width } = Dimensions.get(Platform.constants.Brand === "Windows" ? "window" : "screen");

function Supermarket(props) {
  const [filteredEmails, setFilteredEmails] = useState(stores);
  const searchUpdated = (term) => {
    setFilteredEmails(stores.filter(createFilter(term, KEYS_TO_FILTERS)))
  }

  return (
    <KeyboardAvoidingView style={{ height: '100%' }}>
      <Block flex center style={styles.contain}>
        <Block style={styles.upperSection}>
          <Input
            placeholder="Selecciona tu tienda."
            shadowless
            iconContent={
              <Ionicons name="search" size={24} color="#747474" style={{ marginEnd: 5 }} />
            }
            onChangeText={(term) => { searchUpdated(term) }}
          />
        </Block>
        <Block style={styles.lowerSection}>
          {
            filteredEmails.length?<ScrollView>
            {filteredEmails.map((store, index) =><Block key={index}>
              <TouchableOpacity onPress={() => props.navigation.navigate('Cart2')}>
                <Block row style={styles.defaultStyle}>
                  <Block middle style={{ marginRight: 5}}>
                  <Image source={store.image? store.image : Images.cart} style={{...styles.storeImage, backgroundColor: store.image? 'transparent' : '#c0c0c0',}}/>
                  </Block>
                  <Block row center >
                    <Text
                      style={{
                        fontFamily: 'inter-medium',
                        textTransform: 'uppercase',
                        fontWeight: '300',
                        color: '#5f5f5f'
                      }}
                      size={12}
                    >
                      {store.name}
                    </Text>
                  </Block>
                </Block>
                

              </TouchableOpacity>
              <Block
                style={{
                  backgroundColor: '#c0c0c0',
                  height: 1,
                }}
              />
              </Block>
            )}
          </ScrollView>:<Block style={{ opacity: 0.8}} center>
            <Image source={Images.searchSuperMarket} style={{ width: 320, height: 320}}/>
            <Text style={{fontSize: 18, fontWeight: 'bold',fontFamily: 'lato-bold', color: '#303030'}}>Lo siento, tienda no encontrada.</Text>
          </Block>

          }
        </Block>
      </Block>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  contain: {
    width: '100%',
    padding: theme.SIZES.BASE,
  },
  storeImage: {
    width: 48,
    height: 48,
    borderRadius: 5,
    marginRight: 10
  },

  upperSection: {
    width: '100%',
  },
  lowerSection: {
    width: '100%',
    marginBottom: 64
  },
  defaultStyle: {
    paddingVertical: 5,

    color: 'black',
    
  },
});

export default Supermarket;