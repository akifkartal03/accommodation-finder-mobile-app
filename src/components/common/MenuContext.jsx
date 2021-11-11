import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useStore } from "../../redux/store/Provider";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import ProfileComponent from "./Profile";
const MContext = (props) => {
  const [{ user }, dispatch] = useStore();
  const menuData = [
    { icon: "ios-search", name: "Search", screenName: "PiedPiper", key: 1 },
    { icon: "ios-home-outline", name: "Home", screenName: "PiedPiper", key: 2 },
    {
      icon: "ios-navigate-outline",
      name: "Trips",
      screenName: "Hooli",
      key: 4,
    },
    {
      icon: "ios-heart-outline",
      name: "Wish List",
      screenName: "Hooli",
      key: 5,
    },
    {
      icon: "ios-person-outline",
      name: "Profile",
      screenName: "Hooli",
      key: 6,
    },
    {
      icon: "ios-settings-outline",
      name: "Settings",
      screenName: "Hooli",
      key: 7,
    },
  ];
  const userData = {
    profileUrl:
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs/5e227329363657.55ef8df90a1ca.png",
    username: user.info.nameVal,
    email: user.info.emailVal,
  };
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
