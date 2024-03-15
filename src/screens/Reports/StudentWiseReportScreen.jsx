import {
  Image,
  LayoutAnimation,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { BarChart, Concentrix, SafeScreen } from "@/components/template";
import { ImageVariant } from "@/components/atoms";
import LeftArrow from "@/theme/assets/images/leftarrow.png";
import Arrow from "@/theme/assets/images/arrow.png";
import RightArrow from "@/theme/assets/images/rightarrow.png";
import UpFullArrow from "@/theme/assets/images/upfullarrow.png";
import { useRoute } from "@react-navigation/native";
import Progressbar from "@/components/template/Progressbar/Progressbar";
import { Divider } from "react-native-paper";

const StudentWiseReportScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { studentDetails } = route.params || {};
  console.log("studentDetails", studentDetails);
  const { colors, layout, fonts } = useTheme();
  const overallProgress = studentDetails
    ? studentDetails.progressPercentage / 100
    : 0;
  const [maxTime, setMaxTime] = useState(1000);
  const [thisWeek, setThisWeek] = useState(564);
  const [lastWeek, setLastWeek] = useState(675);
  const [peers, setPeers] = useState(1000);

  const findTimePercent = (seconds) => {
    return Math.floor((seconds / maxTime) * 100);
  };

  return (
    <SafeScreen>
      <View
        style={[
          layout.fullWidth,
          layout.paddingForFullScreen,
          {
            height: 50,
            backgroundColor: colors.headerBackgroundColor,
          },
        ]}
      >
        <TouchableOpacity
          style={[layout.display, layout.rowHCenter]}
          onPress={() => navigation.navigate("StudentLevelTab")}
        >
          <ImageVariant
            testID="brand-img"
            style={{
              width: 10,
              height: 11,
              tintColor: colors.backButtonColor,
              top: 3,
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
            Back
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: "10%" }}>
        <View style={[layout.paddingForFullScreen]}>
          <Text
            style={[
              fonts.size_14,
              fonts.bold,
              { color: colors.white, opacity: 0.5 },
            ]}
          >
            {`${studentDetails?.name}'S REPORT`}
          </Text>
          <View
            style={[
              layout.fullWidth,
              layout.paddingForCard,
              {
                backgroundColor: colors.cardBackgroundColor,
                height: "auto",
                borderRadius: 12,
                marginTop: "4%",
              },
            ]}
          >
            <View style={{ marginTop: "1%", alignItems: "center" }}>
              <Concentrix scorePercentage={studentDetails.achievableScore} />
            </View>
            <View style={[layout.itemsCenter, { marginTop: "-20%" }]}>
              <Divider
                style={{
                  width: "100%",
                  backgroundColor: colors.lineBackgroundColor,
                }}
              />
            </View>
            <View
              style={[
                layout.display,
                layout.rowHCenter,
                layout.justifyBetween,
                { marginTop: "5%" },
              ]}
            >
              <Text
                style={[
                  fonts.size_12,
                  fonts.fontWeight_small,
                  { color: colors.white },
                ]}
              >
                Overall Progress
              </Text>
              <Text
                style={[
                  fonts.size_12,
                  fonts.fontWeight_small,
                  { color: colors.white },
                ]}
              >
                {`${studentDetails.progressPercentage}% complete`}
              </Text>
            </View>
            <View style={{ marginTop: "3%" }}>
              <Progressbar progress={overallProgress} color={"#3DD598"} />
            </View>
          </View>
          <BarChart />
          <View
            style={[
              layout.display,
              layout.rowHCenter,
              layout.justifyBetween,
              { marginTop: "8%" },
            ]}
          >
            <Text
              style={[
                fonts.size_14,
                fonts.bold,
                { color: colors.white, opacity: 0.4 },
              ]}
            >
              HOME WORK INSIGHTS
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("HomeWorkDetailsScreen",{studentDetails:studentDetails})}
            >
              <Text
                style={[
                  fonts.size_14,
                  fonts.bold,
                  { color: colors.termsLinkColor },
                ]}
              >
                SEE DETAILS
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              layout.fullWidth,
              layout.paddingForCard,
              {
                backgroundColor: colors.cardBackgroundColor,
                borderRadius: 14,
                height: "auto",
                marginTop: "4%",
              },
            ]}
          >
            <View
              style={[layout.display, layout.rowHCenter, layout.justifyBetween]}
            >
              <Text
                style={[
                  fonts.size_14,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.7 },
                ]}
              >
                Number of chapters covered
              </Text>
              <Text
                style={[
                  fonts.size_14,
                  fonts.fontWeight_small,
                  { color: colors.white },
                ]}
              >
                3/5
              </Text>
            </View>
            <View style={[layout.itemsCenter, { marginTop: "2%" }]}>
              <Divider
                style={{
                  width: "100%",
                  backgroundColor: colors.lineBackgroundColor,
                }}
              />
            </View>
            <View
              style={[
                layout.display,
                layout.rowHCenter,
                layout.justifyBetween,
                { marginTop: "2%" },
              ]}
            >
              <Text
                style={[
                  fonts.size_14,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.7 },
                ]}
              >
                Strong areas
              </Text>
              <Text
                style={[
                  fonts.size_14,
                  fonts.fontWeight_small,
                  { color: colors.white },
                ]}
              >
                18
              </Text>
            </View>
            <View style={[layout.itemsCenter, { marginTop: "2%" }]}>
              <Divider
                style={{
                  width: "100%",
                  backgroundColor: colors.lineBackgroundColor,
                }}
              />
            </View>
            <View
              style={[
                layout.display,
                layout.rowHCenter,
                layout.justifyBetween,
                { marginTop: "2%" },
              ]}
            >
              <Text
                style={[
                  fonts.size_14,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.7 },
                ]}
              >
                Weak areas
              </Text>
              <Text
                style={[
                  fonts.size_14,
                  fonts.fontWeight_small,
                  { color: colors.white },
                ]}
              >
                06
              </Text>
            </View>
            <View style={[layout.itemsCenter, { marginTop: "2%" }]}>
              <Divider
                style={{
                  width: "100%",
                  backgroundColor: colors.lineBackgroundColor,
                }}
              />
            </View>
          </View>

          <View
            style={[
              layout.fullWidth,
              layout.autoHeight,
              layout.paddingForCard,
              {
                backgroundColor: colors.cardBackgroundColor,
                marginTop: "4%",
                borderRadius: 14,
              },
            ]}
          >
            <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
              Time spent
            </Text>

            <View
              style={[layout.display, layout.rowHCenter, { marginTop: "3%" }]}
            >
              <ImageVariant
                testID="brand-img"
                style={{
                  width: 15,
                  height: 12,
                  tintColor: "#3DD598",
                }}
                source={UpFullArrow}
                resizeMode="contain"
              />
              <Text
                style={[
                  fonts.size_12,
                  fonts.fontWeight_small,
                  {
                    color: "#3DD598",
                    top: 2,
                    marginLeft: "1%",
                  },
                ]}
              >
                44% down from previous week
              </Text>
            </View>
            <View
              style={[layout.display, layout.rowHCenter, { marginTop: "3%" }]}
            >
              <Text
                style={[
                  fonts.size_14,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.6 },
                ]}
              >
                This week
              </Text>
              <View
                style={[
                  layout.row,
                  layout.itemsCenter,
                  {
                    marginLeft: "4%",
                    width: "60%",
                  },
                ]}
              >
                <View
                  style={[
                    styles.timeLine1,
                    { width: `${findTimePercent(thisWeek)}%` },
                  ]}
                />
                <Text
                  style={[
                    fonts.size_12,
                    fonts.fontWeight_small,
                    { color: colors.white, marginLeft: "3%" },
                  ]}
                >
                  {/* {formatSecond2(thisWeek)} */} 1h 05m
                </Text>
              </View>
            </View>

            <View
              style={[layout.display, layout.rowHCenter, { marginTop: "3%" }]}
            >
              <Text
                style={[
                  fonts.size_14,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.6 },
                ]}
              >
                Last week
              </Text>
              <View
                style={{
                  marginLeft: "4%",
                  width: "60%",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={[
                    styles.timeLine2,
                    { width: `${findTimePercent(lastWeek)}%` },
                  ]}
                />
                <Text
                  style={[
                    fonts.size_12,
                    fonts.fontWeight_small,
                    { color: colors.white, marginLeft: "3%" },
                  ]}
                >
                  {/* {formatSecond2(lastWeek)} */} 1h 50m
                </Text>
              </View>
            </View>

            <View
              style={[layout.display, layout.rowHCenter, { marginTop: "3%" }]}
            >
              <Text
                style={[
                  fonts.size_12,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.6 },
                ]}
              >
                Peers
              </Text>
              <View
                style={{
                  marginLeft: "13%",
                  width: "60%",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={[
                    styles.timeLine3,
                    { width: `${findTimePercent(peers)}%` },
                  ]}
                />
                <Text
                  style={[
                    fonts.size_14,
                    fonts.fontWeight_small,
                    {
                      color: colors.white,
                      marginLeft: "3%",
                    },
                  ]}
                >
                  {/* {formatSecond2(peers)} */} 2h 15m
                </Text>
              </View>
            </View>
          </View>

          <View
            style={[
              layout.display,
              layout.rowHCenter,
              layout.justifyBetween,
              { marginTop: "8%" },
            ]}
          >
            <Text
              style={[
                fonts.size_14,
                fonts.bold,
                { color: colors.white, opacity: 0.4 },
              ]}
            >
              CLASS WORK INSIGHTS
            </Text>
            <TouchableOpacity
            onPress={() => navigation.navigate("ClassWorkdetailsScreen",{studentDetails:studentDetails})}
            >
              <Text
                style={[
                  fonts.size_14,
                  fonts.bold,
                  { color: colors.termsLinkColor },
                ]}
              >
                SEE DETAILS
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              layout.fullWidth,
              layout.paddingForCard,
              {
                backgroundColor: colors.cardBackgroundColor,
                borderRadius: 14,
                height: "auto",
                marginTop: "4%",
              },
            ]}
          >
            <View
              style={[layout.display, layout.rowHCenter, layout.justifyBetween]}
            >
              <Text
                style={[
                  fonts.size_14,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.7 },
                ]}
              >
                Number of test taken
              </Text>
              <Text
                style={[
                  fonts.size_14,
                  fonts.fontWeight_small,
                  { color: colors.white },
                ]}
              >
                24
              </Text>
            </View>
            <View style={[layout.itemsCenter, { marginTop: "2%" }]}>
              <Divider
                style={{
                  width: "100%",
                  backgroundColor: colors.lineBackgroundColor,
                }}
              />
            </View>
            <View
              style={[
                layout.display,
                layout.rowHCenter,
                layout.justifyBetween,
                { marginTop: "2%" },
              ]}
            >
              <Text
                style={[
                  fonts.size_14,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.7 },
                ]}
              >
                Accuracy percentage
              </Text>
              <Text
                style={[
                  fonts.size_14,
                  fonts.fontWeight_small,
                  { color: colors.white },
                ]}
              >
                55%
              </Text>
            </View>
            <View style={[layout.itemsCenter, { marginTop: "2%" }]}>
              <Divider
                style={{
                  width: "100%",
                  backgroundColor: colors.lineBackgroundColor,
                }}
              />
            </View>
          </View>

          <Pressable
            style={[
              layout.fullWidth,
              layout.paddingForCard,
              {
                backgroundColor: colors.cardBackgroundColor,
                height: 53,
                borderRadius: 8,
                marginTop: "3%",
              },
            ]}
            // onPress={() => goToStudentWiseReportScreen(ele)}
          >
            <View
              style={[layout.display, layout.rowHCenter, layout.justifyBetween]}
            >
              <Text
                style={[
                  fonts.size_14,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.7 },
                ]}
              >
                See bookmarked questions (18)
              </Text>
              <TouchableOpacity>
                <Image
                  source={RightArrow}
                  resizeMode="contain"
                  style={{
                    width: 16,
                    height: 10,
                    tintColor: colors.termsLinkColor,
                  }}
                />
              </TouchableOpacity>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default StudentWiseReportScreen;

const styles = StyleSheet.create({
  timeLine1: {
    height: 8,
    backgroundColor: "#3DD598",
    borderRadius: 6,
  },
  timeLine2: {
    height: 8,
    backgroundColor: "#FFAB48",
    borderRadius: 6,
  },
  timeLine3: {
    height: 8,
    backgroundColor: "#B557FF",
    borderRadius: 6,
  },
});
