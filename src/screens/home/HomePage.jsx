import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import MainPageHeader from "../../components/header/mainPageHeader.jsx";

const HomePage = ({ route, navigation }) => {
  const dorm = route.params;
  const backPressed = () => {
    navigation.goBack();
  };
  //console.log(user.nav.canGoBack());
  return (
    <View style={styles.container}>
      <MainPageHeader headTitle="Hoşgeldiniz" nav={navigation} size={23} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  container2: {
    marginTop: 10,
  },
  header: {
    height: 70,
    padding: 15,
    backgroundColor: "darkslateblue",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 5,
    fontWeight: "bold",
  },
});

export default HomePage;
