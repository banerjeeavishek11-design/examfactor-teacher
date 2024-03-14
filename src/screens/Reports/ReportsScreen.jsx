import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@/theme";
import { Header, SafeScreen } from "@/components/template";
import TopTabNavigator from "@/navigators/TopTabNavigator";

const ReportsScreen = ({}) => {
  const { colors } = useTheme();

  return (
    <SafeScreen>
      <View style={[{ backgroundColor: colors.headerBackgroundColor }]}>
        <Header />
      </View>
      {/* {
        selectedScreen === "insights" ? <InsightsScreen /> : null
      }
      {
        selectedScreen === "questionAnalysis" ? <QuestionAnalysisScreen/> : null
      } */}
      <TopTabNavigator />
    </SafeScreen>
  );
};

export default ReportsScreen;

const styles = StyleSheet.create({});
