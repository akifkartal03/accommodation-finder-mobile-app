import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { getDorms } from "../../database/services/dormitory_service.js";
import { useStore } from "../../redux/store/Provider";
import { setUSer } from "../../redux/actions/LoginAction";
import AllDormsList from "../list_screens/AllDorms.jsx";
import Spinner from "react-native-loading-spinner-overlay";

const GetPrivateDorms = ({ navigation }) => {
  const [{ user }, dispatch] = useStore("");
  const [load, setLoad] = useState(false);
  /*const onDataChange = (elements) => {
    let dorms = [];
    const start = new Date();
    const t = start.getTime();
    var t0 = performance.now();
    elements.docs.forEach((item) => {
      const id = item.id;
      const data = item.data();
      dorms.push({ id, ...data });
    });
    var t1 = performance.now();
    console.log("Database getting dorms took " + (t1 - t0) + " milliseconds.");
    const timeTaken = new Date().getTime() - t;
    //console.log("time: " + timeTaken);
    user.nav = navigation;
    user.dorms = dorms;
    dispatch(setUSer(user));
  };
  useEffect(() => {
    const unsubscribe = getAll().onSnapshot(onDataChange);
    return () => unsubscribe();
  }, []);*/
  useEffect(() => {
    getDorms()
      .then((docRef) => {
        user.nav = navigation;
        user.dorms = docRef;
        dispatch(setUSer(user));
        setLoad(true);
      })
      .catch((error) => {
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
      });
  }, []);
  return user.dorms.length && load ? (
    <AllDormsList navigation={navigation} />
  ) : (
    <View style={styles.container}>
      <Spinner
        visible={true}
        textContent={"Yükleniyor..."}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "green",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});

export default GetPrivateDorms;
