import { Dimensions } from 'react-native';
import { Block } from 'galio-framework';
import { Text } from 'react-native';
import { Header } from '../components';
import { nowTheme } from '../constants';
// drawer
//import CustomDrawerContent from './Menu';
import Onboarding from '../screens/Onboarding';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

const { width } = Dimensions.get("window");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



function screens() {

  function AppStack(props) {
    return (
      <Drawer.Navigator
        style={{ flex: 1 }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        drawerStyle={{
          backgroundColor: nowTheme.COLORS.PRIMARY,
          width: width * 0.8,
        }}
        drawerContentOptions={{
          activeTintcolor: nowTheme.COLORS.WHITE,
          inactiveTintColor: nowTheme.COLORS.WHITE,
          activeBackgroundColor: 'transparent',
          itemStyle: {
            width: width * 0.75,
            backgroundColor: 'transparent',
            paddingVertical: 16,
            paddingHorizonal: 12,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          },
          labelStyle: {
            fontSize: 18,
            marginLeft: 12,
            fontWeight: 'normal',
          },
        }}
        initialRouteName="Home"
      >
        <Drawer.Screen
          name="Home"
          component={HomeStack}
          options={{
            headerShown: false,
          }}
        />
        
      </Drawer.Navigator>
    );
  }

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

    /*<Block center>
      <Text>screens</Text>
    </Block>*/
  )
}

export default screens