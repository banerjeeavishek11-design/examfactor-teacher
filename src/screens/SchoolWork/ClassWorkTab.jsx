import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import Classwork from "@/theme/assets/images/classwork.png";
import PrimaryGradient from "@/components/template/LinearGradient/PrimaryGradient";
import Progressbar from "@/components/template/Progressbar/Progressbar";
import UpArrow from "@/theme/assets/images/uparrow.png";
import DownArrow from "@/theme/assets/images/Downarrow.png";
import Circularprogressbar from "@/components/template/CircularProgressBar/Circularprogressbar";
import { Divider } from "react-native-paper";

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

const ClassWorkTab = () => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const [expandedCards, setExpandedCards] = useState({});
  const [activatedTest, setActivatedTest] = useState(false);

  const handleActiveChapter = () => {
    setActivatedTest(true);
  };

  const toggleContent = (id) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <SafeScreen>
      <ScrollView style={[layout.paddingForFullScreen]}>
        {activatedTest === true ? (
          <>
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
                  <View
                    style={[
                      layout.display,
                      layout.rowHCenter,
                      layout.paddingForCard,
                      { paddingTop: "2%" },
                    ]}
                  >
                    <Text
                      style={[
                        fonts.size_12,
                        fonts.fontWeight_small,
                        { color: colors.backButtonColor },
                      ]}
                    >
                      Average Score
                    </Text>
                    <View style={{ width: "40%", left: 10 }}>
                      <Progressbar progress={0.5} color="#3DD598" />
                    </View>
                    <Text
                      style={[
                        fonts.size_12,
                        fonts.fontWeight_small,
                        { color: colors.white, left: 25 },
                      ]}
                    >
                      50/100
                    </Text>
                  </View>

                  {expandedCards[ele.id] ? (
                    <View>
                      <View
                        style={[
                          layout.itemsCenter,
                          layout.paddingForCard,
                          { paddingTop: "0%" },
                        ]}
                      >
                        <Divider
                          style={{
                            width: "100%",
                            backgroundColor: colors.lineBackgroundColor,
                          }}
                        />
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
                                { color: colors.white, opacity: 0.7 },
                              ]}
                            >
                              {item.name}
                            </Text>
                            <Text
                              style={[
                                fonts.size_14,
                                fonts.fontWeight_small,
                                { color: colors.white, opacity: 0.7 },
                              ]}
                            >
                              {item.progress}
                            </Text>
                            <Text
                              style={[
                                fonts.size_14,
                                fonts.fontWeight_small,
                                { color: colors.white, opacity: 0.7 },
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
                      onPress={() => console.log("first")}
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
              source={Classwork}
              resizeMode="contain"
            />
            <Text
              style={[
                fonts.size_20,
                fonts.fontWeignt_600,
                { color: colors.white, textAlign: "center" },
              ]}
            >
              Test not activated for Class Work
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
              Go to activate and activate test for class work
            </Text>
            <TouchableOpacity onPress={handleActiveChapter}>
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
                    Activate Test
                  </Text>
                </View>
              </PrimaryGradient>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeScreen>
  );
};

export default ClassWorkTab;

const styles = StyleSheet.create({
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
});
