import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import InfoList from "./InfoList";
import Comments from "./Comments";
import { Link } from "@react-navigation/native";
import Btn from "./Btn";
import { Button } from "react-native-paper";

const DormInfo = (props) => {
  const backPressed = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.container3}>
        <Text style={styles.text}>Bilgiler</Text>
        <View style={styles.btn3}>
          <Button
            style={styles.btn2}
            icon={{
              uri: "https://cdn-icons-png.flaticon.com/128/159/159469.png",
            }}
            mode="contained"
            color="#c9153c"
            labelStyle={{
              fontSize: 14,
              marginTop: 6,
              fontWeight: "bold",
              marginLeft: 12,
            }}
            uppercase={false}
            onPress={() => console.log("Pressed")}
          >
            Hata Bildir
          </Button>
        </View>
      </View>
      <FlatList
        data={[
          { icon: "question-circle-o", key: "Yer varmı?" },
          { icon: "info", key: "Tipi" },
          { icon: "try", key: "Fiyat Bilgisi(Aylık)" },
          { icon: "cutlery", key: "Yemek Bilgisi" },
          { icon: "phone", key: "Telefon Numarası" },
          { icon: "map-marker", key: "Adresi" },
          { icon: "plus", key: "Diğer Bilgiler" },
        ]}
        renderItem={({ item, index }) => (
          <InfoList itm={item} dorm={props.dr} ind={index} />
        )}
      />
      <Btn dorm={props.dr} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    fontSize: 18,
    textAlign: "left",
    margin: 15,
    marginBottom: 5,
    fontWeight: "bold",
  },
  item: {
    padding: 10,
    paddingLeft: 20,
    fontSize: 18,
    height: 44,
  },
  container3: {
    flexDirection: "row",
  },
  btn2: {
    borderRadius: 20,
    height: 32,
  },
  btn3: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 10,
    marginTop: 5,
  },
});

export default DormInfo;
