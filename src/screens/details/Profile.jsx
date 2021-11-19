import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import MainPageHeader from "../../components/header/mainPageHeader.jsx";
import Icon from "react-native-vector-icons/FontAwesome";
import OtherInfo from "../../components/profile/OtherInfo.jsx";
import ProfilInfoList from "../../components/profile/ProfilInfoList.jsx";
import Combobox1 from "../../components/profile/Combobox1.jsx";

const Profile = ({ navigation }) => {
  const images = [
    "https://cdn-icons-png.flaticon.com/128/1177/1177568.png",
    "https://www.bootdey.com/img/Content/avatar/avatar8.png",
    "https://bootdey.com/img/Content/avatar/avatar7.png",
    "https://www.bootdey.com/img/Content/avatar/avatar2.png",
  ];
  const [img, setImg] = useState(images[0]);
  const [comment, setComment] = useState("");
  console.log(comment);
  return (
    <View style={styles.container}>
      <MainPageHeader headTitle="Profil Bilgileri" nav={navigation} />
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
            ) : index != 5 ? (
              <View style={styles.container}>
                <ProfilInfoList index={index} setComment={setComment} />
              </View>
            ) : (
              <Combobox1 />
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
    color: "#cd123a",
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
});

export default Profile;
