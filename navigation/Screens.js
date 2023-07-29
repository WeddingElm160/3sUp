import { Dimensions, Platform } from 'react-native';
// header for screens
import { Header } from '../components';
import { nowTheme } from '../constants';
// drawer
import CustomDrawerContent from './Menu';
// screens
import Home from '../screens/Home';
import Pro from '../screens/Pro';
import Info from '../screens/Info';
import Cart from '../screens/Cart';
import Success from '../screens/Success';
import Product from '../screens/Product';
import AddProduct from '../screens/AddProduct';
import BarcodeScanner from '../screens/BarcodeScanner';

import Onboarding from '../screens/Onboarding';
import Supermarket from '../screens/Supermarket';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { RightButtonContextProvider } from '../context/RightButtonContext';

const { height, width } = Dimensions.get(Platform.constants.Brand === "Windows" ? "window" : "screen");

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
      initialRouteName="Supermarket"
      screenOptions={{
        presentation: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Supermarket"
        component={Supermarket}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Supermercados" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Carrito" navigation={navigation} scene={scene} back/>
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="" white transparent navigation={navigation} scene={scene}/>
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent title=""  navigation={navigation} scene={scene} back/>
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent title="" white  navigation={navigation} scene={scene} back/>
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="BarcodeScanner"
        component={BarcodeScanner}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent title="" navigation={navigation} scene={scene} back/>
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
      initialRouteName="Pro"
      screenOptions={{
        presentation: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="" white transparent navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
//History
function HistoryStack() {
  return (
    <Stack.Navigator
      initialRouteName="Pro"
      screenOptions={{
        presentation: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="" white transparent navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
//Info
function InfoStack() {
  return (
    <Stack.Navigator
      initialRouteName="InfoI"
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
    <RightButtonContextProvider>
      <Drawer.Navigator initialRouteName="Inicio" useLegacyImplementation
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
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
    </RightButtonContextProvider>

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