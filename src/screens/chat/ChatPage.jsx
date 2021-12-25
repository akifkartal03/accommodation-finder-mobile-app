import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GiftedChat, Send } from "react-native-gifted-chat";
import Firebase from "../../database/firebase_config";
import { useStore } from "../../redux/store/Provider";
import MainPageHeader from "../../components/header/mainPageHeader";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Spinner from "react-native-loading-spinner-overlay";
import ChatPageHeader from "../../components/header/chatHeader";
import "dayjs/locale/fr";
import { getRoomByID } from "../../database/services/chat_service";

const ChatPage = ({ navigation, route }) => {
  const [{ user }, dispatch] = useStore();
  const { itemId, userInfo } = route.params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  let loading2 = true;
  //console.log(user.info);
  useEffect(() => {
    const unsubscribe = Firebase.firestore()
      .collection("chatRooms")
      .doc(itemId)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          /*if (documentSnapshot.data().pending) {
            Firebase.firestore()
              .collection("chatRooms")
              .doc(itemId)
              .collection("messages")
              .doc(documentSnapshot.id)
              .update({
                _id: documentSnapshot.id,
                text: documentSnapshot.data().text,
                pending: false,
                createdAt: documentSnapshot.data().createdAt,
                user: documentSnapshot.data().user,
              });
          }*/
          return {
            _id: documentSnapshot.id,
            text: documentSnapshot.data().text,
            createdAt: documentSnapshot.data().createdAt,
            user: documentSnapshot.data().user,
          };
        });

        //console.log(threads);

        if (loading) {
          setMessages(threads);
          setLoading(false);
          if (loading2) {
            loading2 = false;
            getRoomByID(itemId)
              .then((docRef) => {
                let data = docRef.data();
                Firebase.firestore()
                  .collection("chatRooms")
                  .doc(itemId)
                  .set(
                    {
                      pending1:
                        userInfo.id != data.userInfo1 ? 0 : data.pending1,
                      pending2:
                        userInfo.id != data.userInfo2 ? 0 : data.pending2,
                    },
                    { merge: true }
                  );
              })
              .catch((error) => {
                alert(error.message);
              });
          }
        }
      });

    return () => unsubscribe();
  }, []);
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const text = messages[0].text;
    loading2 = false;
    Firebase.firestore()
      .collection("chatRooms")
      .doc(itemId)
      .collection("messages")
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: user.info.id,
          name: user.info.nameVal,
          avatar: user.info.avatar,
        },
      });
    //let data;
    getRoomByID(itemId)
      .then((docRef) => {
        let data = docRef.data();
        Firebase.firestore()
          .collection("chatRooms")
          .doc(itemId)
          .set(
            {
              latest: {
                text,
                createdAt: new Date().toString(),
              },
              pending1: userInfo.id == data.userInfo1 ? data.pending1 + 1 : 0,
              pending2: userInfo.id == data.userInfo2 ? data.pending2 + 1 : 0,
            },
            { merge: true }
          );
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  return !loading ? (
    <View style={styles.common}>
      <ChatPageHeader headTitle={userInfo.nameVal} nav={navigation} size={23} />
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user.info.id,
          name: user.info.nameVal,
          avatar: user.info.avatar,
        }}
        placeholder="Mesaj Yaz..."
        locale="tr"
        dateFormat="DD/MM/YYYY"
        timeFormat="HH:mm"
        renderSend={(props) => {
          return (
            <Send {...props}>
              <View style={{ marginRight: 10, marginBottom: 10 }}>
                <Icon2 name="send" size={25} color="black" />
              </View>
            </Send>
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
  );
};
const styles = StyleSheet.create({
  common: {
    flex: 1,
    backgroundColor: "white",
  },
  spin: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  spinnerTextStyle: {
    color: "green",
  },
});

export default ChatPage;
