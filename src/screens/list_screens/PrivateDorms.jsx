import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import MainPageHeader from "../../components/header/mainPageHeader.jsx";
import CardItem from "../../components/common/CardItem.jsx";
import { useStore } from "../../redux/store/Provider";
const PrivateDormsList = ({ navigation }) => {
  const [{ user }, dispatch] = useStore("");
  return (
    <View style={styles.container}>
      <MainPageHeader headTitle="Özel Yurtlar" nav={navigation} />
      <FlatList
        data={user.dorms}
        renderItem={({ item }) =>
          item.Type === 2 ? <CardItem dorm={item} nav={navigation} /> : <></>
        }
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
