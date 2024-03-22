import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";
import Circularprogressbar from "@/components/template/CircularProgressBar/Circularprogressbar";
import Progressbar from "@/components/template/Progressbar/Progressbar";
import UpArrow from "@/theme/assets/images/uparrow.png";
import DownArrow from "@/theme/assets/images/Downarrow.png";
import ActivatedHomeWork from "@/theme/assets/images/homework.png";
import { Divider } from "react-native-paper";
import RemindStudentBottomSheet from "@/components/BottomSheet/SchoolWork/RemindStudentBottomSheet";
import { useRoute, useNavigation } from "@react-navigation/native";
import PrimaryGradient from "@/components/template/LinearGradient/PrimaryGradient";
import { ImageVariant } from "@/components/atoms";

const topic = [
  {
    id: 1,
    topicName: "Introduction to Motion",
    subTitle: "Students completed the homework",
    progress: 60,
  },
  {
    id: 2,
    topicName: "Rate of Motion",
    subTitle: "Based on concepts covered till date",
    progress: 65,
  },
  {
    id: 3,
    topicName: "Rate of Change of Velocity",
    subTitle: "Rate of Change of Velocity",
    progress: 50,
  },
];

const leaderboardData = [
  { name: "Rahul K.", progress: 88, achievable: 87 },
  { name: "Sanya M.", progress: 85, achievable: 81 },
  { name: "Karan K.", progress: 74, achievable: 78 },
  { name: "Piyush K.", progress: 81, achievable: 87 },
  { name: "Anmol S.", progress: 78, achievable: 84 },
];

