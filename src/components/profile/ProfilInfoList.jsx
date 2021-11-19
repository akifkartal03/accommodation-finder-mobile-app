import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import OtherInfo from "./OtherInfo";

const ProfilInfoList = (props) => {
  //const [comment, setComment] = useState("");
  return (
    <View style={styles.container}>
      {props.index == 1 ? (
        <OtherInfo
          setComment={props.setComment}
          icon="user-edit"
          id="Ad Soyad"
          holder="Ad Soyad"
        />
      ) : props.index == 2 ? (
        <OtherInfo
          setComment={props.setComment}
          icon="birthday-cake"
          id="Yaş"
          holder="0"
        />
      ) : props.index == 3 ? (
        <OtherInfo
          setComment={props.setComment}
          icon="user-graduate"
          id="Bölüm"
          holder="Bilinmiyor"
        />
      ) : props.index == 4 ? (
        <OtherInfo
          setComment={props.setComment}
          icon="road"
          id="Sınıf"
          holder="0"
        />
      ) : (
        <></>
      )}
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
    color: "#cd123a",
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

export default ProfilInfoList;
