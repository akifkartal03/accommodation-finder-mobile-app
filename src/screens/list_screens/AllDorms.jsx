import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import MainPageHeader from "../../components/header/mainPageHeader.jsx";
import CardItem from "../../components/common/CardItem.jsx";
import Firebase from "../../database/firebase_config.js";
import { useStore } from "../../redux/store/Provider";
import Warn from "../../components/warning/Warning.jsx";
const AllDormsList = ({ navigation }) => {
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
          <MainPageHeader headTitle="Tüm Yurtlar" nav={navigation} size={23} />
          <FlatList
            data={user.dorms}
            renderItem={({ item }) => <CardItem dorm={item} nav={navigation} />}
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
  header: {
    height: 70,
    padding: 15,
    backgroundColor: "darkslateblue",
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
  },
});

export default AllDormsList;
