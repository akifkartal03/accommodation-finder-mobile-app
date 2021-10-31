import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>{props.title}</Text>
        </View>
        <View style={{ flex: 1, paddingTop: 10, marginRight: -40 }}>
          <Button
            style={styles.text2}
            icon={<Icon name="sign-out" size={20} color="white" />}
            title="Çıkış Yap"
            type="clear"
            titleStyle={{ color: "white", marginLeft: 5 }}
            onPress={props.exit}
          />
        </View>
      </View>
    </View>
    /*<View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
      <Button
        style={styles.text2}
        icon={<Icon name="sign-out" size={20} color="white" />}
        title="Çıkış Yap"
        type="clear"
        titleStyle={{ color: "white", marginLeft: 5 }}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "StartScreen" }],
          })
        }
      />
    </View>*/
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
    justifyContent: "flex-start",
    padding: 12,
  },
  text2: {
    justifyContent: "flex-end",
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
});

export default Header;
