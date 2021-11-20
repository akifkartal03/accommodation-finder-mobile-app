import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Picker,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import PickerCheckbox from "./PickerCheckbox";
import { CheckBox } from "react-native-elements";
import { useStore } from "../../redux/store/Provider";
import { setUSer } from "../../redux/actions/LoginAction";

const Combobox2 = (props) => {
  const [{ user }, dispatch] = useStore();

  function handleConfirm(pItems) {
    //console.log(pItems);
    props.data.func(pItems);
  }

  return (
    <View style={styles.container3}>
      <Icon
        name={"building"}
        size={25}
        color="#01367a"
        style={{ padding: 10, paddingRight: 5, marginLeft: 5 }}
      />
      <Text style={styles.item}>{"Kaldığınız" + "\n" + "  Yurtlar "}</Text>
      <Text style={styles.item2}>:</Text>
      <PickerCheckbox
        data={user.dorms}
        headerComponent={<Text style={{ fontSize: 25 }}>Yurtlar</Text>}
        selectedDorms={user.info.stayedDorms}
        OnConfirm={(pItems) => handleConfirm(pItems)}
        ConfirmButtonTitle="Tamam"
        DescriptionField="Name"
        KeyField="id"
        placeholder={
          user.info.stayedDorms.length > 0
            ? String(user.info.stayedDorms.length) + " Yurt"
            : "Seçiniz"
        }
        arrowColor="grey"
        arrowSize={20}
        containerStyle={{ width: 235, marginTop: 5 }}
        placeholderSelectedItems="$count Yurt"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    marginTop: 10,
  },
  container3: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    paddingTop: 20,
  },
  header: {
    height: 70,
    padding: 15,
    backgroundColor: "darkslateblue",
  },
  textInput: {
    marginTop: 5,
    marginLeft: 2,
    marginBottom: 3,
    marginRight: 20,
    fontSize: 17,
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "white",
    borderBottomColor: "#66737C",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 5,
    fontWeight: "bold",
  },
  item: {
    paddingTop: 1,
    padding: 10,
    paddingLeft: 5,
    paddingRight: 3,
    fontSize: 18,
    color: "#203979",
  },
  item2: {
    paddingTop: 15,
    padding: 10,
    paddingLeft: 0,
    fontSize: 18,
    color: "#203979",
    paddingRight: 12,
  },
  image: {
    width: 35,
    height: 35,
    borderWidth: 3,
    borderRadius: 75,
    marginTop: 6,
    marginLeft: 6,
    marginRight: 10,
  },
  pick: {
    marginTop: 3,
    borderWidth: 5,
    height: 50,
    width: 250,
    borderColor: "black",
    marginRight: 10,
  },
});

export default Combobox2;
