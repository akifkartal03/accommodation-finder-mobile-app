import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Header from "../../components/common/Header.jsx";
import ImageSlider from "react-native-image-slider";
import DormInfo from "../../components/dormInfo/DormInfo.jsx";
import Slider from "react-native-hook-image-slider";
import { SliderBox } from "react-native-image-slider-box";

const DormDetails = ({ route, navigation }) => {
  const dorm = route.params;
  const backPressed = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        headTitle="Detaylar"
        pressHandle={backPressed}
        iconName="arrow-circle-left"
        buttonTitle="Geri dön"
        nav={navigation}
      />
      <Text style={styles.text}>{dorm.Name}</Text>
      <View style={styles.container2}>
        <SliderBox
          images={dorm.Images}
          dotColor="#f6911b"
          inactiveDotColor="#FFFFFF"
          dotStyle={{
            width: 11,
            height: 11,
            borderRadius: 5,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
            backgroundColor: "white",
          }}
        />
      </View>
      <DormInfo dr={dorm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default DormDetails;
