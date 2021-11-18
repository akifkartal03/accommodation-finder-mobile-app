import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Link } from "@react-navigation/native";

const Btn = (props) => {
  const backPressed = () => {};

  return (
    <View style={styles.container}>
      <Icon name="comments" size={25} color="#f6911b" style={{ padding: 10 }} />
      <Link
        style={styles.text}
        to={{ screen: "Comments", params: { id: props.dorm } }}
      >
        Yorumları Gör
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  text: {
    fontSize: 18,
    color: "#205296",
    fontWeight: "bold",
  },
  item: {
    padding: 10,
    paddingLeft: 20,
    fontSize: 18,
    height: 44,
  },
});

export default Btn;
