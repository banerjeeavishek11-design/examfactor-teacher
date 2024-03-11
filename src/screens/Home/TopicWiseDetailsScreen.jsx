import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/theme";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ImageVariant } from "@/components/atoms";
import LeftArrow from "@/theme/assets/images/leftarrow.png";
import UpArrow from "@/theme/assets/images/uparrow.png";
import DownArrow from "@/theme/assets/images/Downarrow.png";
import { SafeScreen } from "@/components/template";
import Circularprogressbar from "@/components/template/CircularProgressBar/Circularprogressbar";
import Progressbar from "@/components/template/Progressbar/Progressbar";

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
  {
    id: 4,
    topicName: "Graphical Representation...",
    subTitle: "Based on concepts covered till date",
    progress: 70,
  },
  {
    id: 5,
    topicName: "Equations of Motion by Gr...",
    subTitle: "Students completed the homework",
    progress: 68,
  },
];

const leaderboardData = [
  { name: "Rahul K.", progress: 88, achievable: 87 },
  { name: "Sanya M.", progress: 85, achievable: 81 },
  { name: "Karan K.", progress: 74, achievable: 78 },
  { name: "Piyush K.", progress: 81, achievable: 87 },
  { name: "Anmol S.", progress: 78, achievable: 84 },
];

const TopicWiseDetailsScreen = () => {
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
  const navigation = useNavigation();
  const route = useRoute();
  const { topicName } = route.params || {};
  // const [showContent, setShowContent] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});

  const toggleContent = (id) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  useEffect(() => {
    const initialExpandedState = {};
    topic.forEach((ele) => {
      initialExpandedState[ele.id] = false;
    });
    setExpandedCards(initialExpandedState);
  }, []);

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
          onPress={() => navigation.navigate("SubjectDetailsScreen")}
        >
          <ImageVariant
            testID="brand-img"
            style={{
              width: 10,
              height: 11,
              tintColor: colors.backButtonColor,
              top: 2,
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
            {topicName}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={[layout.paddingForFullScreen]}>
        {topic.map((ele) => {
          const progressPercentage = ele.progress / 100;
          return (
            <View
              key={ele.topicName}
              style={[
                layout.fullWidth,
                // layout.paddingForCard,
                {
                  backgroundColor: colors.cardBackgroundColor,
                  height: expandedCards[ele.id] ? "auto" : 100,
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
                <View style={{ width: "50%" }}>
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
                      { color: colors.backButtonColor, marginTop: "3%" },
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

              {expandedCards[ele.id] ? (
                <View>
                  <View style={[layout.paddingForCard, { paddingTop: "0%" }]}>
                    <Text
                      style={[
                        fonts.size_12,
                        fonts.fontWeight_small,
                        {
                          color: "#3DD598",
                          // marginTop: "5%",
                        },
                      ]}
                    >
                      Progress {`${ele.progress}%`}
                    </Text>
                    <View style={{ marginTop: "4%" }}>
                      <Progressbar
                        progress={progressPercentage}
                        color={"#3DD598"}
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
                            { color: colors.white },
                          ]}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={[
                            fonts.size_14,
                            fonts.fontWeight_small,
                            { color: colors.white },
                          ]}
                        >
                          {item.progress}
                        </Text>
                        <Text
                          style={[
                            fonts.size_14,
                            fonts.fontWeight_small,
                            { color: colors.white },
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
      </ScrollView>
    </SafeScreen>
  );
};

export default TopicWiseDetailsScreen;

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
  lastRow: {
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
});