const HomeWorkTab = () => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const [expandedCards, setExpandedCards] = useState({});
  const [openRemindStudentBottomSheet, setOpenRemindStudentBottomSheet] =
    useState(false);
  const [activatedHomeWork, setActivatedHomeWork] = useState(false);

  const toggleContent = (id) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleActiveHomework = () => {
    setActivatedHomeWork(true);
  };

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={[layout.paddingForFullScreen, {}]}>
        {activatedHomeWork === true ? (
          <>
            <Text
              style={[
                fonts.size_14,
                fonts.bold,
                { color: colors.white, opacity: 0.4 },
              ]}
            >
              Last 7 Days Assigned homework
            </Text>
            {topic.map((ele) => {
              const progressPercentage = ele.progress / 100;
              return (
                <View
                  key={ele.topicName}
                  style={[
                    layout.fullWidth,
                    {
                      backgroundColor: colors.cardBackgroundColor,
                      height: expandedCards[ele.id] ? "auto" : 130,
                      borderRadius: 14,
                      marginTop: "3%",
                    },
                  ]}
                >
                  <View
                    style={[
                      layout.display,
                      layout.rowHCenter,
                      layout.justifyBetween,
                      layout.paddingForCard,
                      { paddingBottom: "0%" },
                    ]}
                  >
                    <View style={{ width: "55%" }}>
                      <Text
                        numberOfLines={2}
                        style={[
                          fonts.size_14,
                          fonts.bold,
                          { color: colors.white, top: -6 },
                        ]}
                      >
                        {ele.topicName}
                      </Text>
                      <Text
                        style={[
                          fonts.size_10,
                          fonts.fontWeight_small,
                          { color: colors.backButtonColor, marginBottom: "5%" },
                        ]}
                      >
                        {ele.subTitle}
                      </Text>
                    </View>
                    <View style={{ width: "20%", top: -5 }}>
                      <Circularprogressbar progress={ele.progress} />
                    </View>
                    <View style={{ width: "5%" }}>
                      <TouchableOpacity onPress={() => toggleContent(ele.id)}>
                        {expandedCards[ele.id] ? (
                          <Image
                            style={{ width: 12, height: 8 }}
                            source={UpArrow}
                            resizeMode="contain"
                          />
                        ) : (
                          <Image
                            style={{ width: 12, height: 8 }}
                            source={DownArrow}
                            resizeMode="contain"
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={[layout.paddingForCard, { paddingTop: "0%" }]}>
                    <TouchableOpacity
                      onPress={() => setOpenRemindStudentBottomSheet(true)}
                    >
                      <Text
                        style={[
                          fonts.size_12,
                          fonts.fontWeignt_600,
                          {
                            color: colors.termsLinkColor,
                            textDecorationLine: "underline",
                          },
                        ]}
                      >
                        Remind Students
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {expandedCards[ele.id] ? (
                    <View>
                      <View
                        style={[layout.paddingForCard, { paddingTop: "0%" }]}
                      >
                        <Text
                          style={[
                            fonts.size_12,
                            fonts.fontWeight_small,
                            {
                              color: "#7A7A82",
                            },
                          ]}
                        >
                          Reminded on Aug 28, 2023
                        </Text>
                        <View style={[layout.itemsCenter]}>
                          <Divider
                            style={{
                              width: "100%",
                              backgroundColor: colors.lineBackgroundColor,
                            }}
                          />
                        </View>
                      </View>
                      <View>
                        <View style={styles.header}>
                          <Text
                            style={[
                              fonts.size_14,
                              fonts.bold,
                              { color: colors.white },
                            ]}
                          >
                            Name
                          </Text>
                          <Text
                            style={[
                              fonts.size_14,
                              fonts.bold,
                              { color: colors.white },
                            ]}
                          >
                            Progress
                          </Text>
                          <Text
                            style={[
                              fonts.size_14,
                              fonts.bold,
                              { color: colors.white },
                            ]}
                          >
                            Achievable
                          </Text>
                        </View>
                        {leaderboardData.map((item, index) => (
                          <View
                            key={index}
                            style={[
                              styles.row,
                              index % 2 === 0 ? styles.evenRow : styles.oddRow,
                              index === leaderboardData.length - 1 &&
                                styles.lastRow,
                            ]}
                          >
                            <Text
                              style={[
                                fonts.size_14,
                                fonts.fontWeight_small,
                                { color: colors.white,opacity:0.7},
                              ]}
                            >
                              {item.name}
                            </Text>
                            <Text
                              style={[
                                fonts.size_14,
                                fonts.fontWeight_small,
                                { color: colors.white,opacity:0.7},
                              ]}
                            >
                              {item.progress}
                            </Text>
                            <Text
                              style={[
                                fonts.size_14,
                                fonts.fontWeight_small,
                                { color: colors.white,opacity:0.7},
                              ]}
                            >
                              {item.achievable}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : null}
                  {expandedCards[ele.id] && (
                    <TouchableOpacity
                      style={{ marginTop: "4%", marginBottom: "4%" }}
                    >
                      <Text
                        style={[
                          fonts.size_14,
                          fonts.fontWeignt_600,
                          fonts.alignCenter,
                          { color: colors.termsLinkColor },
                        ]}
                      >
                        See More
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </>
        ) : (
          <View
            style={[
              layout.fullWidth,
              {
                height: 500,
                backgroundColor: colors.cardBackgroundColor,
                borderRadius: 13,
                alignItems: "center",
              },
            ]}
          >
            <Image
              style={{ width: 230, height: 230, marginTop: "4%" }}
              source={ActivatedHomeWork}
              resizeMode="contain"
            />
            <Text
              style={[
                fonts.size_20,
                fonts.fontWeignt_600,
                { color: colors.white },
              ]}
            >
              Home Work not assigned
            </Text>
            <Text
              style={[
                fonts.size_14,
                fonts.fontWeignt_600,
                {
                  color: colors.white,
                  opacity: 0.4,
                  textAlign: "center",
                  width: "70%",
                },
              ]}
            >
              Go to activate and assign Home Work for students at first
            </Text>
            <TouchableOpacity onPress={handleActiveHomework}>
              <PrimaryGradient
                styleProp={[styles.loginButton, layout.justifyCenter]}
              >
                <View style={[layout.display, layout.rowHCenter]}>
                  <Text
                    style={[
                      fonts.size_16,
                      fonts.bold,
                      { color: colors.loginBtnTextColor },
                    ]}
                  >
                    Activate Home Work
                  </Text>
                </View>
              </PrimaryGradient>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <RemindStudentBottomSheet
        setOpenRemindStudentBottomSheet={setOpenRemindStudentBottomSheet}
        openRemindStudentBottomSheet={openRemindStudentBottomSheet}
      />
    </SafeScreen>
  );
};

export default HomeWorkTab;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "4%",
    paddingRight: "4%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 45,
    paddingLeft: "4%",
    paddingRight: "4%",
    marginTop: "2%",
  },
  evenRow: {
    backgroundColor: "#2C2C39",
  },
  oddRow: {
    backgroundColor: "#222230",
  },
  loginButton: {
    height: 48,
    width: "100%",
    borderRadius: 9,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
  },
});
