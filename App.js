import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { Block, GalioProvider } from 'galio-framework';
import { nowTheme } from './constants';
import Screens from './navigation/Screens';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          'inter-bold': require('./assets/font/Inter-Bold.ttf'),
          'inter-medium': require('./assets/font/Inter-Medium.ttf'),
          'lato-bold': require('./assets/font/Lato-Bold.ttf'),
          'lato-semibold': require('./assets/font/Lato-SemiBold.ttf')
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    /*<View style={styles.container} onLayout={onLayoutRootView}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>*/
    <NavigationContainer onNavigationStateChange={onLayoutRootView}>
      <GalioProvider theme={nowTheme}>
      <View onLayout={onLayoutRootView}></View>
        <Block flex>
          <Screens  />
        </Block>
      
      </GalioProvider>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
