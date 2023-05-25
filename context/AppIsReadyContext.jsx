import { createContext, useState, useCallback, useEffect } from "react";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet } from 'react-native';
import { UserContextProvider } from "./UserContext";

SplashScreen.preventAutoHideAsync();

export const AppIsReadyContext = createContext();

export function AppIsReadyContextProvider(props) {
  const [appIsReady, setAppIsReady] = useState(false);
  const [videoIsReady, setVideoIsReady] = useState(false);
  const [userIsReady, setUserIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          'inter-bold': require('../assets/font/Inter-Bold.ttf'),
          'inter-medium': require('../assets/font/Inter-Medium.ttf'),
          'lato-bold': require('../assets/font/Lato-Bold.ttf'),
          'lato-semibold': require('../assets/font/Lato-SemiBold.ttf'),
          'Novera-Classic-ExtraBold-Italic': require('../assets/font/novera-classic-extrabold-italic.otf'),
          'DMSans-Regular': require('../assets/font/DMSans-Regular.ttf'),
          'DMSans-MediumItalic': require('../assets/font/DMSans-MediumItalic.ttf'),
          'DMSans-Medium': require('../assets/font/DMSans-Medium.ttf'),
          'DMSans-Italic': require('../assets/font/DMSans-Italic.ttf'),
          'DMSans-BoldItalic': require('../assets/font/DMSans-BoldItalic.ttf'),
          'DMSans-Bold': require('../assets/font/DMSans-Bold.ttf')
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

  const videoReady = () => {
    setVideoIsReady(true);
  }

  const onLayoutRootView = useCallback(async () => {
    //console.log(appIsReady, videoIsReady);
    if (appIsReady && videoIsReady ) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, videoIsReady]);

  if (!appIsReady) {
    return null;
  }
  if (videoIsReady) {
    onLayoutRootView();
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <UserContextProvider userReady={()=>setUserIsReady(true)}>
          <AppIsReadyContext.Provider value={{ videoReady }}>
            {props.children}
          </AppIsReadyContext.Provider>
        </UserContextProvider>
      </SafeAreaProvider>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});