import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useTheme } from "@/theme";
import { Header, SafeScreen } from "@/components/template";
import InsightsScreen from "./InsightsScreen";
import QuestionAnalysisScreen from "./QuestionAnalysisScreen";

const selectedScreen = "questionAnalysis"

const ReportsScreen = () => {
  const { colors } = useTheme();

  return (
    <SafeScreen>
      <View style={[{ backgroundColor: colors.headerBackgroundColor }]}>
        <Header />
      </View>
      {
        selectedScreen === "insights" ? <InsightsScreen /> : null
      }
      {
        selectedScreen === "questionAnalysis" ? <QuestionAnalysisScreen/> : null
      }
    </SafeScreen>
  );
};

export default ReportsScreen;

const styles = StyleSheet.create({});
