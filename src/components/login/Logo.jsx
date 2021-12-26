import React from "react";
import { Image, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export default function Logo() {
  return (
    <Image
      source={{ uri: "https://i.ibb.co/xSxRNFd/gtu.png" }}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 180,
    marginBottom: 5,
    marginTop: getStatusBarHeight() + 5,
  },
});
