import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@/theme";
import { Header, SafeScreen } from "@/components/template";

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
    <SafeScreen>
      <View style={[{backgroundColor:colors.headerBackgroundColor}]}>
        <Header/>
      </View>
    </SafeScreen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
