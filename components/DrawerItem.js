import { Block, Text, theme } from 'galio-framework';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import React from 'react';
import nowTheme from '../constants/Theme';

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case 'Inicio':
        return (
          <Ionicons name="home" size={18} color={focused ? nowTheme.COLORS.PRIMARY : 'black'} style={{ opacity: 0.5 }}/>
        );
      case 'Carrito':
        return (
          <Ionicons name="cart" size={18} color={focused ? nowTheme.COLORS.PRIMARY : 'black'} style={{ opacity: 0.5 }}/>
        );
      case 'Guardado':
        return (
          <Ionicons name="bookmark" size={18} color={focused ? nowTheme.COLORS.PRIMARY : 'black'} style={{ opacity: 0.5 }}/>
        );
      case 'Historial':
        return (
          <Ionicons name="receipt" size={18} color={focused ? nowTheme.COLORS.PRIMARY : 'black'} style={{ opacity: 0.5 }}/>
        );
      case 'Acerca de':
        return (
          <Ionicons name="information-circle" size={18} color={focused ? nowTheme.COLORS.PRIMARY : 'black'} style={{ opacity: 0.5 }}/>
        );
      default:
        return null;
    }
  };

  render() {
    const { focused, title, navigation } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null,
    ];

    return (
      <TouchableOpacity
        style={{ height: 60 }}
        onPress={() =>
          navigation.navigate(title)
        }
      >
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{ marginRight: 5 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              style={{
                fontFamily: 'lato-semibold',
                textTransform: 'uppercase',
                fontWeight: '300',
              }}
              size={12}
              bold={focused ? true : false}
              color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
            >
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14,
    color: 'white',
  },
  activeStyle: {
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 30,
    color: 'white',
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
  },
});

export default DrawerItem;
