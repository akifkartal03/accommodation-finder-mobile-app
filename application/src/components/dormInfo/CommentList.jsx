import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CommentList = (props) => {
  const backPressed = () => {};
  return (
    <View style={styles.row}>
      <Text style={styles.text}> {LOREM_IPSUM}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    flexShrink: 1,
  },
  item: {
    padding: 10,
    paddingLeft: 20,
    fontSize: 18,
    height: 44,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    padding: 10,
    borderColor: "#ccc",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

export default CommentList;
