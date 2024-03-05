import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import BottomtabNavigator from "./BottomtabNavigator";

const AuthorizedStack = () => {
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
      <Stack.Screen
        name="BottomtabNavigator"
        component={BottomtabNavigator}
        options={{
          drawerLabelStyle: { fontWeight: "bold", fontSize: 16 },
          drawerContentContainerStyle: { paddingVertical: 20 },
        }}
      />
    </Drawer.Navigator>
  );
};

export default AuthorizedStack;

const styles = StyleSheet.create({});
