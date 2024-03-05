import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@/theme";

const HomeScreen = () => {
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
    <View
      style={[
        backgrounds.screenBackgroundColor,
        layout.paddingForFullScreen,
        layout.flex_1,
      ]}
    >
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
