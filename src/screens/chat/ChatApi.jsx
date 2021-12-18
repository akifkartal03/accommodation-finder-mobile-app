import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getRoomByID } from "../../database/services/chat_service";
import { getMessagesByID } from "../../database/services/chat_service";
import { useStore } from "../../redux/store/Provider";
import Firebase from "../../database/firebase_config";
import Spinner from "react-native-loading-spinner-overlay";

const ChatApi = ({ navigation, route }) => {
  const [{ user }, dispatch] = useStore();
  const [data, setData] = useState([]);
  const [mesg, setMsg] = useState([]);
  const rooms = [];
  const msgList = [];
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = Firebase.firestore()
      .collection("chatRooms")
      .where("__name__", "in", user.info.chatList)
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return documentSnapshot.data();
        });

        setThreads(threads);
        //console.log(threads);
        if (loading) {
          setLoading(false);
        }
      });

    return () => unsubscribe();
  }, []);
  return (
    <View>
      {loading ? (
        <View style={styles.spin}>
          <Spinner
            visible={true}
            textContent={"Yükleniyor..."}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      ) : (
        <Text>Test Api</Text>
      )}
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
});

export default ChatApi;
