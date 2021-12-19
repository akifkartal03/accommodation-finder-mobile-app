import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import { Link } from "@react-navigation/native";
import { Button } from "react-native-paper";
import Firebase from "../../database/firebase_config";
import { useStore } from "../../redux/store/Provider";
import { setUSer } from "../../redux/actions/LoginAction";
import { updateUser } from "../../database/services/user_service";
import { getUserByID } from "../../database/services/user_service";
const SendBtn = (props) => {
  const [{ user }, dispatch] = useStore();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(false);
  const sendPressed = async () => {
    if (user.info.chatList.length > 0) {
      setLoading(true);
      let temp = [];
      const unsubscribe = await Firebase.firestore()
        .collection("chatRooms")
        .where("__name__", "in", user.info.chatList)
        .get();

      unsubscribe.docs.map((documentSnapshot) => {
        const element = documentSnapshot.data();
        if (
          element.userInfo1 == props.other.id ||
          element.userInfo2 == props.other.id
        ) {
          console.log("hereee");
          temp.push({
            _id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        }
      });
      console.log(temp);
      if (temp.length > 0) {
        setLoading(false);
        console.log("test");
        props.nav.navigate("ChatPage", {
          itemId: temp[0]._id,
          userInfo: props.other,
        });
      } else {
        Firebase.firestore()
          .collection("chatRooms")
          .add({
            latest: {
              text: "Yeni Chat",
              createdAt: new Date().getTime(),
            },
            userInfo1: user.info.id,
            userInfo2: props.other.id,
            pending1: 0,
            pending2: 0,
          })
          .then((docRef) => {
            docRef.collection("messages").add({
              text: "Yeni Chat Başladı...",
              createdAt: new Date().getTime(),
              system: true,
              user: {
                avatar:
                  "https://cdn-icons-png.flaticon.com/32/1041/1041916.png",
                _id: docRef.id,
              },
            });
            console.log(docRef.id);
            const uid = docRef.id;
            let info = user.info;
            info.chatList.push(docRef.id);
            user.info = info;
            dispatch(setUSer(user));
            updateUser(info.id, info)
              .then((docRef) => {
                console.log(docRef);
              })
              .catch((error) => {
                alert(error.message);
              });
            getUserByID(props.other.id)
              .then((docRef) => {
                let info2 = docRef.data();
                info2.chatList.push(uid);
                updateUser(props.other.id, info2)
                  .then((docRef2) => {
                    console.log(docRef2);
                  })
                  .catch((error) => {
                    alert(error);
                  });
              })
              .catch((error) => {
                console.log(error);
                setLoad(false);
              });
            setLoading(false);
            props.nav.navigate("ChatPage", {
              itemId: docRef.id,
              userInfo: props.other,
            });
          });
        setLoading(false);
      }
    } else {
      Firebase.firestore()
        .collection("chatRooms")
        .add({
          latest: {
            text: "Yeni Chat",
            createdAt: new Date().getTime(),
          },
          userInfo1: user.info.id,
          userInfo2: props.other.id,
          pending1: 0,
          pending2: 0,
        })
        .then((docRef) => {
          docRef.collection("messages").add({
            text: "Yeni Chat Başladı...",
            createdAt: new Date().getTime(),
            system: true,
            user: {
              avatar: "https://cdn-icons-png.flaticon.com/32/1041/1041916.png",
              _id: docRef.id,
            },
          });
          console.log(docRef.id);
          const uid = docRef.id;
          let info = user.info;
          info.chatList.push(docRef.id);
          user.info = info;
          dispatch(setUSer(user));
          updateUser(info.id, info)
            .then((docRef) => {
              console.log(docRef);
            })
            .catch((error) => {
              alert(error.message);
            });
          getUserByID(props.other.id)
            .then((docRef) => {
              let info2 = docRef.data();
              info2.chatList.push(uid);
              updateUser(props.other.id, info2)
                .then((docRef2) => {
                  console.log(docRef2);
                })
                .catch((error) => {
                  alert(error);
                });
            })
            .catch((error) => {
              console.log(error);
              setLoad(false);
            });
          setLoading(false);
          props.nav.navigate("ChatPage", {
            itemId: docRef.id,
            userInfo: props.other,
          });
        });
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        icon={{
          uri: "https://cdn-icons-png.flaticon.com/512/1370/1370907.png",
        }}
        mode="contained"
        color="#7ae1af"
        labelStyle={{
          fontSize: 18,
          marginTop: 6,
          marginLeft: 12,
          color: "black",
        }}
        uppercase={false}
        onPress={sendPressed}
        loading={loading}
      >
        Mesaj Gönder
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "olive",
    fontWeight: "bold",
  },
  item: {
    padding: 10,
    paddingLeft: 20,
    fontSize: 18,
    height: 44,
  },
});

export default SendBtn;
