import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Picker } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Icon from "react-native-vector-icons/FontAwesome";
import { DrawerActions } from "@react-navigation/native";
import Combobox1 from "../profile/Combobox1";
import PickerCheckbox from "../profile/PickerCheckbox";

const CommentsHeader = (props) => {
  const [name, setName] = useState("akif");
  const [sItems, setSItems] = useState([]);
  const [len, setLen] = useState(95);
  const [items, setItems] = useState([
    { Name: "Olumlu Yorumlar", id: "1" },
    { Name: "Olumsuz Yorumlar", id: "2" },
    { Name: "Bu yurtta kalmış öğrenci", id: "3" },
  ]);
  function handleConfirm(pItems) {
    //console.log(pItems);
    setLen(pItems.length ? 115 : 95);
    props.func(pItems);
    //setSItems(pItems);
  }
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
        <Text
          style={{ fontSize: props.size ? props.size : 20, ...styles.text }}
        >
          {props.headTitle}
        </Text>
        <View style={styles.text4}>
          <PickerCheckbox
            data={items}
            headerComponent={<Text style={{ fontSize: 25 }}>Seçenekler</Text>}
            OnConfirm={(pItems) => handleConfirm(pItems)}
            ConfirmButtonTitle="Tamam"
            DescriptionField="Name"
            KeyField="id"
            selectedDorms={[]}
            placeholder={"Filtrele"}
            placeholderTextColor="white"
            selectedTextColor="white"
            arrowColor="white"
            arrowSize={20}
            containerStyle={{
              width: len,
              marginTop: -5,
              color: "white",
              marginRight: -8,
              marginLeft: 0,
            }}
            placeholderSelectedItems="Filtrelendi"
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
    padding: 10,
    marginTop: 5,
    paddingRight: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
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
  pick: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 3,
    borderWidth: 5,
    borderColor: "white",
    marginRight: 10,
    marginLeft: 10,
  },
  text4: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
    marginRight: 20,
  },
});

export default CommentsHeader;
