import React from "react";
import { TouchableOpacity, Image, StyleSheet, View } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default function BackButton({ goBack }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack}>
        <Image
          style={styles.image}
          source={require("../../../assets/images/arrow_back.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: getStatusBarHeight() + 5,
    left: 5,
    bottom: 0,
    right: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
});
