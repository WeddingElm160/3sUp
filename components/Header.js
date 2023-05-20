import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, StyleSheet, Platform, Dimensions, Keyboard } from 'react-native';
import { Button, Block, NavBar, Text, theme, Button as GaButton } from 'galio-framework';

export default function Header() {

  /*handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };*/

  return (
    <Text>Open up App.js to start working on your app!</Text>
  )
}