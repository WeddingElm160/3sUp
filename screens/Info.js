import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Dimensions, ScrollView, Image } from "react-native";
import { Block, theme, Text } from "galio-framework";

const { width, height } = Dimensions.get("window");

function Info() {
  return (
    <Block flex center style={styles.home}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Block style={styles.imageContainer}>
          <Image
            source={require("../assets/imgs/Escudo.png")}
            style={styles.image}
          />
        </Block>
          <Text size={16} style={{ textAlign: "center" }}>
            Benemérita Universidad Autónoma de Puebla
          </Text>

        <Block style={styles.articles}>
          <Text size={16} style={[styles.title, { textAlign: "center" }]}>
            Desarrolladores:
          </Text>
          <Text size={16} style={{ textAlign: "center" }}>
            José Manuel Balderas Estrada
          </Text>
          <Text size={16} style={{ textAlign: "center" }}>
            Antonio Maximiliano López Aguilar
          </Text>

          

          <Text size={16} style={[styles.title, { textAlign: "center" }]}>
            Materia:
          </Text>
          <Text size={16} style={{ textAlign: "center" }}>
            Desarrollo de Aplicaciones Móviles
          </Text>

          <Text size={16} style={[styles.title, { textAlign: "center" }]}>
            Creado con:
          </Text>
          <Text size={16} style={{ textAlign: "center" }}>
            React Native <Ionicons name="logo-react" size={18} color={ 'black'} />
          </Text>
          
        </Block>

      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width,
    justifyContent: "center",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: "lato-bold",
  },
  title: {
    fontFamily: "lato-bold",
    marginTop: theme.SIZES.BASE,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE * 2,
  },
  image: {
    width: (width - theme.SIZES.BASE * 6) / 2,
    height: (width - theme.SIZES.BASE * 6) / 2,
    resizeMode: "contain",
  },
});

export default Info;
