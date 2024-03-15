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
import { SafeScreen } from "@/components/template";
import { ImageVariant } from "@/components/atoms";
import RightArrow from "@/theme/assets/images/arrow.png";
import DownArrow from "@/theme/assets/images/Downarrow.png";
import PrimaryGradient from "@/components/template/LinearGradient/PrimaryGradient";
import Filter from "@/theme/assets/images/questionAnalysisFilter.png";
import SelectChapterQABottomSheet from "@/components/BottomSheet/Reports/SelectChapterQABottomSheet";
import questions from "./QuestionAnalysisDummyQuestions";
import Weak from "@/theme/assets/images/subtopicWeakIcon.png";
import Bookmark from "@/theme/assets/images/questionBookmark.png";
import MostlyFilterBottomSheet from "@/components/BottomSheet/Reports/MostlyFilterBottomSheet";
import Cross from "@/theme/assets/images/cross.png";
import { useNavigation } from "@react-navigation/native";


const QuestionAnalysisScreen = () => {
    const navigation = useNavigation()
  const { fonts, layout, colors } = useTheme();
  const [chapterQuestions, setChapterQuestions] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectChapterQAModalVisible, setSelectChapterQAModalVisible] =
    useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };
  const closeSelectChapterQAModal = () => {
    setSelectChapterQAModalVisible(false);
  };
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);

  useEffect(() => {
    if (selectedChapter !== null) {
      const result = questions.find(
        (chapter) => chapter.chapterId === selectedChapter?.chapterId
      );
      //result.data may come undefined because project is using limited dummy data
      if (result?.data === undefined) {
        setChapterQuestions([]);
        return;
      }
      setChapterQuestions(result?.data);
      // setSelectedQuestionType(true);
    }
  }, [selectedChapter]);

  const changeQuestionType = (option)=>{
    setSelectedQuestionType(option)
  }

console.log("QESTION TYPE", selectedQuestionType);

  return (
    <SafeScreen>
      <ScrollView
        contentContainerStyle={[
          layout.paddingForFullScreen,
          { paddingTop: "2%" },
        ]}
      >
        <View>
          <View style={[layout.row, layout.itemsCenter]}>
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
                  setSelectChapterQAModalVisible(true);
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
                    width:
                      selectedChapter !== null
                        ? Math.min(
                            190,
                            Math.max(
                              90,
                              selectedChapter.chapterName.length * 10
                            )
                          )
                        : 72,
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
                onPress={() => {
                  setSelectChapterQAModalVisible(true);
                }}
                style={[
                  layout.justifyCenter,
                  layout.display,
                  layout.rowHCenter,
                  layout.justifyBetween,
                  {
                    backgroundColor: colors.bottomTabBackground,
                    borderWidth: 1,
                    borderColor:
                      selectedQuestionType !== null
                        ? colors.termsLinkColor
                        : null,
                    width: selectedQuestionType !== null
                    ? Math.min(
                        170,
                        Math.max(
                          55,
                          selectedQuestionType.length * 10
                        )
                      )
                    : 120,
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
                        selectedQuestionType !== null
                          ? colors.termsLinkColor
                          : colors.white,
                      opacity: selectedQuestionType !== null ? 1 : 0.3,
                    },
                    fonts.alignCenter,
                  ]}
                >
                  {
                    selectedQuestionType !== null ? selectedQuestionType : "Question Type"
                  }
                </Text>
                <ImageVariant
                  testID="brand-img"
                  style={{
                    width: 10,
                    height: 10,
                    tintColor:
                      selectedQuestionType !== null
                        ? colors.termsLinkColor
                        : colors.white,
                    opacity: selectedQuestionType !== null ? 1 : 0.4,
                  }}
                  source={DownArrow}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
              <Image source={Filter} />
            </TouchableOpacity>
          </View>

          {selectedFilter && selectedChapter !== null ? (
            <View style={{ marginTop: "2%" }}>
              <TouchableOpacity
                style={[
                  layout.justifyCenter,
                  layout.display,
                  layout.rowHCenter,
                  layout.justifyAround,
                  {
                    backgroundColor: colors.bottomTabBackground,
                    width: selectedFilter === "Mostly Incorrect" ? 120 : 145,
                    height: 28,
                    borderRadius: 4,
                    paddingHorizontal: 6,
                    marginRight: 5,
                  },
                ]}
                onPress={() => setSelectedFilter(null)}
              >
                <Text
                  style={[
                    fonts.size_12,
                    fonts.fontWeight_extraSmall,
                    fonts.alignCenter,
                    {
                      color: colors.termsLinkColor,
                      opacity: 0.8,
                    },
                  ]}
                >
                  {selectedFilter}
                </Text>
                  <ImageVariant
                    testID="brand-img"
                    style={{
                      width: 10,
                      height: 10,
                      tintColor: colors.termsLinkColor,
                      opacity: 0.8,
                    }}
                    source={Cross}
                    resizeMode="contain"
                  />
              </TouchableOpacity>
            </View>
          ) : null}

          <View>
            {selectedChapter !== null ? (
              <View>
                {chapterQuestions.map((ele) => {
                  return (
                    <View key={ele.qNo}>
                      <View
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
                        <View style={[layout.row, { width: "80%", gap: 10 }]}>
                          <Text
                            style={[
                              fonts.size_14,
                              fonts.fontWeight_small,
                              { color: colors.white },
                            ]}
                          >
                            {ele.qNo}.
                          </Text>
                          <View>
                            <Text
                              style={[
                                fonts.size_14,
                                fonts.fontWeight_small,
                                { color: colors.white },
                              ]}
                            >
                              {ele.question}
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
                                style={{ width: 20, height: 20 }}
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
                            <View
                              style={[
                                layout.row,
                                layout.justifyBetween,
                                { marginTop: "5%" },
                              ]}
                            >
                              <TouchableOpacity
                                style={[layout.rowHCenter, { gap: 2 }]}
                                onPress={()=>navigation.navigate("SolutionScreen")}
                              >
                                <Text
                                  style={[
                                    fonts.size_12,
                                    fonts.fontWeight_small,
                                    { color: colors.termsLinkColor },
                                  ]}
                                >
                                  View Solution
                                </Text>
                                <Image
                                  style={{
                                    width: 10,
                                    height: 8,
                                    tintColor: colors.termsLinkColor,
                                  }}
                                  source={RightArrow}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                          <TouchableOpacity style={[layout.justifyEnd]}>
                            <Image source={Bookmark} />
                          </TouchableOpacity>
                        </View>
                      </View>
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
                  No Questions Available
                </Text>
                <Text
                  style={[
                    fonts.alignCenter,
                    fonts.size_16,
                    fonts.fontWeignt_600,
                    { color: colors.gray200, marginTop: "2%" },
                  ]}
                >
                  There are no question available, please select Chapter and
                  Question type to fetch Questions
                </Text>
                <TouchableOpacity
                  style={{ width: "85%" }}
                  onPress={() => setSelectChapterQAModalVisible(true)}
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
      <SelectChapterQABottomSheet
        setSelectedChapter={setSelectedChapter}
        visible={selectChapterQAModalVisible}
        closeModal={closeSelectChapterQAModal}
        changeQuestionType={changeQuestionType}
      />
      <MostlyFilterBottomSheet
        setSelectedFilter={setSelectedFilter}
        visible={filterModalVisible}
        closeModal={closeFilterModal}
      />
    </SafeScreen>
  );
};

export default QuestionAnalysisScreen;

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
