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
import Diagnostic from "@/theme/assets/images/diagnostic.png";
import PrimaryGradient from "@/components/template/LinearGradient/PrimaryGradient";
import Circularprogressbar from "@/components/template/CircularProgressBar/Circularprogressbar";
import Progressbar from "@/components/template/Progressbar/Progressbar";
import UpArrow from "@/theme/assets/images/uparrow.png";
import DownArrow from "@/theme/assets/images/Downarrow.png";
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
  { name: "Rahul K. ", progress: "Yes", achievable: 5 },
  { name: "Sanya M.", progress: "No", achievable: 10 },
  { name: "Karan K.", progress: "Yes", achievable: 11 },
  { name: "Piyush K.", progress: "No", achievable: 7 },
  { name: "Anmol S.", progress: "Yes", achievable: 9 },
];

const DiagnosticTab = () => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const [expandedCards, setExpandedCards] = useState({});
  const [activatedChapter, setActivatedChapter] = useState(false);

  const handleActiveChapter = () => {
    setActivatedChapter(true);
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
        {activatedChapter === true ? (
          <>
            {topic.map((ele) => {
              const progressPercentage = ele.progress / 100;
              return (
                <TouchableOpacity onPress={() => toggleContent(ele.id)}
                  key={ele.topicName}
                  style={[
                    layout.fullWidth,
                    {
                      backgroundColor: colors.cardBackgroundColor,
                      height: expandedCards[ele.id] ? "auto" : 80,
                      borderRadius: 14,
                      marginTop: "4%",
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
                    <View style={{ width: "65%" }}>
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
                      <View
                        style={[
                          layout.display,
                          layout.rowHCenter,
                          layout.justifyBetween,
                        ]}
                      >
                        <Text
                          style={[
                            fonts.size_12,
                            fonts.fontWeight_small,
                            { color: colors.backButtonColor },
                          ]}
                        >
                          No. of Students
                        </Text>
                        <View style={{ width: "70%", left: 10 }}>
                          <Progressbar progress={0.8} color="#3DD598" />
                        </View>
                        <Text
                          style={[
                            fonts.size_12,
                            fonts.fontWeight_small,
                            { color: colors.white, left: 20 },
                          ]}
                        >
                          22/30
                        </Text>
                      </View>
                    </View>
                    <View style={{ width: "5%" }}>
                      <TouchableOpacity>
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

                  

                  {expandedCards[ele.id] ? (
                    <View>
                      <View style={[layout.itemsCenter, layout.paddingForCard]}>
                    <Divider
                      style={{
                        width: "100%",
                        backgroundColor: colors.lineBackgroundColor,
                      }}
                    />
                  </View>
                      <View>
                        <View style={styles.header}>
                          <View style={{ width: "30%" }}>
                            <Text
                              style={[
                                fonts.size_14,
                                fonts.bold,
                                { color: colors.white },
                              ]}
                            >
                              Name
                            </Text>
                          </View>
                          <View style={{ width: "40%" }}>
                            <Text
                              style={[
                                fonts.size_14,
                                fonts.bold,
                                { color: colors.white },
                              ]}
                            >
                              Diagnostic Completed
                            </Text>
                          </View>
                          <View style={{ width: "30%" }}>
                            <Text
                              style={[
                                fonts.size_14,
                                fonts.bold,
                                { color: colors.white },
                              ]}
                            >
                              No. of Weak Subtopics
                            </Text>
                          </View>
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
                            <View
                              style={{
                                width: "30%",
                              }}
                            >
                              <Text
                                numberOfLines={1}
                                style={[
                                  fonts.size_14,
                                  fonts.fontWeight_small,
                                  { color: colors.white, opacity: 0.7 },
                                ]}
                              >
                                {item.name}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: "40%",
                              }}
                            >
                              <Text
                                numberOfLines={1}
                                style={[
                                  fonts.size_14,
                                  fonts.fontWeight_small,
                                  {
                                    color: colors.white,
                                    opacity: 0.7,
                                  },
                                ]}
                              >
                                {item.progress}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: "30%",
                              }}
                            >
                              <Text
                                numberOfLines={1}
                                style={[
                                  fonts.size_14,
                                  fonts.fontWeight_small,
                                  { color: colors.white, opacity: 0.7 },
                                ]}
                              >
                                {item.achievable}
                              </Text>
                              
                            </View>
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
                </TouchableOpacity>
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
              source={Diagnostic}
              resizeMode="contain"
            />
            <Text
              style={[
                fonts.size_20,
                fonts.fontWeignt_600,
                { color: colors.white, textAlign: "center" },
              ]}
            >
              Chapter not assigned for Diagnostic
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
              Go to activate and assign Diagnostic for students at first
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
                    Activate Chapter
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

export default DiagnosticTab;

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
    width: "100%",
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
