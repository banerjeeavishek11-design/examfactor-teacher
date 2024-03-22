// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const BarChartsCarousel = () => {
//   return (
//     <View>
//       <Text>BarChartsCarousel</Text>
//     </View>
//   )
// }

// export default BarChartsCarousel

// const styles = StyleSheet.create({})

import {
  View,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import React from "react";

import { useIsFocused } from "@react-navigation/native";
import { notifyMessage } from "../../utils/error-toast-API";
import { useTheme } from "@/theme";
import GradientBarChart from "./BarChart";


// const SLIDER_WIDTH = Dimensions.get("window").width;
// const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
const { width } = Dimensions.get("window");
const ITEM_LENGTH = width * 0.92;

const BarChartsCarousel = ({ refresh, setSelectedSubjectCode }) => {
  // const isFocused = useIsFocused();
  const [subjectData, setSubjectData] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);


  const data = ["03", "06", "09", "12"];
  const barchartColor = ["#7AF4FC", "#27D4FA"];
  const width = 300;
  const height = 250;
  const borderRadius = 5;
  const xAxisTitle = "Achievable Score (%)";
  const yAxisTitle = "No. of students";

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

  React.useEffect(() => {}, [selectedIndex]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          return (
            <View
              key={index}
              style={{
                width: ITEM_LENGTH,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <GradientBarChart item={data} /> */}
            </View>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, i) => `${i}-${Math.random()}`}
        pagingEnabled
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / ITEM_LENGTH
          );
          setSelectedIndex(newIndex);
        }}
      />
      <View
        style={[layout.rowHCenter, layout.justifyCenter, styles.pagination]}
      >
        {data.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                marginTop: 10,
                width: selectedIndex == index ? 20 : 8,
                height: selectedIndex == index ? 10 : 8,
                borderRadius: selectedIndex == index ? 5 : 4,
                backgroundColor: selectedIndex == index ? "#FFFFFF" : "gray",
                marginLeft: 5,
              }}
            ></View>
          );
        })}
      </View>
    </View>
  );
};

export default BarChartsCarousel;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
    marginBottom: "10%",
  },
});
