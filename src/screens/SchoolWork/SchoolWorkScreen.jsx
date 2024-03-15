import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@/theme";
import { Header, SafeScreen } from "@/components/template";
import SchoolWorkTopTabNavigator from "@/navigators/SchoolWorkTopTabNavigator";

const SchoolWorkScreen = () => {
  const {
    colors,
    variant,
    changeTheme,
    layout,
    gutters,
    fonts,
    components,
    backgrounds,
  } = useTheme();
  return (
    <SafeScreen>
      <View style={[{ backgroundColor: colors.headerBackgroundColor }]}>
        <Header />
      </View>
      <SchoolWorkTopTabNavigator />
    </SafeScreen>
  );
};

export default SchoolWorkScreen;

const styles = StyleSheet.create({});
