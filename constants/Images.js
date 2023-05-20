// local imgs 
import React, { Component } from "react";
import { Image, Svg } from "react-native";

class Logo extends Component {
  render() {
    return (
      <Image
        source={require("../assets/imgs/logo-app.svg")}
        width={100}
        height={100}
      />
    );
  }
}

export default {
  Logo
};
