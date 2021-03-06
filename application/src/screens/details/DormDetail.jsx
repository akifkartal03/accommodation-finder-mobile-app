import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MainPageHeader from "../../components/header/mainPageHeader.jsx";
import DormInfo from "../../components/dormInfo/DormInfo.jsx";
import { SliderBox } from "react-native-image-slider-box";

const DormDetails = ({ route, navigation }) => {
  const dorm = route.params;
  const backPressed = () => {
    navigation.goBack();
  };
  //console.log(user.nav.canGoBack());
  return (
    <View style={styles.container}>
      <MainPageHeader headTitle="Detaylar" nav={navigation} size={23} />
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
      <DormInfo dr={dorm} nav={navigation} />
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

export default DormDetails;
