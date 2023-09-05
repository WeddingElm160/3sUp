import React, { useContext } from "react";
import { StyleSheet, Dimensions, ScrollView, Image } from "react-native";
import { Block, theme, Text, Button } from "galio-framework";
const { width } = Dimensions.get("window");
import { nowTheme } from '../constants';
import { UserContext } from "../context/UserContext";
import { addCart } from "../constants/api";

function Success(props) {
  const { user } = useContext(UserContext)
  // console.log(user.carts[0].products)
  console.log(user)
  return (
    <ScrollView contentContainerStyle={styles.containerScroll}>
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
              {user.carts[0].receipt.budget}
            </Text>
          </Block>
          <Block style={styles.row}>
            <Text style={styles.label}>Total Compra</Text>
            <Text size={20} color={"#B5B74F"} style={styles.amount}>
              {user.carts[0].receipt.subtotal}
            </Text>
          </Block>
          <Block style={styles.row}>
            <Text style={styles.label}>Tu Cambio</Text>
            <Text size={20} color={nowTheme.COLORS.PRIMARY} style={styles.amount}>
              {(user.carts[0].receipt.change).toFixed(2)}
            </Text>
          </Block>
        </Block>
      </Block>
      <Block>
        <Block>
          <Text bold style={styles.title}>
            Lista de compras
          </Text>
          <Block style={styles.rowCell}>
            <Text style={styles.cellHeader}>
              Cantidad
            </Text>
            <Text style={styles.cellHeader}>
              Articulo
            </Text>
            <Text style={styles.cellHeader}>
              Precio
            </Text>
            <Text style={styles.cellHeader}>
              Total
            </Text>
          </Block>
        </Block>
        <Block>
          <Block>
            {user.carts[0].products.map((producto, index) => (
              <Block style={styles.rowCell} key={index}>
                <Text style={styles.cellHeader}>{producto.quantity}</Text>
                <Text style={styles.cellHeader}>{producto.name}</Text>
                <Text style={styles.cellHeader}>{producto.price}</Text>
                <Text style={styles.cellHeader}>{(producto.price * producto.quantity).toFixed(2)}</Text>
              </Block>
            ))}
          </Block>
        </Block>
      </Block>
      <Block>
        <Block style={styles.buttonContainer} space="evenly">
          <Button style={styles.button} activeOpacity={0.7}
           onPress={ () => addCart(user.carts[0], user.email, props.navigation) }
          >
            <Text style={styles.buttonText}>Guardar</Text>
          </Button>
          <Button style={[styles.button]} activeOpacity={0.7}
            onPress={ () => props.navigation.navigate('Supermarket')}
          >
            <Text style={styles.buttonText}>No Guardar</Text>
          </Button>
        </Block>
      </Block>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFA",
    justifyContent: "space-around",
    alignContent: "stretch",
    paddingHorizontal: "5%",
  },
  image: {
    width: 158,
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
  cell: {
    flex: 1,
  },
  containerScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  cellHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rowCell: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7,
  },
});

export default Success;
