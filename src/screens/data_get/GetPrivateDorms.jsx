import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { getAll } from "../../database/services/dormitory_service.js";
import { useStore } from "../../redux/store/Provider";
import { setUSer } from "../../redux/actions/LoginAction";
import PrivateDormsList from "../list_screens/PrivateDorms.jsx";
import * as Progress from "react-native-progress";

const GetPrivateDorms = ({ navigation }) => {
  const [{ user }, dispatch] = useStore("");
  const onDataChange = (elements) => {
    let dorms = [];
    elements.docs.forEach((item) => {
      const id = item.id;
      const data = item.data();
      dorms.push({ id, ...data });
    });
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
