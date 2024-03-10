import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CircularProgress from "react-native-circular-progress-indicator";
import { useTheme } from "@/theme";

const Circularprogressbar = (props) => {
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

  const { alignment, progress } = props;

  const getAlignment = () => {
    if (alignment === "right") {
      return "end";
    } else if (alignment === "left") {
      return "start";
    } else {
      return "middle";
    }
  };

  return (
    <View> 
      <CircularProgress
        value={progress}
        radius={40}
        progressValueColor={"#ecf0f1"}
        activeStrokeColor={"#3DD598"}
        inActiveStrokeColor="#474752"
        inActiveStrokeOpacity={0.4}
        // inActiveStrokeWidth={20}
        valueSuffix={"/ 100"}
        progressValueStyle={{ fontSize: 12 }}
        //   activeStrokeWidth={40}
      />
    </View>
  );
};

export default Circularprogressbar;

const styles = StyleSheet.create({});
