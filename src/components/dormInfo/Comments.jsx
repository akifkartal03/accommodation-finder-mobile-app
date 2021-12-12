import React, { Component, useState, useEffect } from "react";
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
import { getUserByID } from "../../database/services/user_service";
import { getUsers } from "../../database/services/user_service";
import Spinner from "react-native-loading-spinner-overlay";
import { getResult } from "../../database/sentiment/sentiment_service";
import CommentsHeader from "../header/commentsHeader";
import Header from "../common/Header";

const Comments = ({ navigation, route }) => {
  const [{ user }, dispatch] = useStore();
  const [comment, setComment] = useState("");
  const [data, setData] = useState(route.params.id.Comments);
  const [spinner, setSpinner] = useState(false);
  const [users, setUsers] = useState([]);
  //const [filters, setFilters] = useState([]);
  const [res, setRes] = useState({ result: "positive" });
  const dr = route.params.id;
  const image = "https://bootdey.com/img/Content/avatar/avatar7.png";
  const [spinner2, setSpinner2] = useState(false);

  useEffect(() => {
    getUsers()
      .then((docRef) => {
        //console.log(docRef);s
        setData(
          data
            .sort(function (a, b) {
              return a.likeNumber - b.likeNumber;
            })
            .reverse()
        );
        setUsers(docRef);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const sendPressed = () => {
    setSpinner(true);
    getResult(comment)
      .then((response) => {
        console.log(response.data);
        setRes(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    dr.Comments.unshift({
      userInfo: user.info.id,
      comment: comment,
      date: new Date().toString(),
      likeNumber: 0,
      type: res.result == "positive" ? 1 : 0,
      _id: uuid.v4(),
    });
    setData(dr.Comments);
    setSpinner2(true);
    //console.log(comment);
    //console.log(res);
    updateDorm(dr.id, dr)
      .then((docRef) => {
        //setSpinner(false);
        console.log(docRef);
      })
      .catch((error) => {
        alert(error.message);
      });
    setSpinner(false);
    Alert.alert("Başarılı", "Yorum Yapıldı.", [
      {
        text: "Tamam",
        onPress: () => {
          setSpinner2(false);
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

      setSpinner2(true);

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
            setSpinner2(false);
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

      setSpinner2(true);

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
            setSpinner2(false);
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
  const getUser = (userid) => {
    return users.find(({ id }) => id == userid);
  };
  const applyFilters = (filters) => {
    //console.log(filters);
    //setFilters(filters);
    if (filters.length == 1) {
      if (filters[0] == 1) {
        setData(dr.Comments.filter((word) => word.type == 1));
      } else if (filters[0] == 2) {
        setData(dr.Comments.filter((word) => word.type == 0));
      } else {
        setData(
          dr.Comments.filter(
            (word) => isStayed(getUser(word.userInfo)) !== undefined
          )
        );
      }
    } else if (filters.length == 2) {
      if (
        (filters[0] == 1 && filters[1] == 3) ||
        (filters[0] == 3 && filters[1] == 1)
      ) {
        setData(dr.Comments.filter((word) => word.type == 1));
      } else if (
        (filters[0] == 2 && filters[1] == 3) ||
        (filters[0] == 3 && filters[1] == 2)
      ) {
        setData(dr.Comments.filter((word) => word.type == 0));
      } else {
        setData(
          dr.Comments.filter(
            (word) => isStayed(getUser(word.userInfo)) === undefined
          )
        );
      }
    } else if (filters.length == 3) {
      setData(dr.Comments);
    } else {
      setData(dr.Comments);
    }
  };
  const isStayed = (information) => {
    return information.stayedDorms.find((element) => element == dr.id);
  };
  /*async function getUser(id) {
    console.log(id);
    await getUserByID(id)
      .then((docRef) => {
        setTmp(docRef.data());
      })
      .catch((error) => {
        alert(error);
      });
    //return user.info;
  }*/
  const likePicker = (ind) => {
    return user.info.likedComments.includes(dr.Comments[ind]._id);
  };
  return users.length ? (
    !spinner ? (
      <View style={styles.common}>
        <CommentsHeader
          headTitle={"Yorumlar"}
          nav={navigation}
          size={23}
          func={applyFilters}
        />
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
          extraData={spinner2}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          renderItem={(item) => {
            const Notification = item.item;
            const info = getUser(Notification.userInfo);
            return (
              <View style={styles.container}>
                <View style={styles.container2}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("StaticProfile", info);
                    }}
                  >
                    <Image
                      style={styles.image}
                      source={{
                        uri: info.avatar ? info.avatar : image,
                      }}
                    />
                  </TouchableOpacity>
                  {Notification.type ? (
                    <Icon
                      style={styles.sentiment}
                      name="smile-o"
                      size={20}
                      color="green"
                    />
                  ) : (
                    <Icon
                      style={styles.sentiment}
                      name="frown-o"
                      size={20}
                      color="red"
                    />
                  )}
                </View>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("StaticProfile", info);
                      }}
                    >
                      <Text style={styles.name}>{info.nameVal}</Text>
                    </TouchableOpacity>
                    <Text style={styles.time}>
                      {datePicker(new Date(Notification.date))}
                    </Text>
                  </View>
                  <Text rkType="primary3 mediumLine">
                    {Notification.comment}
                  </Text>
                  {isStayed(info) ? (
                    <View style={styles.contentHeader}>
                      <View style={styles.commentz}>
                        <Icon
                          style={styles.star2}
                          name="star"
                          size={15}
                          color="orange"
                        />
                        <Text style={styles.star}>
                          Bu yurtta kalmış öğrenci
                        </Text>
                      </View>
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
                  ) : (
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
                  )}
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
    ) : (
      <View style={styles.spin}>
        <Spinner
          visible={true}
          textContent={"Yorum Değerlendiriliyor..."}
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    )
  ) : (
    <View style={styles.spin}>
      <Spinner
        visible={true}
        textContent={"Yükleniyor..."}
        textStyle={styles.spinnerTextStyle}
      />
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
    marginBottom: 5,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 30,
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
  commenty: {
    flex: 1,
    flexDirection: "row",
  },
  like: {
    flexDirection: "row",
    alignSelf: "flex-end",
    margin: 5,
    marginBottom: 0,
  },
  star: {
    alignSelf: "flex-start",
    marginBottom: 0,
    marginTop: 20,
    fontSize: 13,
    color: "#808080",
  },
  star2: {
    alignSelf: "flex-start",
    marginBottom: 0,
    marginTop: 21,
    marginRight: 8,
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
  commentz: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  container2: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  sentiment: {
    paddingLeft: 15,
    marginTop: 20,
  },
});
export default Comments;
