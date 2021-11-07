import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Header from "../../components/common/Header.jsx";
import CardItem from "../../components/common/CardItem.jsx";
import Firebase from "../../database/firebase_config.js";
import { getAll } from "../../database/services/dormitory_service.js";
import { useStore } from "../../redux/store/Provider";
import { setUSer } from "../../redux/actions/LoginAction";
import PrivateDormsList from "../list_screens/PrivateDorms.jsx";
import * as Progress from "react-native-progress";

const GetPrivateDorms = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [{ user }, dispatch] = useStore("");
  const onDataChange = (elements) => {
    let dorms = [];
    elements.docs.forEach((item) => {
      dorms.push(item.data());
    });
    setItems(dorms);
    user.dorms = dorms;
    dispatch(setUSer(user));
  };
  useEffect(() => {
    const unsubscribe = getAll().onSnapshot(onDataChange);
    return () => unsubscribe();
  }, []);

  return user.dorms ? (
    <PrivateDormsList navigation={navigation} />
  ) : (
    <Progress.CircleSnail color={["red", "green", "blue"]} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinnerTextStyle: {
    color: "black",
  },
});

export default GetPrivateDorms;
