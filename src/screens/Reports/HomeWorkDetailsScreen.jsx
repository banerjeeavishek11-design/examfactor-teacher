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
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { ImageVariant } from "@/components/atoms";
import LeftArrow from "@/theme/assets/images/leftarrow.png";
import UpArrow from "@/theme/assets/images/uparrow.png";
import DownArrow from "@/theme/assets/images/Downarrow.png";

const chapterDetails = [
  {
    id: "C1",
    chapterName: "Electric Current",
    strongArea: 4,
    weakArea: 3,
    topic: [
      {
        topicName: "T1: Introduction to Electric Field",
        subtopic: [
          "Drift of electrons & origin of resistance",
          "Electric current and voltage",
          "Resistivity, and Ohm's law",
          "Resistivity, and Ohm's law",
          "Combination of cells",
        ],
      },
      {
        topicName: "T2: Electric Field",
        subtopic: [
          "Drift of electrons & origin of resistance",
          "Electric current and voltage",
          "Resistivity, and Ohm's law",
          "Resistivity, and Ohm's law",
        ],
      },
    ],
  },
  {
    id: "C2",
    chapterName: "Electric Field",
    strongArea: 4,
    weakArea: 3,
    topic: [
      {
        topic1: "T1: Introduction to Electric Field",
        subtopic: [
          "Drift of electrons & origin of resistance",
          "Electric current and voltage",
          "Resistivity, and Ohm's law",
          "Resistivity, and Ohm's law",
          "Combination of cells",
        ],
      },
      {
        topic2: "T2: Electric Field",
        subtopic: [
          "Drift of electrons & origin of resistance",
          "Electric current and voltage",
          "Resistivity, and Ohm's law",
          "Resistivity, and Ohm's law",
        ],
      },
    ],
  },
  {
    id: "C3",
    chapterName: "Electric Current",
    strongArea: 4,
    weakArea: 3,
  },
  {
    id: "C4",
    chapterName: "Electric Current",
    strongArea: 4,
    weakArea: 3,
  },
];

const HomeWorkDetailsScreen = () => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { studentDetails } = route.params || {};
  const [expandedCards, setExpandedCards] = useState({});

  const toggleContent = (id) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <SafeScreen>
      <View style={[layout.fullWidth, layout.paddingForFullScreen]}>
        <TouchableOpacity
          style={[layout.display, layout.rowHCenter,{paddingBottom:'1%'}]}
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
            Chapter Covered
          </Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={{paddingBottom:'15%'}}>
          {chapterDetails?.map((ele) => {
            return (
              <View
                key={ele.id}
                style={[
                  layout.fullWidth,
                  layout.paddingForCard,
                  {
                    backgroundColor: colors.cardBackgroundColor,
                    height: expandedCards[ele.id] ? "auto" : 78,
                    borderRadius: 16,
                    marginTop: "3%",
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
                      style={[
                        fonts.size_14,
                        fonts.bold,
                        { color: colors.white },
                      ]}
                    >
                      {ele.id}: {ele.chapterName}
                    </Text>
                    <Text
                      style={[
                        fonts.size_12,
                        fonts.fontWeight_small,
                        { color: "#FFAB48" },
                        { marginTop: "2%" },
                      ]}
                    >{`${ele.strongArea} strong & ${ele.weakArea} weak areas indentified`}</Text>
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
                  <>
                    {ele?.topic?.map((topic) => {
                      return (
                        <View
                          style={[
                            layout.fullWidth,
                            layout.paddingForCard,
                            {
                              backgroundColor:
                                colors.bottomSheetBackgroundColor,
                              height: "auto",
                              borderRadius: 14,
                              marginTop: "4%",
                            },
                          ]}
                        >
                          <Text
                            style={[
                              fonts.size_14,
                              fonts.fontWeight_small,
                              { color: colors.white },
                            ]}
                          >
                            {topic.topicName}
                          </Text>
                          {topic.subtopic.map((subtopic) => {
                            return (
                              <Text
                                style={[
                                  fonts.size_12,
                                  fonts.fontWeight_small,
                                  { color: colors.backButtonColor },
                                ]}
                              >
                                {subtopic}
                              </Text>
                            );
                          })}
                        </View>
                      );
                    })}
                  </>
                ) : null}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeScreen>
  );
};

export default HomeWorkDetailsScreen;

const styles = StyleSheet.create({});
