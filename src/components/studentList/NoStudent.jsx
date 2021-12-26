import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MainPageHeader from "../../components/header/mainPageHeader.jsx";
import Icon from "react-native-vector-icons/FontAwesome";
import Add from "./Add.jsx";
const NoStudent = (props) => {
  return (
    <View style={styles.container}>
      <MainPageHeader
        headTitle="Ev Arkadaşı Arayanlar"
        nav={props.nav}
        size={20}
      />
      <View style={styles.container2}>
        <Icon name="frown-o" size={75} color="#01367a" style={styles.icon} />
        <Text style={styles.text}>Burada kimse görünmüyor</Text>
        <Add msg={"Beni Ekle"} set={props.set} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  header: {
    height: 70,
    padding: 15,
    backgroundColor: "darkslateblue",
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 20,
    color: "black",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  icon: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NoStudent;
