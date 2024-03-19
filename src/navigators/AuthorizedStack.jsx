import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ProfileDetailsScreen,
  SideBarAuthedScreen,
  SupportScreen,
  AppGuideScreen,
  NewPasswordStatusScreen,
  SubjectDetailsScreen,
  TopicWiseDetailsScreen,
  StudentWiseReportScreen,
  HomeWorkDetailsScreen,
  ClassWorkdetailsScreen,
  QuestionSolutionScreen,
  LoginScreen,
  BookmarkedQuestionsScreen,
} from "@/screens";
import TopTabNavigator from "./ReportsTopTabNavigator";
import BottomTabNavigator from "./BottomTabNavigator";

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
      drawerContent={(props) => <SideBarAuthedScreen {...props} />}
    >
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        options={{
          drawerLabelStyle: { fontWeight: "bold", fontSize: 16 },
          drawerContentContainerStyle: { paddingVertical: 20 },
        }}
      />
      <Stack.Screen
        name="TopTabNavigator"
        component={TopTabNavigator}
        options={{
          drawerLabelStyle: { fontWeight: "bold", fontSize: 16 },
          drawerContentContainerStyle: { paddingVertical: 20 },
        }}
      />
      <Stack.Screen
        name="ProfileDetailsScreen"
        component={ProfileDetailsScreen}
        options={{
          drawerLabelStyle: { fontWeight: "bold", fontSize: 16 },
          drawerContentContainerStyle: { paddingVertical: 20 },
        }}
      />
       <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          drawerLabelStyle: { fontWeight: "bold", fontSize: 16 },
          drawerContentContainerStyle: { paddingVertical: 20 },
        }}
      />
      <Stack.Screen
        name="AppGuideScreen"
        component={AppGuideScreen}
        options={{
          drawerLabelStyle: { fontWeight: "bold", fontSize: 16 },
          drawerContentContainerStyle: { paddingVertical: 20 },
        }}
      />
      <Stack.Screen
        name="SupportScreen"
        component={SupportScreen}
        options={{
          drawerLabelStyle: { fontWeight: "bold", fontSize: 16 },
          drawerContentContainerStyle: { paddingVertical: 20 },
        }}
      />
      <Stack.Screen
        name="SubjectDetailsScreen"
        component={SubjectDetailsScreen}
        options={{
          drawerLabelStyle: { fontWeight: "bold", fontSize: 16 },
          drawerContentContainerStyle: { paddingVertical: 20 },
        }}
      />
      <Stack.Screen
        name="TopicWiseDetailsScreen"
        component={TopicWiseDetailsScreen}
        options={{
          drawerLabelStyle: { fontWeight: "bold", fontSize: 16 },
          drawerContentContainerStyle: { paddingVertical: 20 },
        }}
      />
      <Stack.Screen
        name="NewPasswordStatusScreen"
        component={NewPasswordStatusScreen}
        options={{
          drawerLabelStyle: { fontWeight: "bold", fontSize: 16 },
          drawerContentContainerStyle: { paddingVertical: 20 },
        }}
      />
      <Stack.Screen
        name="StudentWiseReportScreen"
        component={StudentWiseReportScreen}
        options={{
          drawerLabelStyle: { fontWeight: "bold", fontSize: 16 },
          drawerContentContainerStyle: { paddingVertical: 20 },
        }}
      />

      <Stack.Screen
        name="HomeWorkDetailsScreen"
        component={HomeWorkDetailsScreen}
        options={{
          drawerLabelStyle: { fontWeight: "bold", fontSize: 16 },
          drawerContentContainerStyle: { paddingVertical: 20 },
        }}
      />
      <Stack.Screen
        name="ClassWorkdetailsScreen"
        component={ClassWorkdetailsScreen}
        options={{
          drawerLabelStyle: { fontWeight: "bold", fontSize: 16 },
          drawerContentContainerStyle: { paddingVertical: 20 },
        }}
      />
       <Stack.Screen
        name="QuestionSolutionScreen"
        component={QuestionSolutionScreen}
        options={{
          drawerLabelStyle: { fontWeight: "bold", fontSize: 16 },
          drawerContentContainerStyle: { paddingVertical: 20 },
        }}
      />
       <Stack.Screen
        name="BookmarkedQuestionsScreen"
        component={BookmarkedQuestionsScreen}
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
