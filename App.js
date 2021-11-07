import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PrivateDormList from "./src/screens/list_screens/PrivateDorms.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
import DormList from "./src/screens/list_screens/PrivateDorms";
import DormData from "./src/screens/data_get/GetPrivateDorms";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <StateProvider reducer={reducer} initialValue={initialState}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
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
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StateProvider>
    /*<View style={styles.container}>
      <PrivateDormList />
      <StatusBar style="auto" />
    </View>*/
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
});
