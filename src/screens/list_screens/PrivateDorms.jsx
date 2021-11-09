import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Header from "../../components/common/Header.jsx";
import CardItem from "../../components/common/CardItem.jsx";
import Firebase from "../../database/firebase_config.js";
import { useStore } from "../../redux/store/Provider";

const PrivateDormsList = ({ navigation }) => {
  const [{ user }, dispatch] = useStore("");
  const exitPressed = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "StartScreen" }],
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <View style={styles.container}>
      <Header title="Özel Yurtlar" exit={exitPressed} />
      <FlatList
        data={user.dorms}
        renderItem={({ item }) => <CardItem dorm={item} nav={navigation} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 70,
    padding: 15,
    backgroundColor: "darkslateblue",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
  },
});

export default PrivateDormsList;
