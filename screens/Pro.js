import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("window");

import nowTheme from "../constants/Theme";

class Pro extends React.Component {
  render() {
    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
          <ImageBackground
            /* source={require("../assets/imgs/FondoPro.png")} */
            style={{ height, width, zIndex: 1 }}
          />
        </Block>

        <Block flex space="between" style={styles.padded}>

          <Block middle row style={{ marginTop: -50, marginBottom: 30}}>
            <Image
              source={require("../assets/imgs/Logo-Leters.png")}
              style={{
                height: 200,
                width: 200,
              }}
            />
          </Block>

          <Block middle flex space="around" style={{ zIndex: 2 }}>
            <Block center style={styles.title}>
              <Block>
                <Text color="white" size={52} style={styles.font}>
                  Proximamente
                </Text>
              </Block>
              <Block row>
                <Text middle color="white" size={34} style={styles.font}>
                  Nuevas Funciones
                </Text>
                <Block middle style={styles.pro}>
                  <Text size={14} color="white" style={styles.font}>
                  ESPERALO
                </Text>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    top: 270,
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'absolute',
    bottom: theme.SIZES.BASE,
    zIndex: 2
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  title: {
    marginTop: "-5%"
  },
  subTitle: {
    marginTop: 20
  },
  pro: {
    backgroundColor: nowTheme.COLORS.BLACK,
    paddingHorizontal: 8,
    marginLeft: 3,
    borderRadius: 4,
    height: 22,
    marginTop: 0
  },
  font: {
    fontFamily: 'DMSans-Bold'
  }
});

export default Pro;
