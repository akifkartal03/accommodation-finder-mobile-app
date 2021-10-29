import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Header from "../../components/common/Header.jsx";
import CardItem from "../../components/common/CardItem.jsx";

const PrivateDormsList = (props) => {
  const [items, setItems] = useState([
    { id: 1, text: "Hüdayi Vakfı" },
    { id: 2, text: "Test1" },
    { id: 3, text: "Test2" },
  ]);
  return (
    <View style={styles.container}>
      <Header title="Özel Yurtlar" />
      <FlatList
        data={items}
        renderItem={({ item }) => <CardItem title={item.text} />}
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
