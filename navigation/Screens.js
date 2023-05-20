import React from 'react'
import { Block } from 'galio-framework';
import { Text } from 'react-native';
import { Header } from '../components';
import { nowTheme } from '../constants';
// drawer
import CustomDrawerContent from './Menu';
//import CustomDrawerContent from './Menu';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

const { width } = Dimensions.get("window");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function screens() {
  return (
    <Block center>
      <Text>screens</Text>
    </Block>
  )
}

export default screens