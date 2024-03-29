import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Block, GalioProvider } from 'galio-framework';
import { nowTheme } from './constants';
import Screens from './navigation/Screens';
import { AppIsReadyContextProvider } from './context/AppIsReadyContext';
import { StatusBar } from 'expo-status-bar';


export default function App() {

  return (
    /*<View style={styles.container} onLayout={onLayoutRootView}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>*/
    <AppIsReadyContextProvider>
      <NavigationContainer>
        <GalioProvider theme={nowTheme}>
          <Block flex>
            <Screens/>
          </Block>
        </GalioProvider>
      </NavigationContainer>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
   </AppIsReadyContextProvider>
  );

}


