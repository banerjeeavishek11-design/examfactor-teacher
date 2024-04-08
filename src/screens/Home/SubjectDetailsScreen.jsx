import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";
import { ImageVariant } from "@/components/atoms";
import LeftArrow from "@/theme/assets/images/leftarrow.png";
import { Searchbar } from "react-native-paper";
import Cross from "@/theme/assets/images/cross.png";
import Search from "@/theme/assets/images/search.png";
import Circularprogressbar from "@/components/template/CircularProgressBar/Circularprogressbar";
import LinearGradient from "react-native-linear-gradient";
import RightArrow from "@/theme/assets/images/rightarrow.png";
import Progressbar from "@/components/template/Progressbar/Progressbar";

const chapters = [
  {
    id: 1,
    chapterName: "C1: Rate of Change of Velocity",
    achievableScore: 70,
    progressPercentage: 75,
    activatedTopic: "05",
    subTitle: "Progress is calculated based on the activated topics.",
  },
  {
    id: 2,
    chapterName: "C2: Motion",
    achievableScore: 70,
    progressPercentage: 60,
    activatedTopic: "05",
    subTitle: "Progress is calculated based on the activated topics.",
  },
  {
    id: 3,
    chapterName: "C3: Force and Laws of Motion",
    achievableScore: 70,
    progressPercentage: 50,
    activatedTopic: "05",
    subTitle: "Progress is calculated based on the activated topics.",
  },
  {
    id: 4,
    chapterName: "C4: Gravitation",
    achievableScore: 70,
    progressPercentage: 45,
    activatedTopic: "05",
    subTitle: "Progress is calculated based on the activated topics.",
  },
];

const SubjectDetailsScreen = () => {
  const { colors, variant, changeTheme, layout, gutters, fonts, components, backgrounds } =
    useTheme();
  const navigation = useNavigation();
  const [searchChapterName, setSearchChapterName] = useState([]);

  const goToTopicWiseDetailsScreen = (chapterName, progress) => {
    navigation.navigate("TopicWiseDetailsScreen", {
      topicName: chapterName,
      progress: progress,
    });
  };

  useEffect(() => {
    setSearchChapterName(chapters);
  }, []);

  const onSearchChapters = (search) => {
    const searchItem = chapters.filter((ele) =>
      ele.chapterName.toLowerCase().includes(search.toLowerCase())
    );
    setSearchChapterName(searchItem);
  };

  return (
    <SafeScreen>
      <View
        style={[
          layout.fullWidth,
          layout.paddingForFullScreen,
          {
            height: 127,
            backgroundColor: colors.headerBackgroundColor,
          },
        ]}
      >
        <TouchableOpacity
          style={[layout.display, layout.rowHCenter]}
          onPress={() => navigation.goBack()}
        >
          <ImageVariant
            testID="brand-img"
            style={{ width: 10, height: 11, tintColor: colors.backButtonColor }}
            source={LeftArrow}
            resizeMode="contain"
          />
          <Text style={[fonts.size_16, fonts.bold, { color: colors.backButtonColor, left: 5 }]}>
            Physics
          </Text>
        </TouchableOpacity>
        <View style={{ width: "100%", marginTop: "4%" }}>
          <Searchbar
            placeholder="Search Chapters"
            placeholderTextColor="rgba(275, 275, 275, 0.5)"
            iconColor="rgba(275, 275, 275, 0.5)"
            inputStyle={[
              fonts.size_14,
              fonts.fontWeignt_600,
              { color: colors.white, right: 10 },
            ]}
            icon={() => (
              <Image
                source={Search}
                resizeMode="contain"
                style={{ width: 14, height: 14 }}
              />
            )}
            onChangeText={onSearchChapters}
            style={{
              backgroundColor: "#09070E",
              borderColor: "rgba(275, 275, 275, 0.5)",
              borderWidth: 1,
              borderRadius: 8,
              // fontSize: 20,
            }}
            clearButtonMode="while-editing"
            selectionColor={colors.buttonTextColor}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={[layout.paddingForFullScreen]}>
        <LinearGradient
          colors={["#2E554E", "#22222D"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            layout.fullWidth,
            layout.display,
            layout.rowHCenter,
            layout.justifyBetween,
            layout.paddingForCard,
            {
              height: "auto",
              borderRadius: 14,
            },
          ]}
        >
          <View>
            <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
              Average Achievable Score
            </Text>
            <Text
              style={[
                fonts.size_12,
                fonts.fontWeight_small,
                { color: colors.backButtonColor, marginTop: "6%" },
              ]}
            >
              Based on concepts covered till date
            </Text>
          </View>

          <View>
            <Circularprogressbar progress={60} />
          </View>
        </LinearGradient>
        {searchChapterName?.map((ele) => {
          const progress = ele.progressPercentage / 100;
          return (
            <View
              key={ele.chapterName}
              style={[
                layout.fullWidth,
                layout.paddingForCard,
                {
                  height: "auto",
                  backgroundColor: colors.cardBackgroundColor,
                  borderRadius: 16,
                  marginTop: "5%",
                },
              ]}
            >
              <View
                style={[
                  layout.display,
                  layout.rowHCenter,
                  layout.justifyBetween,
                ]}
              >
                <View>
                  <Text
                    style={[fonts.size_14, fonts.bold, { color: colors.white }]}
                  >
                    {ele.chapterName}
                  </Text>
                  <Text
                    style={[
                      fonts.size_13,
                      fonts.fontWeight_small,
                      {
                        color: colors.subjectDetailsAcheivableScoreColor,
                        marginTop: "5%",
                      },
                    ]}
                  >
                    Achievable Score {`${ele.achievableScore}/100`}
                  </Text>
                  <Text
                    style={[
                      fonts.size_12,
                      fonts.fontWeight_small,
                      {
                        color:
                          ele.progressPercentage >= 60 ? "#3DD598" : "#FFAB48",
                        marginTop: "5%",
                      },
                    ]}
                  >
                    Progress {`${ele.progressPercentage}%`}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    goToTopicWiseDetailsScreen(
                      ele.chapterName,
                      ele.progressPercentage
                    )
                  }
                >
                  <Image
                    source={RightArrow}
                    resizeMode="contain"
                    style={{
                      tintColor: colors.termsLinkColor,
                      width: 20,
                      height: 12,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: "4%" }}>
                <Progressbar
                  progress={progress}
                  color={ele.progressPercentage >= 60 ? "#3DD598" : "#FFAB48"}
                />
              </View>
              <View>
                <View
                  style={[layout.row, layout.itemsCenter, { marginTop: "4%", gap:5 }]}
                >
                  <Text
                    style={[
                      fonts.size_12,
                      fonts.fontWeight_small,
                      {
                        color: colors.subjectDetailsAcheivableScoreColor,
                      },
                    ]}
                  >
                    Activated Topic :
                  </Text>
                  <Text
                    style={[
                      fonts.size_12,
                      fonts.bold,
                      {
                        color: colors.subjectDetailsAcheivableScoreColor,
                      },
                    ]}
                  >
                    {`${ele.activatedTopic}/12`}
                  </Text>
                </View>
                <Text
                  style={[
                    fonts.size_12,
                    fonts.fontWeight_small,
                    {
                      color: colors.subjectDetailsAcheivableScoreColor,
                      marginTop: "2%",
                    },
                  ]}
                >
                  {ele.subTitle}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeScreen>
  );
};

export default SubjectDetailsScreen;

const styles = StyleSheet.create({});
