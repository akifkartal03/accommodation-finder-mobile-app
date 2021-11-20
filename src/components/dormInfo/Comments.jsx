import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useStore } from "../../redux/store/Provider";
import MainPageHeader from "../header/mainPageHeader";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import { updateDorm } from "../../database/services/dormitory_service";
import { updateUser } from "../../database/services/user_service";
import uuid from "react-native-uuid";
import { setUSer } from "../../redux/actions/LoginAction";

const Comments = ({ navigation, route }) => {
  const [{ user }, dispatch] = useStore();
  const [comment, setComment] = useState("");
  const [data, setData] = useState(route.params.id.Comments);
  const [spinner, setSpinner] = useState(false);
  const [like, setLike] = useState(false);
  const dr = route.params.id;
  const image = "https://bootdey.com/img/Content/avatar/avatar7.png";

  const sendPressed = () => {
    dr.Comments.unshift({
      userInfo: user.info,
      comment: comment,
      date: new Date().toString(),
      likeNumber: 0,
      type: 0,
      _id: uuid.v4(),
    });
    setData(dr.Comments);
    setSpinner(true);

    updateDorm(dr.id, dr)
      .then((docRef) => {
        console.log(docRef);
      })
      .catch((error) => {
        alert(error.message);
      });
    Alert.alert("Başarılı", "Yorum Yapıldı.", [
      {
        text: "Tamam",
        onPress: () => {
          setSpinner(false);
        },
      },
    ]);
  };
  const likePressed = (ind) => {
    if (!user.info.likedComments.includes(dr.Comments[ind]._id)) {
      dr.Comments[ind].likeNumber += 1;
      setData(dr.Comments);
      user.info.likedComments.push(dr.Comments[ind]._id);
      dispatch(setUSer(user));

      setSpinner(true);

      updateDorm(dr.id, dr)
        .then((docRef) => {
          console.log(docRef);
        })
        .catch((error) => {
          alert(error.message);
        });

      updateUser(user.info.id, user.info)
        .then((docRef) => {
          console.log(docRef);
        })
        .catch((error) => {
          alert(error.message);
        });

      Alert.alert("Başarılı", "Yorumu Beğendin.", [
        {
          text: "Tamam",
          onPress: () => {
            setSpinner(false);
          },
        },
      ]);
    } else {
      dr.Comments[ind].likeNumber -= 1;
      setData(dr.Comments);
      const index = user.info.likedComments.indexOf(dr.Comments[ind]._id);
      if (index > -1) {
        user.info.likedComments.splice(index, 1);
      }

      dispatch(setUSer(user));

      setSpinner(true);

      updateDorm(dr.id, dr)
        .then((docRef) => {
          console.log(docRef);
        })
        .catch((error) => {
          alert(error.message);
        });
      updateUser(user.info.id, user.info)
        .then((docRef) => {
          console.log(docRef);
        })
        .catch((error) => {
          alert(error.message);
        });
      Alert.alert("Başarılı", "Yorumu Beğenmekten Vazgeçtin.", [
        {
          text: "Tamam",
          onPress: () => {
            setSpinner(false);
          },
        },
      ]);
    }

    //console.log(ind);
  };
  const datePicker = (date) => {
    const monthNames = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];
    const dateObj = date;
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, "0");
    const year = dateObj.getFullYear();
    return day + " " + month + " " + year;
  };
  const likePicker = (ind) => {
    return user.info.likedComments.includes(dr.Comments[ind]._id);
  };
  return (
    <View style={styles.common}>
      <MainPageHeader headTitle={"Yorumlar"} nav={navigation} size={10} />
      <Text style={styles.text}>{dr.Name}</Text>

      <View
        style={{
          borderBottomColor: "#c9153c",
          borderBottomWidth: 1,
        }}
      />
      <FlatList
        style={styles.root}
        data={data}
        extraData={spinner}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        renderItem={(item) => {
          const Notification = item.item;
          return (
            <View style={styles.container}>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  style={styles.image}
                  source={{
                    uri: Notification.userInfo.avatar
                      ? Notification.userInfo.avatar
                      : image,
                  }}
                />
              </TouchableOpacity>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text style={styles.name}>
                    {Notification.userInfo.nameVal}
                  </Text>
                  <Text style={styles.time}>
                    {datePicker(new Date(Notification.date))}
                  </Text>
                </View>
                <Text rkType="primary3 mediumLine">{Notification.comment}</Text>

                <TouchableOpacity
                  style={styles.like}
                  onPress={() => likePressed(item.index)}
                >
                  <Icon
                    style={styles.like}
                    name={likePicker(item.index) ? "heart" : "heart-o"}
                    size={15}
                    color="red"
                  />
                  <Text style={styles.tx}>{Notification.likeNumber}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <View style={styles.commentx}>
        <TextInput
          onChangeText={(text) => setComment(text)}
          style={styles.textInput}
          placeholder={"Yorum Yap"}
          placeholderTextColor="#66737C"
          maxHeight={50}
          minHeight={50}
          multiline={true}
        />
        <TouchableOpacity onPress={sendPressed}>
          <Icon2
            name="send"
            size={25}
            color="black"
            style={{ margin: 15, marginTop: 20, marginLeft: 25 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  spin: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  root: {
    backgroundColor: "#ffffff",
    marginTop: 5,
    marginBottom: 10,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 2,
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },
  common: {
    flex: 1,
    backgroundColor: "white",
  },
  textInput: {
    marginLeft: 10,
    marginBottom: 3,
    fontSize: 17,
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "white",
    borderBottomColor: "#66737C",
  },
  commentx: {
    flexDirection: "row",
  },
  like: {
    flexDirection: "row",
    alignSelf: "flex-end",
    margin: 5,
    marginBottom: 0,
  },
  tx: {
    marginTop: 4,
    marginLeft: 2,
    fontSize: 12,
    marginRight: 17,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
export default Comments;
