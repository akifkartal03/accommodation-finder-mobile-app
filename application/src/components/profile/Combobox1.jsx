import React, { useState } from "react";
import { StyleSheet, Text, View, Picker } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const Combobox1 = (props) => {
  const [items, setItems] = useState([
    { id: 0, label: "Kadın", val: 0 },
    { id: 1, label: "Erkek", val: 1 },
  ]);
  return (
    <View style={styles.container3}>
      <Icon
        name={"user-check"}
        size={25}
        color="#01367a"
        style={{ padding: 10, paddingRight: 5, marginLeft: 5 }}
      />
      <Text style={styles.item}>Cinsiyet :</Text>
      <Picker
        style={styles.pick}
        selectedValue={props.data.value}
        onValueChange={(itemValue, itemIndex) => {
          if (!itemValue) {
            return;
          }
          props.data.func(itemValue);
        }}
      >
        <Picker.Item label="Seçiniz" value="Seçiniz" color="grey" />
        {items.sort().map((item) => (
          <Picker.Item key={item.id} label={item.label} value={item.label} />
        ))}
      </Picker>
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
    paddingTop: 15,
    padding: 10,
    paddingLeft: 5,
    fontSize: 18,
    color: "#203979",
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
    width: 240,
    borderColor: "black",
    marginRight: 10,
    marginLeft: 10,
  },
});

export default Combobox1;
