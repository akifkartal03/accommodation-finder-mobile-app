import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useStore } from "../../redux/store/Provider";
import Firebase from "../../database/firebase_config";
import { DrawerActions } from "@react-navigation/native";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import ProfileComponent from "./Profile";
const MContext = ({ navigation }) => {
  const [{ user }, dispatch] = useStore();
  const userData = {
    profileUrl: user.info.avatar,
    username: user.info.nameVal,
    email: user.info.emailVal,
  };

  const exitPressed = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        navigation.dispatch(DrawerActions.closeDrawer());
        navigation.reset({
          index: 0,
          routes: [{ name: "StartScreen" }],
        });
      })
      .catch((error) => alert(error.message));
  };
  const menuData = [
    {
      icon: "home",
      name: "Tüm Yurtlar",
      screenName: "1",
      key: 1,
      handle: () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        navigation.navigate("Dashboard");
      },
    },
    {
      icon: "house-user",
      name: "Devlet Yurtları",
      screenName: "2",
      key: 2,
      handle: () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        navigation.navigate("PublicDorms");
      },
    },
    {
      icon: "hotel",
      name: "Özel Yurtlar",
      screenName: "3",
      key: 4,
      handle: () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        navigation.navigate("PrivateDorms");
      },
    },
    {
      icon: "user-alt",
      name: "Profil",
      screenName: "6",
      key: 5,
      handle: () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        navigation.navigate("Profile");
      },
    },
    {
      icon: "arrow-circle-left",
      name: "Geri dön",
      screenName: "4",
      key: 7,
      handle: () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        navigation.goBack();
      },
    },
    {
      icon: "sign-out-alt",
      name: "Çıkış yap",
      screenName: "5",
      key: 8,
      handle: exitPressed,
    },
  ];
  return (
    <View style={styles.container}>
      <ProfileComponent
        profileUrl={userData.profileUrl}
        username={userData.username}
        email={userData.email}
      />
      <FlatList
        data={menuData}
        renderItem={({ item }) => (
          <DrawerItem
            label={item.name}
            icon={() => (
              <Icon size={20} name={item.icon} style={{ marginRight: -15 }} />
            )}
            onPress={item.handle}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: getStatusBarHeight() + 20,
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.43)",
  },
  menuItem: {
    flexDirection: "row",
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: "300",
    margin: 15,
  },
});

export default MContext;
