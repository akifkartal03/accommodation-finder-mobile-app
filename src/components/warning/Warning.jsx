import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Button from "../login/Button";
import Logo from "../login/Logo";

const Warn = (props) => {
  return (
    <View style={styles.header}>
      <Logo />
      <Text style={styles.text}>Lütfen tekrar giriş yapınız!</Text>
      <Button style={styles.text2} mode="contained" onPress={props.handle}>
        Giriş Yap
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  text: {
    color: "black",
    fontSize: 23,
    padding: 20,
    paddingTop: 30,
    justifyContent: "center",
  },
  text2: {
    width: "50%",
  },
});

export default Warn;
