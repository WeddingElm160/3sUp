import { Block, Text, theme } from 'galio-framework';
import { Image, ScrollView, StyleSheet } from 'react-native';

import Images from '../constants/Images';
import React from 'react';
import { DrawerItem as DrawerCustomItem } from '../components';

function CustomDrawerContent({ drawerPosition, navigation, profile, focused, state, ...rest }) {
  const screens = ['Inicio', 'Carrito', 'Guardado', 'Historial'];
  return (
    <Block style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <Block style={styles.header}>
        <Image style={styles.logo} source={Images.LogoLarge} />
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
            <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
              <Block
                style={{
                  borderColor: 'black',
                  width: '93%',
                  borderWidth: StyleSheet.hairlineWidth,
                  marginHorizontal: 10,
                }}
              />
            </Block>
          <DrawerCustomItem title="Acerca de" navigation={navigation} />
          <DrawerCustomItem title="Cerrar Sesion" navigation={navigation} />
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center',
  },
  headerIcon: {
    marginTop: -20,
  },
  logo: {
    height: 30,
    width: 'auto',
    resizeMode: 'contain',
  },
});

export default CustomDrawerContent;
