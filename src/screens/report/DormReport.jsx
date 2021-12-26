import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Alert, Image } from "react-native";
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
      dormName: dorm.Name,
      dormId: dorm.id,
    };
    addReport(data)
      .then((docRef) => {
        console.log(docRef);
      })
      .catch((error) => {
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
      });
    Alert.alert("Başarılı", "Mesajınız Bizlere Gönderildi.", [
      {
        text: "Tamam",
        onPress: () => {
          setLoad(false);
          navigation.navigate("ReportStatus");
        },
      },
    ]);

    setLoad(false);
  };
  return (
    <View style={styles.container}>
      <MainPageHeader headTitle="Hata Bildir" nav={navigation} size={23} />
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
          icon={() => (
            <Image
              source={require("../../../assets/images/save5.png")}
              style={{ width: 25, height: 25, tintColor: "white" }}
            />
          )}
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
