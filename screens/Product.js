import React, { useState, useContext } from "react";
import { StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import { Text, Block, Button } from "galio-framework";
import { FontAwesome } from "@expo/vector-icons";
import { nowTheme } from '../constants';
import { UserContext } from '../context/UserContext';

function Product() {
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState("0.00");
    const { user } = useContext(UserContext);

    const incrementQuantity = () => {
        if (quantity < 99) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const handlePriceChange = (value) => {
        setPrice(value);
    };
    return (
        <Block contentContainerStyle={styles.container} flex>
            {/* Sección superior */}
            <Block style={styles.topSection}>
                <Image source={!user.carts[0].products[user.carts[0].products.length - 1].image ? require("../assets/imgs/productNotFound.png") : { uri: user.carts[0].products[user.carts[0].products.length - 1].image }} style={styles.image} resizeMode="cover" />
            </Block>

            {/* Sección central */}
            <Block style={styles.middleSection}>
                <Block style={styles.productInfo}>
                    <Text style={styles.sampleProductText}>Producto de Muestra</Text>
                    <Block style={styles.counter}>
                        <TouchableOpacity style={styles.counterButton} onPress={decrementQuantity}>
                            <Block style={styles.counterIcon}>
                                <FontAwesome name="minus" size={10} color={nowTheme.COLORS.BLACK} />
                            </Block>
                        </TouchableOpacity>
                        <Text style={styles.counterText}>{quantity}</Text>
                        <TouchableOpacity style={styles.counterButton} onPress={incrementQuantity}>
                            <Block style={styles.counterIcon}>
                                <FontAwesome name="plus" size={10} color={nowTheme.COLORS.BLACK} />
                            </Block>
                        </TouchableOpacity>
                    </Block>
                </Block>
                <ScrollView>
                    <Text style={styles.loremText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus metus ut velit dapibus, quis finibus
                        quam posuere. Sed luctus, justo sed commodo ultrices, risus massa tincidunt velit, vel scelerisque felis sem
                        eget odio. Ut pellentesque sollicitudin nunc vel congue.
                    </Text>
                </ScrollView>
            </Block>

            {/* Sección inferior */}
            <Block style={styles.bottomSection}>
                <Block style={styles.priceContainer} flex={1} left>
                    <Text style={styles.priceLabel}>Precio</Text>
                    <Block style={styles.priceInputContainer} left>
                        <FontAwesome name="dollar" size={16} color={nowTheme.COLORS.BLACK} style={styles.priceIcon} />
                        <TextInput
                            style={styles.priceInput}
                            value={price}
                            onChangeText={handlePriceChange}
                            keyboardType="numeric"
                        />
                    </Block>
                </Block>
                <Button style={styles.addButton}>
                    <Text style={styles.addButtonLabel}>Agregar al Carrito</Text>
                </Button>
            </Block>
        </Block>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: nowTheme.COLORS.WHITE,
    },
    topSection: {
        width: "100%",
        aspectRatio: 1.5, // Ajusta el tamaño de acuerdo a tus necesidades
        backgroundColor:"#F2F3F8",
        borderBottomEndRadius: 21,
        borderBottomStartRadius: 21,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    middleSection: {
        padding: 20,
    },
    productInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    sampleProductText: {
        fontWeight: "bold",
    },
    counter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        justifyContent: "space-between",
        backgroundColor: "rgba(85, 188, 174, 0.5)",
        borderRadius: 7,
        width: 74,
        height: 23,
    },
    counterButton: {
        padding: 5,
    },
    counterIcon: {
        backgroundColor: nowTheme.COLORS.WHITE,
        borderRadius: 4,
        width: 16,
        height: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    counterText: {
        justifyContent:"center",
        alignItems:"center",
        color: nowTheme.COLORS.BLACK,
        fontFamily: "inter-medium",
    },
    loremText: {
        lineHeight: 24,
    },
    bottomSection: {
        position: "absolute",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        bottom: 40,
        paddingHorizontal: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: "#ECECEC",
    },
    priceContainer: {
    },
    priceLabel: {
        marginStart: 25,
    },
    priceInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
    },
    priceIcon: {
        marginRight: 8,
    },
    priceInput: {
        fontFamily: "inter-medium",
        width: 100,
        height: 30,
        borderWidth: 1,
        borderColor: "#ECECEC",
        borderRadius: 4,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    priceValue: {
        fontWeight: "bold",
    },
    addButton: {
        backgroundColor: nowTheme.COLORS.PRIMARY,
        paddingVertical: 10,
        paddingHorizontal: 20,
        height: 54,
        width: 153,
        borderRadius: 11,
    },
    addButtonLabel: {
        color: nowTheme.COLORS.WHITE,
        fontWeight: "bold",
    },
});

export default Product;
