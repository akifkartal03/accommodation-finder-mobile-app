import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const Btn = (props) => {
  const backPressed = () => {};

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          props.nav.navigate("Comments", { id: props.dorm });
        }}
        style={styles.container}
      >
        <Icon
          name="comments"
          size={25}
          color="#f6911b"
          style={{ padding: 10 }}
        />
        <Text style={styles.text}>Yorumları Gör</Text>
      </TouchableOpacity>
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
    color: "blue",
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
