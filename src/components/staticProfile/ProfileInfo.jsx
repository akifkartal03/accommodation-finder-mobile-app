import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import InfoDetails from "./InfoDetails";

const ProfileInfo = (props) => {
  const backPressed = () => {};

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { icon: "user-edit", key: "Ad Soyad" },
          { icon: "birthday-cake", key: "Yaş" },
          { icon: "user-graduate", key: "Bölüm" },
          { icon: "road", key: "Sınıf" },
          { icon: "user-check", key: "Cinsiyet" },
          { icon: "building", key: "Kaldığı Yurtlar" },
        ]}
        renderItem={({ item, index }) => (
          <InfoDetails itm={item} dr={props.dr} ind={index} />
        )}
      />
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

export default ProfileInfo;
