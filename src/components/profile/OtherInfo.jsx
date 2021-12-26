import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const OtherInfo = (props) => {
  //const [comment, setComment] = useState("");
  return (
    <View style={styles.container3}>
      <Icon
        name={props.icon}
        size={25}
        color="#01367a"
        style={{ padding: 10, paddingRight: 5, marginLeft: 5 }}
      />
      <Text style={styles.item}>{props.id + " :"}</Text>
      <TextInput
        onChangeText={(text) => props.setComment(text)}
        style={{ marginLeft: props.left ? props.left : 2, ...styles.textInput }}
        value={props.holder}
        placeholderTextColor="#66737C"
        maxHeight={35}
        keyboardType={props.type ? props.type : "default"}
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
});

export default OtherInfo;
