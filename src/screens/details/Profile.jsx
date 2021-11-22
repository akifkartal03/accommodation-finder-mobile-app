import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { CheckBox } from "react-native-elements";
import MainPageHeader from "../../components/header/mainPageHeader.jsx";
import Icon from "react-native-vector-icons/FontAwesome";
import OtherInfo from "../../components/profile/OtherInfo.jsx";
import ProfilInfoList from "../../components/profile/ProfilInfoList.jsx";
import Combobox1 from "../../components/profile/Combobox1.jsx";
import Combobox2 from "../../components/profile/Combobox2.jsx";
import { Button } from "react-native-paper";
import { useStore } from "../../redux/store/Provider";
import { setUSer } from "../../redux/actions/LoginAction";
import { updateUser } from "../../database/services/user_service.js";

const Profile = ({ navigation }) => {
  const [{ user }, dispatch] = useStore();
  const images = [
    "https://cdn-icons-png.flaticon.com/128/1177/1177568.png",
    "https://www.bootdey.com/img/Content/avatar/avatar8.png",
    "https://bootdey.com/img/Content/avatar/avatar7.png",
    "https://www.bootdey.com/img/Content/avatar/avatar2.png",
  ];
  const [img, setImg] = useState(user.info.avatar);
  const [selectedItem, setSelectedItem] = useState(user.info.gender);
  const [dorms, setDorms] = useState(user.info.stayedDorms);
  const [name, setName] = useState(user.info.nameVal);
  const [age, setAge] = useState(user.info.age);
  const [department, setDep] = useState(user.info.department);
  const [grade, setGrade] = useState(user.info.grade);
  const [load, setLoad] = useState(false);
  let data = [
    { value: name, func: setName },
    { value: age, func: setAge },
    { value: department, func: setDep },
    { value: grade, func: setGrade },
  ];
  const cmb1 = { value: selectedItem, func: setSelectedItem };
  const cmb2 = { value: dorms, func: setDorms };
  function handleConfirm(pItems) {
    setDorms(pItems);
  }
  const savePressed = () => {
    setLoad(true);
    if (isNaN(age)) {
      Alert.alert("Hata", "Lütfen uygun bir yaş değeri giriniz.", [
        {
          text: "Tamam",
          onPress: () => {
            setLoad(false);
          },
        },
      ]);
      return;
    }
    let info = user.info;
    info.nameVal = name;
    info.age = age;
    info.department = department;
    info.grade = grade;
    info.gender = selectedItem;
    info.stayedDorms = dorms;
    info.avatar = img;
    user.info = info;
    dispatch(setUSer(user));
    updateUser(info.id, info)
      .then((docRef) => {
        console.log(docRef);
      })
      .catch((error) => {
        alert(error.message);
      });
    Alert.alert("Başarılı", "Bilgileriniz Güncellendi.", [
      {
        text: "Tamam",
        onPress: () => {
          setLoad(false);
        },
      },
    ]);
    setLoad(false);
    /*console.log("------------------");
    console.log("img: " + img);
    console.log("gender: " + selectedItem);
    console.log("dorms: ");
    console.log(dorms);
    console.log("name: " + name);
    console.log("age: ");
    console.log(age);
    console.log("depar: " + department);
    console.log("grade: " + grade);*/
    //setLoad(false);
  };
  //console.log(comment);
  return (
    <View style={styles.container}>
      <MainPageHeader
        headTitle={"Profil Bilgileriniz"}
        nav={navigation}
        size={23}
      />
      <View style={styles.container4}>
        <FlatList
          data={[
            { icon: "question-circle-o", key: "Yer varmı?" },
            { icon: "info", key: "Tipi" },
            { icon: "try", key: "Fiyat Bilgisi(Aylık)" },
            { icon: "cutlery", key: "Yemek Bilgisi" },
            { icon: "phone", key: "Telefon Numarası" },
            { icon: "map-marker", key: "Adresi" },
            { icon: "plus", key: "Diğer Bilgiler" },
            { icon: "plus", key: "Diğer Bilgiler2" },
          ]}
          renderItem={({ item, index }) =>
            index == 0 ? (
              <View style={styles.container3}>
                <Icon
                  name="camera"
                  size={25}
                  color="#01367a"
                  style={{
                    padding: 10,
                    paddingRight: 5,
                    marginLeft: 5,
                    paddingTop: 15,
                  }}
                />
                <Text style={styles.item}>Avatar :</Text>
                <TouchableOpacity
                  onPress={() => {
                    setImg(images[0]);
                  }}
                >
                  <Image
                    style={{
                      borderColor: images[0] == img ? "green" : "red",
                      ...styles.image,
                    }}
                    source={{ uri: images[0] }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setImg(images[1]);
                  }}
                >
                  <Image
                    style={{
                      borderColor: images[1] == img ? "green" : "red",
                      ...styles.image,
                    }}
                    source={{ uri: images[1] }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setImg(images[2]);
                  }}
                >
                  <Image
                    style={{
                      borderColor: images[2] == img ? "green" : "red",
                      ...styles.image,
                    }}
                    source={{ uri: images[2] }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setImg(images[3]);
                  }}
                >
                  <Image
                    style={{
                      borderColor: images[3] == img ? "green" : "red",
                      ...styles.image,
                    }}
                    source={{ uri: images[3] }}
                  />
                </TouchableOpacity>
              </View>
            ) : index < 5 ? (
              <View style={styles.container}>
                <ProfilInfoList index={index} arr={data} />
              </View>
            ) : index == 5 ? (
              <Combobox1 data={cmb1} />
            ) : index == 6 ? (
              <Combobox2 data={cmb2} />
            ) : (
              <View style={styles.btn3}>
                <Button
                  icon={{
                    uri:
                      "https://cdn-icons.flaticon.com/png/128/2874/premium/2874091.png?token=exp=1637404880~hmac=46464d0aabf6874f3124926866d89d10",
                  }}
                  mode="contained"
                  color="green"
                  labelStyle={{
                    fontSize: 18,
                    marginTop: 6,
                    marginLeft: 12,
                  }}
                  uppercase={false}
                  onPress={savePressed}
                  loading={load}
                >
                  Kaydet
                </Button>
              </View>
            )
          }
        />
      </View>
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
    paddingTop: 10,
    paddingBottom: 10,
  },
  container4: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
    flexDirection: "column",
  },
  header: {
    height: 70,
    padding: 15,
    backgroundColor: "darkslateblue",
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
    paddingRight: 35,
  },
  image: {
    width: 40,
    height: 40,
    borderWidth: 3,
    borderRadius: 75,
    marginTop: 6,
    marginLeft: 6,
    marginRight: 10,
  },
  btn2: {
    borderRadius: 20,
    height: 32,
  },
  btn3: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
  },
});

export default Profile;
