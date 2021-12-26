import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import MainPageHeader from "../../components/header/mainPageHeader.jsx";
import CardItem from "../../components/common/CardItem.jsx";
import { useStore } from "../../redux/store/Provider";
import Firebase from "../../database/firebase_config.js";
import Warn from "../../components/warning/Warning.jsx";
const PublicDormsList = ({ navigation }) => {
  const [{ user }, dispatch] = useStore("");
  const exitPressed = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "LoginScreen" }],
        });
      })
      .catch((error) => alert("Bir hata oluştu. Lütfen tekrar deneyin."));
  };
  return (
    <View style={styles.container}>
      {user.dorms.length ? (
        <View style={styles.container}>
          <MainPageHeader
            headTitle="Devlet Yurtları"
            nav={navigation}
            size={23}
          />
          <FlatList
            data={user.dorms}
            renderItem={({ item }) =>
              item.Type === 1 ? (
                <CardItem dorm={item} nav={navigation} />
              ) : (
                <></>
              )
            }
          />
        </View>
      ) : (
        <Warn handle={exitPressed} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
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

export default PublicDormsList;
