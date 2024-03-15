import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from "react-native";
import React from "react";
import { useTheme } from "@/theme";
import InsightsScreen from "@/screens/Reports/InsightsTab";
import QuestionAnalysisScreen from "@/screens/Reports/QuestionAnalysisTab";
import StudentLevelScreen from "@/screens/Reports/StudentLevelTab";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
const S = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "black",
    alignItems: "center",
    marginTop: "5%",
    width: "96%",
  },
});

const TabBar = (props) => {
  const { colors, layout, fonts } = useTheme();
  return (
    <View
      style={{
        padding: "4%",
        paddingTop: "0%",
        paddingBottom: "0%",
        alignItems: "center",
      }}
    >
      <View style={[S.container]}>
        <Pressable
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            { width: "28%" },
            props.state.index !== 0 && {
              borderBottomWidth: 4,
              borderBottomColor: colors.lineBackgroundColor,
            },
          ]}
          onPress={() => {
            props.navigation.jumpTo("InsightsTab");
          }}
        >
          <Text
            style={[
              fonts.size_14,
              fonts.alignCenter,
              {
                fontWeight: props.state.index === 0 ? "700" : "500",
                color:
                  props.state.index === 0
                    ? colors.linearGradientColor
                    : colors.white,
                lineHeight: 18,
                borderBottomWidth: props.state.index === 0 ? 4 : 0,
                borderBottomColor: colors.linearGradientColor,
                width: "100%",
                paddingBottom: 5,
              },
            ]}
          >
            Insights
          </Text>
        </Pressable>
        <Pressable
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            { width: "35%" },
            props.state.index !== 1 && {
              borderBottomWidth: 4,
              borderBottomColor: colors.lineBackgroundColor,
            },
          ]}
          onPress={() => {
            props.navigation.jumpTo("QuestionAnalysisTab");
          }}
        >
          <Text
            style={[
              fonts.size_14,
              fonts.alignCenter,
              {
                fontWeight: props.state.index === 1 ? "700" : "500",
                color:
                  props.state.index === 1
                    ? colors.linearGradientColor
                    : colors.white,
                lineHeight: 18,
                borderBottomWidth: props.state.index === 1 ? 4 : 0,
                borderBottomColor: colors.linearGradientColor,
                width: "100%",
                paddingBottom: 5,
              },
            ]}
          >
            Question Analysis
          </Text>
        </Pressable>
        <Pressable
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            { width: "37%" },
            props.state.index !== 2 && {
              borderBottomWidth: 4,
              borderBottomColor: colors.lineBackgroundColor,
            },
          ]}
          onPress={() => {
            props.navigation.jumpTo("StudentLevelTab");
          }}
        >
          <Text
            style={[
              fonts.size_14,
              fonts.alignCenter,
              {
                fontWeight: props.state.index === 2 ? "700" : "500",
                color:
                  props.state.index === 2
                    ? colors.linearGradientColor
                    : colors.white,
                lineHeight: 18,
                borderBottomWidth: props.state.index === 2 ? 4 : 0,
                borderBottomColor: colors.linearGradientColor,
                width: "100%",
                paddingBottom: 5,
              },
            ]}
          >
            Student Level
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const ReportsTopTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="InsightsTab" component={InsightsScreen} />
      <Tab.Screen
        name="QuestionAnalysisTab"
        component={QuestionAnalysisScreen}
      />
      <Tab.Screen name="StudentLevelTab" component={StudentLevelScreen} />
    </Tab.Navigator>
  );
};

export default ReportsTopTabNavigator;

const styles = StyleSheet.create({});
