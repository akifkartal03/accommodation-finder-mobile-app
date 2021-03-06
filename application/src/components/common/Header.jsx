import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { DrawerActions } from "@react-navigation/native";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <View style={styles.icon}>
        <TouchableOpacity
          onPress={() => props.nav.dispatch(DrawerActions.openDrawer())}
        >
          <Icon name="bars" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.parent2}>
        <Text style={styles.text}>{props.headTitle}</Text>
        <View style={styles.text4}>
          <Button
            style={styles.text2}
            icon={
              <Icon
                style={{ marginTop: 11 }}
                name={"bath"}
                size={22}
                color="white"
              />
            }
            title={"Filter"}
            type="clear"
            titleStyle={{
              color: "white",
              marginLeft: 7,
              fontSize: 18,
              marginTop: 9,
            }}
            onPress={props.pressHandle}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "#01367a",
    marginTop: getStatusBarHeight(),
  },
  text: {
    color: "#fff",
    fontSize: 23,
    padding: 10,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  text3: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text4: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  text2: {
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
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
    top: 15,
    left: 15,
    bottom: 0,
    right: 10,
  },
});

export default Header;
