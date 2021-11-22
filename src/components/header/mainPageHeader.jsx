import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Icon from "react-native-vector-icons/FontAwesome";
import { DrawerActions } from "@react-navigation/native";

const MainPageHeader = (props) => {
  return (
    <View style={styles.header}>
      <View style={styles.parent2}>
        <View style={styles.icon}>
          <TouchableOpacity
            onPress={() => props.nav.dispatch(DrawerActions.openDrawer())}
          >
            <Icon name="bars" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <Text
          style={{ fontSize: props.size ? props.size : 20, ...styles.text }}
        >
          {props.headTitle}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "#01367a",
    marginTop: getStatusBarHeight() + 5,
  },
  text: {
    color: "#fff",
    padding: 10,
    marginTop: 5,
    justifyContent: "center",
  },
  text2: {
    justifyContent: "flex-end",
    fontSize: 20,
    marginTop: 8,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#01367a",
    marginTop: 10 + getStatusBarHeight(),
  },
  parent: {
    flex: 1,
    flexDirection: "row",
    height: 100,
    padding: 15,
    backgroundColor: "#01367a",
    marginTop: 10 + getStatusBarHeight(),
    marginBottom: 20,
  },
  parent2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  icon: {
    position: "absolute",
    top: 15,
    left: 15,
    bottom: 0,
    right: 10,
  },
});

export default MainPageHeader;
