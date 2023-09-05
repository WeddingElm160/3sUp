import React, { useState, useContext, useEffect } from "react";
import { ImageBackground, StyleSheet, Image, Dimensions, Platform, TouchableOpacity, ScrollView } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Images } from '../constants/';
import { userEmail, getEveryCarts, getUserById } from "../constants/api";
import { useFocusEffect } from '@react-navigation/native';
import { UserContext } from "../context/UserContext";
const { height, width } = Dimensions.get(
  Platform.constants.Brand === "Windows" ? "window" : "screen"
);
let myFonts = [Images.history5, Images.history4, Images.history3, Images.history2, Images.history];
function Record(props) {
  const { user } = useContext(UserContext)
  user.setEmail(userEmail);
  const [filteredInfo, setInfo] = useState(null);
  
  const loadData = () => {
    
    getEveryCarts(user.email)
      .then(data => {
        setInfo(data.carts.shoppingLists);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  // Utiliza useFocusEffect para recargar los datos cuando la pantalla obtiene el enfoque
  useFocusEffect(() => {
    loadData();
  });

  const lengthOfFilteredInfo = filteredInfo ? filteredInfo.length : 0;
  // console.log(user);
  // console.log(filteredInfo);
  // console.log(lengthOfFilteredInfo);
  // // console.log(filteredInfo.shoppingLists)

  return (
    <ImageBackground resizeMode="cover" source={myFonts[0]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Block >
          <Block center style={styles.container}>
            <Text size={15} style={styles.font} color={theme.COLORS.WHITE}>Scan | Spend | Save UP!</Text>
            <Image
              source={require("../assets/imgs/Logo-Leters.png")}
              style={styles.image}
            />
          </Block>
          <Block flex={1} center style={styles.title} size={width}>
            <Text size={52} style={styles.font} adjustsFontSizeToFit={true} numberOfLines={1} color={theme.COLORS.WHITE}>
              Historial de Gastos
            </Text>
          </Block>
          {lengthOfFilteredInfo > 0 ? (
            <Block>
              {filteredInfo.map((filteredInfo, index) => (
                <Block key={index}>
                  <TouchableOpacity
                    onPress={() => { getUserById(filteredInfo, props.navigation) }}//props.navigation.navigate("Ticket") }}
                    activeOpacity={0.5}
                    style={styles.elevation}
                  >
                    <Block row style={styles.defaultStyle}>
                      <Block row middle style={{ marginRight: 5 }}>
                        <Image source={Images.cart} style={{ ...styles.storeImage, backgroundColor: '#c0c0c0', }} />
                      </Block>
                      <Block row center numberOfLines={4}>
                        <Text style={styles.mainText}>
                          {filteredInfo.storeName + "\n" + filteredInfo.date + "\n" +
                            filteredInfo.hour + "\nTotal: " + filteredInfo.subtotal}
                        </Text>
                      </Block>
                    </Block>
                  </TouchableOpacity>
                  <Block
                    style={{
                      backgroundColor: "#c0c0c0",
                      height: 1,
                    }}
                  />
                </Block>
              ))}
            </Block>
          ) : (
            <Block center>
            <Text size={52} style={styles.font} adjustsFontSizeToFit={true} numberOfLines={1} color={theme.COLORS.WHITE}>
              Lo siento no encontre nada</Text>
            </Block>
          )}
        </Block>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: theme.COLORS.BLACK,
    padding: "10%",
    width: "100%",
  },
  lowerSection: {
    width: "100%",
    marginBottom: 64,
  },
  defaultStyle: {
    paddingVertical: 5,
    color: "black",
  },
  mainText: {
    fontFamily: "inter-medium",
    textTransform: "uppercase",
    fontWeight: "300",
    color: "#5f5f5f",
    fontWeight: 'bold',
    fontSize: 14
  },
  font: {
    fontFamily: 'DMSans-Bold'
  },
  title: {
    margin: "10%"
  },
  elevation: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  storeImage: {
    width: 48,
    height: 48,
    borderRadius: 5,
    marginRight: 10
  },
  image: {
    height: 129,
    width: 129,
  },
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: 'transparent', // Hace que el fondo de ImageBackground sea visible
  },
});

export default Record;
