import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { theme } from "./src/components/login/theme";
import { Provider as PaperProvider } from "react-native-paper";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(true);
import { StateProvider } from "./src/redux/store/Provider";
import { initialState, reducer } from "./src/redux/reducers/LoginReducer";
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
} from "./src/screens/login";
import DormList from "./src/screens/list_screens/AllDorms";
import DormData from "./src/screens/data_get/GetPrivateDorms";
import DormDetails from "./src/screens/details/DormDetail";
import MContext from "./src/components/sideMenu/MenuContext";
import PublicDormsList from "./src/screens/list_screens/PublicDorms";
import PrivateDormsList from "./src/screens/list_screens/PrivateDorms";
import Comments from "./src/components/dormInfo/Comments";
import Profile from "./src/screens/details/Profile";
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
function MyHome() {
  return (
    <Stack.Navigator
      initialRouteName="StartScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="Dashboard" component={DormList} />
      <Stack.Screen name="DormData" component={DormData} />
      <Stack.Screen name="DormDetails" component={DormDetails} />
      <Stack.Screen name="Menu" component={MyHome} />
      <Stack.Screen name="Context" component={MContext} />
      <Stack.Screen name="PublicDorms" component={PublicDormsList} />
      <Stack.Screen name="PrivateDorms" component={PrivateDormsList} />
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <StateProvider reducer={reducer} initialValue={initialState}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Drawer.Navigator drawerContent={(props) => <MContext {...props} />}>
            <Drawer.Screen
              name="Home"
              component={MyHome}
              options={{ headerShown: false }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StateProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    marginTop: 40,
  },
});
