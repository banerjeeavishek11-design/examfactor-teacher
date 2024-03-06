import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { ForgotPasswordScreen, ForgotPasswordSuccessfulScreen, LandingScreen, LoginScreen } from "@/screens";

const UnAuthorizedStack = () => {
  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerStyle: {
          // width: Dimensions.get('window').width * 0.9,
          width: Dimensions.get("window").width,
        },
        swipeEnabled: false,
      }}
    >
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name="ForgotPasswordSuccessfulScreen" component={ForgotPasswordSuccessfulScreen} />
    </Drawer.Navigator>
  );
};

export default UnAuthorizedStack;

const styles = StyleSheet.create({});
