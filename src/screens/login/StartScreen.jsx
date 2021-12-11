import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import Background from "../../components/login/Background";
import Logo from "../../components/login/Logo";
import Header from "../../components/login/Header";
import Button from "../../components/login/Button";
import Paragraph from "../../components/login/Paragraph";
import Firebase from "../../database/firebase_config";
export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>GTU Accommodation Finder</Header>
      <Paragraph>Kalabileceğin yerleri keşfet!</Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Giriş Yap
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Kayıt Ol
      </Button>
    </Background>
  );
}
const styles = StyleSheet.create({
  text: {
    marginBottom: 12,
  },
});
