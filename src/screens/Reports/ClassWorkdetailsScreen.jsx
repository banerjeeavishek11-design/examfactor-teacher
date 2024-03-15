import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeScreen } from "@/components/template";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@/theme";
import { ImageVariant } from "@/components/atoms";
import LeftArrow from "@/theme/assets/images/leftarrow.png";

const subjectWiseDetails = [
  {
    id: 1,
    subjectName: "Science  -  Thermodynamics",
    completedDate: "Completed on May 5, 2023",
    accuracy: "82%",
    score: "80",
  },
  {
    id: 2,
    subjectName: "Science  -  Biology",
    completedDate: "Completed on May 5, 2023",
    accuracy: "82%",
    score: "80",
  },
  {
    id: 3,
    subjectName: "Science  -  Mathematics",
    completedDate: "Completed on May 5, 2023",
    accuracy: "82%",
    score: "80",
  },
  {
    id: 4,
    subjectName: "Science  -  Physics",
    completedDate: "Completed on May 5, 2023",
    accuracy: "82%",
    score: "80",
  },
  {
    id: 5,
    subjectName: "Science  -  Chemistry",
    completedDate: "Completed on May 5, 2023",
    accuracy: "82%",
    score: "80",
  },
];

const ClassWorkdetailsScreen = () => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
    const { studentDetails } = route.params || {};

  return (
    <SafeScreen>
      <View style={[layout.fullWidth, layout.paddingForFullScreen]}>
        <TouchableOpacity
          style={[layout.display, layout.rowHCenter, { paddingBottom: "1%" }]}
          onPress={() =>
            navigation.navigate("StudentWiseReportScreen", {
              studentDetails: studentDetails,
            })
          }
        >
          <ImageVariant
            testID="brand-img"
            style={{
              width: 10,
              height: 11,
              tintColor: colors.backButtonColor,
              top: -2,
            }}
            source={LeftArrow}
            resizeMode="contain"
          />
          <Text
            style={[
              fonts.size_16,
              fonts.bold,
              { color: colors.backButtonColor, left: 5 },
            ]}
          >
            CLASS WORK INSIGHTS
          </Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={{paddingBottom:'10%'}}>
          <Text
            style={[
              fonts.size_14,
              fonts.bold,
              { color: colors.white, opacity: 0.6 },
            ]}
          >
            PHYSICS DIAGNOSTIC KIT
          </Text>
          {subjectWiseDetails.map((ele) => {
            return (
              <View
                key={ele.id}
                style={[
                  layout.fullWidth,
                  layout.paddingForCard,
                  {
                    height: 200,
                    backgroundColor: colors.cardBackgroundColor,
                    borderRadius: 12,
                    marginTop: "4%",
                  },
                ]}
              >
                <Text
                  style={[fonts.size_14, fonts.bold, { color: colors.white }]}
                >
                  {ele.subjectName}
                </Text>
                <Text
                  style={[
                    fonts.size_12,
                    fonts.fontWeight_small,
                    {
                      color: colors.white,
                      fontFamily: "Poppins-Italic",
                      opacity: 0.7,
                    },
                  ]}
                >
                  {ele.completedDate}
                </Text>
                <View style={styles.box}>
                  <View
                    style={[
                      layout.display,
                      layout.row,
                      layout.justifyBetween,
                      { paddingHorizontal: 10, top: "4%" },
                    ]}
                  >
                    <Text
                      style={[
                        fonts.size_14,
                        fonts.fontWeight_small,
                        { color: colors.white, opacity: 0.6 },
                      ]}
                    >
                      Accuracy Percentage
                    </Text>
                    <Text
                      style={[
                        fonts.size_14,
                        fonts.fontWeight_small,
                        { color: colors.white },
                      ]}
                    >
                     {ele.accuracy}
                    </Text>
                  </View>
                  <View style={styles.line} />
                  <View
                    style={[
                      layout.display,
                      layout.row,
                      layout.justifyBetween,
                      { paddingHorizontal: 10, top: "13%" },
                    ]}
                  >
                    <Text
                      style={[
                        fonts.size_14,
                        fonts.fontWeight_small,
                        { color: colors.white, opacity: 0.6 },
                      ]}
                    >
                      Score
                    </Text>
                    <Text
                      style={[
                        fonts.size_14,
                        fonts.fontWeight_small,
                        { color: colors.white },
                      ]}
                    >
                      {`${ele.score}/100`}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeScreen>
  );
};

export default ClassWorkdetailsScreen;

const styles = StyleSheet.create({
  box: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    position: "relative",
    marginTop: "5%",
  },
  line: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    marginHorizontal: -1,
  },
});
