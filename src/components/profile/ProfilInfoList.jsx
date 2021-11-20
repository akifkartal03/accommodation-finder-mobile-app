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
import { useStore } from "../../redux/store/Provider";
import { setUSer } from "../../redux/actions/LoginAction";

const ProfilInfoList = (props) => {
  const [{ user }, dispatch] = useStore();
  return (
    <View style={styles.container}>
      {props.index == 1 ? (
        <OtherInfo
          setComment={props.arr[0].func}
          icon="user-edit"
          id="Ad Soyad"
          holder={props.arr[0].value}
          left={2}
          type="default"
        />
      ) : props.index == 2 ? (
        <OtherInfo
          setComment={props.arr[1].func}
          icon="birthday-cake"
          id="Yaş"
          holder={String(props.arr[1].value)}
          left={60}
          type="numeric"
        />
      ) : props.index == 3 ? (
        <OtherInfo
          setComment={props.arr[2].func}
          icon="user-graduate"
          id="Bölüm"
          holder={props.arr[2].value}
          left={40}
          type="default"
        />
      ) : props.index == 4 ? (
        <OtherInfo
          setComment={props.arr[3].func}
          icon="road"
          id="Sınıf"
          holder={props.arr[3].value}
          left={50}
          type="default"
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
