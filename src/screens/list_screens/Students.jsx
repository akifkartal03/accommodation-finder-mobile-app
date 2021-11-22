import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import MainPageHeader from "../../components/header/mainPageHeader.jsx";
import Firebase from "../../database/firebase_config.js";
import { useStore } from "../../redux/store/Provider";
import { getUsers } from "../../database/services/user_service.js";
import { getHomeMate } from "../../database/services/user_service.js";
import Spinner from "react-native-loading-spinner-overlay";
import CardBox from "../../components/studentList/CardBox.jsx";
import NoStudent from "../../components/studentList/NoStudent.jsx";
import Add from "../../components/studentList/Add.jsx";

const Students = ({ navigation }) => {
  const [{ user }, dispatch] = useStore("");
  const [users, setUsers] = useState(null);
  useEffect(() => {
    getHomeMate()
      .then((docRef) => {
        setUsers(docRef);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  /*useEffect(() => {
    const unsubscribe = getUsers((docRef) => {
      if (docRef) {
        setUsers(docRef.filter((item) => item.isLookForHouseMate == 0));
      }
    });

    return unsubscribe;
  }, []);*/
  return (
    <View style={styles.container}>
      {users ? (
        users.length ? (
          <View style={styles.container}>
            <MainPageHeader
              headTitle="Ev Arkadaşı Arayanlar"
              nav={navigation}
              size={20}
            />
            <FlatList
              data={users}
              renderItem={({ item }) => (
                <CardBox dorm={item} nav={navigation} />
              )}
            />
            <Add msg={"Benide Ekle"} />
          </View>
        ) : (
          <NoStudent nav={navigation} />
        )
      ) : (
        <View style={styles.container2}>
          <Spinner
            visible={true}
            textContent={"Yükleniyor..."}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 70,
    padding: 15,
    backgroundColor: "darkslateblue",
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
  },
  spinnerTextStyle: {
    color: "black",
  },
});

export default Students;
