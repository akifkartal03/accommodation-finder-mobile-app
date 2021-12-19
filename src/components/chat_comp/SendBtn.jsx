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
const SendBtn = (props) => {
  const [{ user }, dispatch] = useStore();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(false);
  const sendPressed = async () => {
    setLoading(true);
    const unsubscribe = await Firebase.firestore()
      .collection("chatRooms")
      .where("__name__", "in", user.info.chatList)
      .get();

    const threads = await unsubscribe.docs.map((documentSnapshot) => {
      const element = documentSnapshot.data();
      if (
        element.userInfo1 == props.other.id ||
        element.userInfo2 == props.other.id
      ) {
        return {
          _id: documentSnapshot.id,
          ...documentSnapshot.data(),
        };
      }
    });
    setThreads(threads);
    setLoading(false);
    if (threads.length > 0) {
      props.nav.navigate("ChatPage", {
        itemId: threads[0]._id,
        userInfo: props.other,
      });
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
