import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Block, theme, Button, Text } from "galio-framework";
import nowTheme from '../constants/Theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Images } from '../constants';
import { UserContext } from '../context/UserContext';

function Card(props) {
  
  const { user } = useContext(UserContext);
  const [quantity, setQuantity] = useState(1);
  const incrementQuantity = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };
  
  useEffect(() => {
    props.product.setQuantity(quantity)
  }, [quantity]);

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const selectProduct = () => {
    user.carts[0].setProductIndex(props.index);
    props.navigation.navigate('Product');
  };

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={selectProduct}>
      <Block style={styles.contain} row card>
        <Block middle>
          <Image source={props.product.image?{uri: props.product.image}:Images.cart} style={{ ...styles.productImage, backgroundColor: "#c0c0c0" }} />
        </Block>
        <Block flex>
          <Text style={{ fontSize: 16, fontFamily: 'lato-semibold', fontWeight: 'bold', marginRight: 40}} numberOfLines={1}>{props.product.name}</Text>
          <Text style={{ fontSize: 12, fontFamily: 'lato-semibold', color: '#858585', height: 32 }} numberOfLines={2}>{props.product.description}</Text>
          <Text style={{ fontSize: 18, fontFamily: 'lato-bold', color: '#55BCAE' }}>${props.product.price}</Text>
        </Block>
        <Block style={styles.counter} middle row space="between">
          <Button style={{ ...styles.counterButton, backgroundColor: '#5faca0' }} onPress={decrementQuantity}>
            <Ionicons name="remove" size={10} color={nowTheme.COLORS.WHITE} />
          </Button>
          <Text style={styles.counterText} size={16} color='#55BCAE'>{quantity}</Text>
          <Button style={{ ...styles.counterButton, backgroundColor: '#d0d7ce' }} onPress={incrementQuantity} >
            <Ionicons name="add" size={10} color={'#278F7F'} />
          </Button>
        </Block>
        <Block middle row style={styles.option}>
          <Button style={{ ...styles.optionButton }} >
            <Ionicons name="close" size={10} color={nowTheme.COLORS.BLACK} onPress={()=>props.remove()}/>
          </Button>
        </Block>
      </Block>
    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  contain: {
    width: '100%',
    padding: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE
  },
  productImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
    marginRight: theme.SIZES.BASE
  },
  counter: {
    position: 'absolute',
    bottom: 12,
    right: 18,
    //minWidth: 67
  },
  counterButton: {
    borderRadius: 6,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 0
  },
  counterText: {
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "lato-bold",
    fontWeight: 'bold',
    marginHorizontal: 6
  },
  option: {
    position: 'absolute',
    top: 12,
    right: 18,
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

export default Card