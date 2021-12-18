import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GiftedChat, Send } from "react-native-gifted-chat";
import Firebase from "../../database/firebase_config";
import { useStore } from "../../redux/store/Provider";
import MainPageHeader from "../../components/header/mainPageHeader";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Spinner from "react-native-loading-spinner-overlay";
import ChatPageHeader from "../../components/header/chatHeader";

const ChatPage = ({ navigation, route }) => {
  const [{ user }, dispatch] = useStore();
  const { itemId, userInfo } = route.params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  //console.log(user.info);
  useEffect(() => {
    const unsubscribe = Firebase.firestore()
      .collection("chatRooms")
      .doc(itemId)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            text: documentSnapshot.data().text,
            createdAt: documentSnapshot.data().createdAt,
            user: documentSnapshot.data().user,
          };
        });

        setMessages(threads);
        //console.log(threads);
        if (loading) {
          setLoading(false);
        }
      });

    return () => unsubscribe();
  }, []);
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const text = messages[0].text;
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
    Firebase.firestore()
      .collection("chatRooms")
      .doc(itemId)
      .set(
        {
          latest: {
            text,
            createdAt: new Date().toString(),
          },
        },
        { merge: true }
      );
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
    color: "#FFF",
  },
});

export default ChatPage;
