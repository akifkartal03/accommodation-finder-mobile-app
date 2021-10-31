import React from "react";
import { TouchableOpacity, Image, StyleSheet, View } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../assets/images/arrow_back.png")}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    left: -20,
  },
  image: {
    width: 30,
    height: 30,
  },
});
