import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/theme";
import { Header, SafeScreen } from "@/components/template";
import { ImageVariant } from "@/components/atoms";
import DownArrow from "@/theme/assets/images/Downarrow.png";
import SelectChapterBottomSheet from "@/components/BottomSheet/Reports/SelectChapterBottomSheet";
import SelectAreaBottomSheet from "@/components/BottomSheet/Reports/SelectAreaBottomSheet";
import PrimaryGradient from "@/components/template/LinearGradient/PrimaryGradient";
import reportChapterDetails from "./ReportChapterDetails";
import Weak from "@/theme/assets/images/subtopicWeakIcon.png";

const ReportsScreen = () => {
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

  const [chapters, setChapters] = useState([]);

  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  const [selectChapterModalVisible, setSelectChapterModalVisible] =
    useState(false);
  const closeSelectChapterModal = () => {
    setSelectChapterModalVisible(false);
  };

  const [selectAreaModalVisible, setSelectAreaModalVisible] = useState(false);
  const closeSelectAreaModal = () => {
    setSelectAreaModalVisible(false);
  };

  useEffect(() => {
    if (selectedChapter !== null) {
      const result = reportChapterDetails.find(
        (chapter) => chapter.chapterId === selectedChapter?.chapterId
      );
      //result.data may come undefined because project is using limited dummy data
      if (result?.data === undefined) {
        setChapters([]);
        return;
      }
      console.log("RESULTED CHAPTER:::", result?.data);
      setChapters(result?.data);
    }
  }, [selectedChapter]);

  console.log("SELECTED CHAPTER::", selectedChapter);
  console.log("SELECTED Area::", selectedArea);
  return (
    <SafeScreen>
      <View style={[{ backgroundColor: colors.headerBackgroundColor }]}>
        <Header />
      </View>
      <ScrollView
        contentContainerStyle={[
          layout.paddingForFullScreen,
          { paddingTop: "2%" },
        ]}
      >
        <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              layout.display,
              layout.rowHCenter,
              { marginRight: 5, marginTop: "3%", gap: 4 },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectChapterModalVisible(true);
              }}
              style={[
                layout.justifyCenter,
                layout.display,
                layout.rowHCenter,
                layout.justifyAround,
                {
                  backgroundColor: colors.bottomTabBackground,
                  borderWidth: 1,
                  borderColor:
                    selectedChapter !== null ? colors.termsLinkColor : null,
                  width: selectedChapter !== null ? Math.min(190, Math.max(90, selectedChapter.chapterName.length * 10)) : 72, 
                  height: 28,
                  borderRadius: 4,
                  paddingHorizontal: 6,
                  marginRight: 5,
                },
              ]}
            >
              <Text
                style={[
                  fonts.size_12,
                  fonts.fontWeight_extraSmall,
                  fonts.alignCenter,
                  {
                    color:
                      selectedChapter !== null
                        ? colors.termsLinkColor
                        : colors.white,
                    opacity: selectedChapter !== null ? 1 : 0.3,
                  },
                ]}
              >
                {selectedChapter !== null
                  ? selectedChapter.chapterId +
                    ": " +
                    selectedChapter.chapterName
                  : "Chapter"}
              </Text>
              <ImageVariant
                testID="brand-img"
                style={{
                  width: 10,
                  height: 10,
                  tintColor:
                    selectedChapter !== null
                      ? colors.termsLinkColor
                      : colors.white,
                  opacity: selectedChapter !== null ? 1 : 0.4,
                }}
                source={DownArrow}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectAreaModalVisible(true)}
              style={[
                layout.justifyCenter,
                layout.display,
                layout.rowHCenter,
                layout.justifyBetween,
                {
                  backgroundColor: colors.bottomTabBackground,
                  borderWidth: 1,
                  borderColor:
                    selectedArea !== null ? colors.termsLinkColor : null,
                  width: 65,
                  height: 28,
                  borderRadius: 4,
                  paddingHorizontal: 6,
                  marginRight: 5,
                },
              ]}
            >
              <Text
                style={[
                  fonts.size_12,
                  fonts.fontWeight_small,
                  {
                    color:
                      selectedArea !== null
                        ? colors.termsLinkColor
                        : colors.white,
                    opacity: selectedArea !== null ? 1 : 0.3,
                  },
                  fonts.alignCenter,
                ]}
              >
                Areas
              </Text>
              <ImageVariant
                testID="brand-img"
                style={{
                  width: 10,
                  height: 10,
                  tintColor:
                    selectedArea !== null
                      ? colors.termsLinkColor
                      : colors.white,
                  opacity: selectedArea !== null ? 1 : 0.4,
                }}
                source={DownArrow}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </ScrollView>

          <View style={[]}>
            {selectedChapter !== null ? (
              <View>
                {chapters.map((ele) => {
                  return (
                    <View key={ele.topic}>
                      <View style={{ marginTop: "5%" }}>
                        <Text
                          style={[
                            fonts.size_16,
                            fonts.bold,
                            { color: colors.gray200 },
                          ]}
                        >
                          {ele.topic}
                        </Text>
                      </View>
                      {ele.subtopics.map((subtopic) => {
                        return (
                          <View
                            key={subtopic}
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
                              style={[layout.display, layout.justifyBetween, {marginVertical: "1%"}]}
                            >
                              <Text
                                style={[
                                  fonts.size_14,
                                  fonts.bold,
                                  { color: colors.gray100 },
                                ]}
                              >
                                {subtopic}
                              </Text>
                              <View
                                style={[
                                  layout.rowHCenter,
                                  layout.itemsCenter,
                                  { marginTop: "4%", gap: 8 },
                                ]}
                              >
                                <Image
                                  source={Weak}
                                  style={{ width: 25, height: 25 }}
                                />
                                <Text
                                  style={[
                                    fonts.size_12,
                                    fonts.fontWeight_small,
                                    { color: colors.gray100 },
                                  ]}
                                >
                                  Weak for 68% of the student
                                </Text>
                              </View>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            ) : (
              <View
                style={[
                  layout.itemsCenter,
                  layout.justifyCenter,
                  { marginTop: "50%" },
                ]}
              >
                <Text
                  style={[
                    fonts.alignCenter,
                    fonts.size_24,
                    fonts.bold,
                    { color: colors.white },
                  ]}
                >
                  No Subtopic Available
                </Text>
                <Text
                  style={[
                    fonts.alignCenter,
                    fonts.size_16,
                    fonts.fontWeignt_600,
                    { color: colors.gray200, marginTop: "2%" },
                  ]}
                >
                  There are no Subtopic, please select Chapter and Question type
                  to fetch Questions
                </Text>
                {/* <Text
                                  style={[
                                    fonts.alignCenter,
                                    fonts.size_16,
                                    fonts.fontWeignt_600,
                                    { color: colors.gray200,padding:0,margin:0,width:"95%" },
                                  ]}
                                >
                                  please select Chapter and Question type to
                                  fetch Questions
                                </Text> */}
                <TouchableOpacity
                  style={{ width: "85%" }}
                  onPress={() => setSelectChapterModalVisible(true)}
                >
                  <PrimaryGradient
                    styleProp={[
                      layout.justifyCenter,
                      layout.itemsCenter,
                      styles.Button,
                    ]}
                  >
                    <Text
                      style={[
                        fonts.size_16,
                        fonts.bold,
                        { color: colors.loginBtnTextColor },
                      ]}
                    >
                      Select Chapter
                    </Text>
                  </PrimaryGradient>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <SelectChapterBottomSheet
        visible={selectChapterModalVisible}
        closeModal={closeSelectChapterModal}
        setSelectedChapter={setSelectedChapter}
      />
      <SelectAreaBottomSheet
        visible={selectAreaModalVisible}
        closeModal={closeSelectAreaModal}
        setSelectedArea={setSelectedArea}
      />
    </SafeScreen>
  );
};

export default ReportsScreen;

const styles = StyleSheet.create({
  Button: {
    marginTop: "8%",
    height: 48,
    width: "100%",
    borderRadius: 9,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
