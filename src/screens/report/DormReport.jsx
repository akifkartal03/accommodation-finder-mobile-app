import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import MainPageHeader from "../../components/header/mainPageHeader.jsx";
import { Button } from "react-native-paper";
import { useStore } from "../../redux/store/Provider";
import { addReport } from "../../database/services/report_service.js";
const DormReport = ({ route, navigation }) => {
  const dorm = route.params;
  const [{ user }, dispatch] = useStore();
  const [comment, setComment] = useState("");
  const [load, setLoad] = useState(false);
  const sendPressed = () => {
    setLoad(true);
    const data = {
      userId: user.info.id,
      message: comment,
      date: new Date().toString(),
      resolved: 0,
    };
    addReport(data)
      .then((docRef) => {
        console.log(docRef);
      })
      .catch((error) => {
        alert(error.message);
      });
    Alert.alert("Başarılı", "Mesajınız Bizlere Gönderildi.", [
      {
        text: "Tamam",
        onPress: () => {
          setLoad(false);
        },
      },
    ]);

    setLoad(false);
  };
  return (
    <View style={styles.container}>
      <MainPageHeader headTitle="Hata Bildir" nav={navigation} />
      <Text style={styles.text}>{dorm.Name}</Text>
      <TextInput
        onChangeText={(text) => setComment(text)}
        style={styles.textInput}
        placeholder={"Detaylı Mesajınızı Yazınız"}
        placeholderTextColor="#66737C"
        maxHeight={200}
        minHeight={100}
        multiline={true}
      />
      <View style={styles.btn3}>
        <Button
          icon={{
            uri:
              "https://cdn-icons.flaticon.com/png/128/2989/premium/2989993.png?token=exp=1637436124~hmac=452b5deb4064f90c4aaccdbea97d1a24",
          }}
          mode="contained"
          color="green"
          labelStyle={{
            fontSize: 18,
            marginTop: 6,
            marginLeft: 12,
          }}
          uppercase={false}
          onPress={sendPressed}
          loading={load}
        >
          Gönder
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  container2: {
    marginTop: 10,
  },
  header: {
    height: 70,
    padding: 15,
    backgroundColor: "darkslateblue",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 15,
    marginBottom: 15,
    fontWeight: "bold",
  },
  textInput: {
    margin: 10,
    fontSize: 17,
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#66737C",
    paddingLeft: 10,
  },
  btn3: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
  },
});

export default DormReport;
