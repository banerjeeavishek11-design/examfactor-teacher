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
import PrimaryGradient from "@/components/template/LinearGradient/PrimaryGradient";
import reportChapterDetails from "./ReportChapterDetails";
import Filter from "@/theme/assets/images/questionAnalysisFilter.png";
// import SelectChapterQABottomSheet from "@/components/BottomSheet/Reports/SelectChapterQABottomSheet";

const QuestionAnalysisScreen = () => {
  const { fonts, layout, colors } = useTheme();
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectChapterModalVisible, setSelectChapterQAModalVisible] =
    useState(false);
  const closeSelectChapterQAModal = () => {
    setSelectChapterQAModalVisible(false);
  };
  const selectedQuestionType = null;
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
                      selectedQuestionType !== null
                        ? colors.termsLinkColor
                        : null,
                    width: 120,
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
                  Question Type
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
            <TouchableOpacity>
              <Image source={Filter} />
            </TouchableOpacity>
          </View>

          <View>
            {selectedQuestionType !== null ? (
              <View>
                <Text>Question analysis questions here</Text>
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
      {/* <SelectChapterQABottomSheet visible={selectChapterModalVisible} closeModal={closeSelectChapterQAModal} /> */}
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
