import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Block, theme, Text } from "galio-framework";
const { width } = Dimensions.get("window");

function Home() {
    return (
      <Block flex center style={styles.home}>
        <Block style={styles.articles}>
          <Text>HOME</Text>
        </Block>
      </Block>
    );
}

const styles = StyleSheet.create({
  home: {
    width: width
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'lato-bold'
  }
});

export default Home;
