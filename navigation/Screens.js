import { Dimensions } from 'react-native';
// header for screens
import { Header } from '../components';
import { nowTheme } from '../constants';
// drawer
import CustomDrawerContent from './Menu';
// screens
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import Saved from '../screens/Saved';
import History from '../screens/History';
import Info from '../screens/Info';

import Onboarding from '../screens/Onboarding';
import BarcodeScanner from '../screens/BarcodeScanner';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

const { width } = Dimensions.get("window");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

//Home
function HomeStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="HomeI"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Inicio" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
    </Stack.Navigator>
  );
}
//Cart
function CartStack() {
  return (
    <Stack.Navigator
      initialRouteName="Cart"
      screenOptions={{
        presentation: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="CartI"
        component={BarcodeScanner}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="" back white transparent navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
//Saved
function SavedStack() {
  return (
    <Stack.Navigator
    initialRouteName="Saved"
      screenOptions={{
        presentation: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="SavedI"
        component={Saved}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Guardado" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
    </Stack.Navigator>
  );
}
//History
function HistoryStack() {
  return (
    <Stack.Navigator
    initialRouteName="History"
      screenOptions={{
        presentation: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="HistoryI"
        component={History}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Historial" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
    </Stack.Navigator>
  );
}
//Info
function InfoStack() {
  return (
    <Stack.Navigator
    initialRouteName="Info"
      screenOptions={{
        presentation: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="InfoI"
        component={Info}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Components" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Drawer.Navigator initialRouteName="Inicio" useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle:{
          backgroundColor: nowTheme.COLORS.GRAY,
          width: width * 0.8,
        },
        drawerActiveTintColor: nowTheme.COLORS.YOUTUBE,
        drawerInactiveTintColor: nowTheme.COLORS.WHITE,
        drawerActiveBackgroundColor: 'transparent',
        drawerItemStyle: {
          width: width * 0.75,
          backgroundColor: 'transparent',
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        drawerLabelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: 'normal',
        },
      }}
    >
      <Drawer.Screen
        name="Inicio"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Carrito"
        component={CartStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Guardado"
        component={SavedStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Historial"
        component={HistoryStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Acerca de"
        component={InfoStack}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: 'card',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  )
}