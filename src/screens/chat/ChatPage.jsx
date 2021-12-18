import React, { useState, useCallback, useEffect } from "react";
import { View, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Firebase from "../../database/firebase_config";
import { useStore } from "../../redux/store/Provider";

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
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user.info.id,
        name: user.info.nameVal,
        avatar: user.info.avatar,
      }}
    />
  );
};

export default ChatPage;
