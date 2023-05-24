import React from "react";
import { Image, StyleSheet, Dimensions} from "react-native";
import { Block, Text, theme } from "galio-framework";
import nowTheme from "../constants/Theme";
const { width } = Dimensions.get("window");


class Pro extends React.Component {
  render() {
    return (
      <Block flex center space="evenly" style={styles.container}>
        <Image
          source={require("../assets/imgs/Logo-Leters.png")}
          style={styles.image}
        />
        <Block center style={styles.title} size={width}>
          <Block>
            <Text size={52} style={styles.font} adjustsFontSizeToFit={true} numberOfLines={1}>
              Proximamente
            </Text>
          </Block>
          <Block row >
            <Text size={34} style={styles.font} adjustsFontSizeToFit={true} numberOfLines={1}>
              Nuevas Funciones
            </Text>
            <Block style={styles.pro}>
              <Text size={14} style={styles.font} adjustsFontSizeToFit={true} numberOfLines={1}>
                ESPERALO
              </Text>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    padding:"10%",
    width: "100%",
  },
  image:{
    height:129,
    width:129,
  },
  title: {
    margin: "10%"
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
    fontFamily: 'DMSans-Bold',
    color: nowTheme.COLORS.WHITE,
  }
});

export default Pro;
