import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Block, theme, Button, Text } from "galio-framework";
import nowTheme from '../constants/Theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Images } from '../constants';
import { UserContext } from '../context/UserContext';

const formatter = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN'});

function Card(props) {
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState(props.remove? user.carts[0].products[props.index] :user.carts[0].temporalProduct);
  const [quantity, setQuantity] = useState(product.quantity);
  const [refresh, setRefresh] = useState(true);
  

  useEffect(() => {
    setRefresh(true);
  }, [refresh]);
  
  useEffect(() => {
    //console.log(product.name);
  }, []);

  useEffect(() => {
    product.setQuantity(quantity)
  }, [quantity]);
  
  const incrementQuantity = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
      if(product.added){
        user.carts[0].updateSubtotal(product.price)
        props.updateScreen();
        setRefresh(true)
      }
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      if(product.added){
        user.carts[0].updateSubtotal(-product.price)
        props.updateScreen();
        setRefresh(true)
      }
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onClick}>
      <Block style={styles.contain} row card>
        <Block middle>
          <Image source={product.image?{uri: product.image[0]}:Images.cart} style={{ ...styles.productImage, backgroundColor: "#c0c0c0" }} />
        </Block>
        <Block flex>
          <Text style={{ fontSize: 16, fontFamily: 'lato-semibold', fontWeight: 'bold', marginRight: props.remove?40:0}} numberOfLines={1}>{product.name}</Text>
          <Text style={{ fontSize: 12, fontFamily: 'lato-semibold', color: '#858585', height: 32 }} numberOfLines={2}>{product.description}</Text>
          <Text style={{ fontSize: 18, fontFamily: 'lato-bold', color: '#55BCAE' }}>{formatter.format(product.price*quantity)}                  </Text>
        </Block>
        {refresh?<Block style={styles.counter} middle row space="between">
          <Button style={{ ...styles.counterButton, backgroundColor: '#5faca0' }} onPress={decrementQuantity}>
            <Ionicons name="remove" size={10} color={nowTheme.COLORS.WHITE} />
          </Button>
          <Text style={styles.counterText} size={16} color='#55BCAE'>{quantity}</Text>
          <Button style={{ ...styles.counterButton, backgroundColor: '#d0d7ce' }} onPress={incrementQuantity} >
            <Ionicons name="add" size={10} color={'#278F7F'} />
          </Button>
        </Block>:<></>}
        
        {
          props.remove?<Block middle row style={styles.option}>
          <Button style={{ ...styles.optionButton }} onPress={()=>props.remove()}>
            <Ionicons name="close" size={10} color={nowTheme.COLORS.BLACK}/>
          </Button>
        </Block>
        :<></>
        }
        
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