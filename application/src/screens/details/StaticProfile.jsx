import React from "react";
import { StyleSheet, View } from "react-native";
import MainPageHeader from "../../components/header/mainPageHeader.jsx";
import ProfileInfo from "../../components/staticProfile/ProfileInfo.jsx";
import { useStore } from "../../redux/store/Provider";
import SendBtn from "../../components/chat_comp/SendBtn.jsx";

const StaticProfile = ({ route, navigation }) => {
  const [{ user }, dispatch] = useStore();
  const user2 = route.params;
  const backPressed = () => {
    navigation.goBack();
  };
  //console.log(user);
  return (
    <View style={styles.container}>
      <MainPageHeader
        headTitle="Kullanıcı Bilgileri"
        nav={navigation}
        size={23}
      />
      <ProfileInfo dr={user2} nav={navigation} />
      {user.info.id != user2.id ? (
        <SendBtn nav={navigation} other={user2} />
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  container2: {
    marginTop: 10,
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
});

export default StaticProfile;
