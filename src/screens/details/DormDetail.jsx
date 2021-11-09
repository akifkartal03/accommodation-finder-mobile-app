import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

const DormDetails = ({ route, navigation }) => {
  const dorm = route.params;

  return (
    <View style={styles.container}>
      <Text>{dorm.id}</Text>
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

export default DormDetails;
