import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@/theme";
import { Header, SafeScreen } from "@/components/template";
import ReportsTopTabNavigator from "@/navigators/ReportsTopTabNavigator";

const ReportsScreen = ({}) => {
  const { colors } = useTheme();

  return (
    <SafeScreen>
      <View style={[{ backgroundColor: colors.headerBackgroundColor }]}>
        <Header />
      </View>
      <ReportsTopTabNavigator />
    </SafeScreen>
  );
};

export default ReportsScreen;

const styles = StyleSheet.create({});
