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
const MContext = (props) => {
  const [{ user }, dispatch] = useStore();
  const userData = {
    profileUrl:
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/5e227329363657.55ef8df90a1ca.png",
    username: user.info.nameVal,
    email: user.info.emailVal,
  };

  const exitPressed = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        user.nav.dispatch(DrawerActions.closeDrawer());
        user.nav.reset({
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
      screenName: "PiedPiper",
      key: 1,
      handle: () => {
        user.nav.dispatch(DrawerActions.closeDrawer());
        user.nav.navigate("Dashboard");
      },
    },
    {
      icon: "house-user",
      name: "Devlet Yurtları",
      screenName: "PiedPiper",
      key: 2,
      handle: () => {},
    },
    {
      icon: "hotel",
      name: "Özel Yurtlar",
      screenName: "Hooli",
      key: 4,
      handle: () => {},
    },
    {
      icon: "cog",
      name: "Settings",
      screenName: "Hooli",
      key: 7,
      handle: () => {},
    },
    {
      icon: "sign-out-alt",
      name: "Çıkış yap",
      screenName: "Hooli",
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
