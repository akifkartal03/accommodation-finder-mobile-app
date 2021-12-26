import React, { useState, useEffect } from "react";
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
import { Avatar, Badge, Icon, withBadge } from "react-native-elements";
import { useStore } from "../../redux/store/Provider";
import MainPageHeader from "../../components/header/mainPageHeader";
import Spinner from "react-native-loading-spinner-overlay";
import Firebase from "../../database/firebase_config";
import { getUsers } from "../../database/services/user_service";
import NoChat from "../../components/chat_comp/NoChat";
import { useIsFocused } from "@react-navigation/native";

const ChatList = ({ navigation, route }) => {
  const [{ user }, dispatch] = useStore();
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [users, setUsers] = useState([]);
  const image = "https://bootdey.com/img/Content/avatar/avatar7.png";
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  //const isFocused = useIsFocused();
  //let threads2 = [];

  useEffect(() => {
    if (user.info.chatList.length > 0) {
      setLoading2(true);
      getUsers()
        .then((docRef) => {
          setUsers(docRef);
        })
        .catch((error) => {
          alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        });
      const notUndefined = (anyValue) => typeof anyValue !== "undefined";
      const unsubscribe = Firebase.firestore()
        .collection("chatRooms")
        .onSnapshot((querySnapshot) => {
          const threads2 = querySnapshot.docs
            .map((documentSnapshot) => {
              if (user.info.chatList.includes(documentSnapshot.id)) {
                //console.log(documentSnapshot.data().latest.createdAt);
                return {
                  _id: documentSnapshot.id,
                  userInfo:
                    user.info.id != documentSnapshot.data().userInfo1
                      ? documentSnapshot.data().userInfo1
                      : documentSnapshot.data().userInfo2,
                  pending:
                    user.info.id == documentSnapshot.data().userInfo1
                      ? documentSnapshot.data().pending1
                      : documentSnapshot.data().pending2,
                  ...documentSnapshot.data(),
                };
              }
            })
            .filter(notUndefined)
            .sort(
              (a, b) =>
                new Date(b.latest.createdAt).getTime() -
                new Date(a.latest.createdAt).getTime()
            );
          console.log(threads2);
          if (loading) {
            setThreads(threads2);
            setLoading(false);
            console.log(threads);
          }
        });
      setLoading2(false);
      return () => unsubscribe();
    }
  }, []);

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

  return user.info.chatList.length > 0 ? (
    !loading ? (
      <View style={styles.common}>
        <MainPageHeader headTitle={"Mesajlar"} nav={navigation} size={23} />
        <FlatList
          style={styles.root}
          data={threads}
          extraData={loading2}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          renderItem={(item) => {
            const Notification = item.item;
            const info = getUser(Notification.userInfo);
            return (
              <View style={styles.container}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("StaticProfile", info);
                  }}
                >
                  <View style={styles.container2}>
                    <Avatar
                      rounded
                      source={{
                        uri: info.avatar ? info.avatar : image,
                      }}
                      size="medium"
                    />
                    {Notification.pending > 0 ? (
                      <Badge
                        status="success"
                        value={
                          Notification.pending > 99
                            ? "99+"
                            : Notification.pending
                        }
                        containerStyle={{
                          position: "absolute",
                          top: -4,
                          right: -4,
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </View>
                </TouchableOpacity>

                <View style={styles.content}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ChatPage", {
                        itemId: Notification._id,
                        userInfo: info,
                      });
                    }}
                  >
                    <View style={styles.contentHeader}>
                      <Text style={styles.name}>{info.nameVal}</Text>
                      <Text style={styles.time}>
                        {datePicker(new Date(Notification.latest.createdAt))}
                      </Text>
                    </View>
                    <Text rkType="primary3 mediumLine">
                      {Notification.latest.text}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    ) : (
      <View style={styles.spin}>
        <Spinner
          visible={true}
          textContent={"Yükleniyor..."}
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    )
  ) : (
    <NoChat nav={navigation} />
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
    color: "green",
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
export default ChatList;
