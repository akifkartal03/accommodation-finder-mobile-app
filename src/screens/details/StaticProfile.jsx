import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import MainPageHeader from "../../components/header/mainPageHeader.jsx";
import ImageSlider from "react-native-image-slider";
import ProfileInfo from "../../components/staticProfile/ProfileInfo.jsx";
import Slider from "react-native-hook-image-slider";
import { SliderBox } from "react-native-image-slider-box";

const StaticProfile = ({ route, navigation }) => {
  const user = route.params;
  const backPressed = () => {
    navigation.goBack();
  };
  //console.log(user.nav.canGoBack());
  return (
    <View style={styles.container}>
      <MainPageHeader headTitle="Kullanıcı Bilgileri" nav={navigation} />
      <ProfileInfo dr={user} nav={navigation} />
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

export default StaticProfile;
