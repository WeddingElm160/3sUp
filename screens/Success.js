import React from "react";
import { StyleSheet, Dimensions, ScrollView, Image } from "react-native";
import { Block, theme, Text, Button } from "galio-framework";
const { width } = Dimensions.get("window");
import { nowTheme } from '../constants';

function Home() {
  
  return (
    <Block style={styles.container} flex center>
        <Image
          resizeMode={"center"}
          source={require("../assets/imgs/success-logo.png")}
          style={styles.image}
        />
        <Text size={24} bold style={styles.title}>
          Resultado de tu compra
        </Text>
        <Block style={styles.column}>
          <Block style={styles.row}>
            <Text style={styles.label}>Presupuesto Inicial</Text>
            <Text size={20} color={"#B7814F"} style={styles.amount}>
              $124.00
            </Text>
          </Block>
          <Block style={styles.row}>
            <Text style={styles.label}>Total Compra</Text>
            <Text size={20} color={"#B5B74F"} style={styles.amount}>
              $124.00
            </Text>
          </Block>
          <Block style={styles.row}>
            <Text style={styles.label}>Tu Cambio</Text>
            <Text size={20} color={nowTheme.COLORS.PRIMARY} style={styles.amount}>
              $0.00
            </Text>
          </Block>
        </Block>
        <Block style={styles.buttonContainer} space="evenly">
          <Button style={styles.button} activeOpacity={0.7}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </Button>
          <Button style={[styles.button, styles.modifyButton]} activeOpacity={0.5}>
            <Text style={styles.buttonText}>Modificar</Text>
          </Button>
        </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFA",
    justifyContent: "space-around",
    alignContent:"stretch",
    paddingHorizontal: "5%",
  },
  image: {
    width:158,
    height: 158,
    marginBottom: theme.SIZES.BASE,
  },
  title: {
    fontSize: 24,
    color: nowTheme.COLORS.PRIMARY,
    marginBottom: theme.SIZES.BASE,
    fontFamily: 'lato-bold',
    textAlign: "center",
  },
  column: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.SIZES.BASE,
  },
  label: {
    fontSize: 16,
    marginRight: theme.SIZES.BASE,
    fontFamily: 'lato-semibold',
  },
  amount: {
    fontSize: 20,
    textAlign: "right",
    flex: 1,
    fontFamily: 'lato-semibold',
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: theme.SIZES.BASE * 2,
    width: "100%",
  },
  button: {
    backgroundColor: nowTheme.COLORS.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 11,
    height: 54,
    width: 153,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: nowTheme.COLORS.WHITE,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: 'lato-semibold',
  },
  modifyButton: {
    backgroundColor: nowTheme.COLORS.PRIMARY,
    opacity: 0.7,
  },
  modifyButtonText: {
    color: nowTheme.COLORS.WHITE,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: 'lato-semibold',
  },
});

export default Home;
