import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/template';
import { useSelector } from 'react-redux';
import { ImageVariant } from '@/components/atoms';
import RightArrow from '@/theme/assets/images/arrow.png';
import DownArrow from '@/theme/assets/images/Downarrow.png';
import PrimaryGradient from '@/components/template/LinearGradient/PrimaryGradient';
import Filter from '@/theme/assets/images/questionAnalysisFilter.png';
import SelectChapterQABottomSheet from '@/components/BottomSheet/Reports/SelectChapterQABottomSheet';
import questions from './QuestionAnalysisDummyQuestions';
import Weak from '@/theme/assets/images/subtopicWeakIcon.png';
import Bookmark from '@/theme/assets/images/questionBookmark.png';
import MostlyFilterBottomSheet from '@/components/BottomSheet/Reports/MostlyFilterBottomSheet';
import Cross from '@/theme/assets/images/cross.png';
import { useNavigation } from '@react-navigation/native';
import { getQuestionAnalysis } from '../../services/ReportsServices/reportsServices';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const QuestionAnalysisScreen = () => {
  const navigation = useNavigation();
  const { fonts, layout, colors } = useTheme();
  const subjectId = useSelector((state) => state.selectedSubject.subject);
  const sectionName = useSelector((state) => state.selectedSubject.sectionName);
  const resFromMMKV = storage.getString('teacherDetails');
  const teacherDetails = resFromMMKV ? JSON.parse(resFromMMKV) : null;
  const [chapterQuestions, setChapterQuestions] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [chapterOption, setChapterOption] = useState(null);
  const [selectChapterQAModalVisible, setSelectChapterQAModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [questionActivityType, setQuestionActivityType] = useState();
  const [gradeId, setGradeId] = useState(null);
  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };
  const closeSelectChapterQAModal = () => {
    setSelectChapterQAModalVisible(false);
  };
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);

  const isTablet = useSelector((state) => state.screenDimensions.isTablet);

  useEffect(() => {
    if (teacherDetails && teacherDetails.length > 0) {
      for (let item of teacherDetails) {
        if (item.sectionName === sectionName) {
          setGradeId(item.gradeId);
          return;
        }
      }
    }
  }, [sectionName, teacherDetails]);

  useEffect(() => {
    if (selectedChapter !== null) {
      const result = questions.find((chapter) => chapter.chapterId === selectedChapter?.chapterId);
      if (result?.data === undefined) {
        setChapterQuestions([]);
        return;
      }
      setChapterQuestions(result?.data);
    }
  }, [selectedChapter]);

  useEffect(() => {
    if (chapterOption && questionActivityType) getQuestions();
  }, [subjectId, chapterOption, questionActivityType]);

  const changeQuestionType = (option) => {
    setSelectedQuestionType(option);
  };

  const getQuestions = () => {
    let params = {
      // page: 0,
      // size: 1,
      // summary: true,
      active: true,
      // sort: ['string']
      // searchKey: 'string',
      // countOnly: true,
      // eventType: 'string',
      chapterId: chapterOption,
      subjectId: subjectId,
      gradeId: gradeId,
      activityType: questionActivityType,
      processFlag: true,
    };
    getQuestionAnalysis(params)
      .then((res) => {
        console.log('response of Q Analysis', res.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={[layout.paddingForFullScreen, { paddingTop: '2%' }]}>
        <View>
          <View style={[layout.row, layout.itemsCenter]}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                layout.display,
                layout.rowHCenter,
                { marginTop: isTablet ? null : '3%', gap: 4 },
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
                    borderColor: selectedChapter !== null ? colors.termsLinkColor : null,
                    width:
                      selectedChapter !== null
                        ? Math.min(190, Math.max(90, selectedChapter.length * 10))
                        : 72,
                    height: isTablet ? 40 : 28,
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
                      color: selectedChapter !== null ? colors.termsLinkColor : colors.white,
                      opacity: selectedChapter !== null ? 1 : 0.3,
                    },
                  ]}
                >
                  {selectedChapter !== null ? selectedChapter : 'Chapter'}
                </Text>
                <ImageVariant
                  testID="brand-img"
                  style={{
                    width: 10,
                    height: 10,
                    tintColor: selectedChapter !== null ? colors.termsLinkColor : colors.white,
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
                    borderColor: selectedQuestionType !== null ? colors.termsLinkColor : null,
                    width:
                      selectedQuestionType !== null
                        ? Math.min(170, Math.max(55, selectedQuestionType.length * 10))
                        : 120,
                    height: isTablet ? 40 : 28,
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
                      color: selectedQuestionType !== null ? colors.termsLinkColor : colors.white,
                      opacity: selectedQuestionType !== null ? 1 : 0.3,
                    },
                    fonts.alignCenter,
                  ]}
                >
                  {selectedQuestionType !== null ? selectedQuestionType : 'Question Type'}
                </Text>
                <ImageVariant
                  testID="brand-img"
                  style={{
                    width: 10,
                    height: 10,
                    tintColor: selectedQuestionType !== null ? colors.termsLinkColor : colors.white,
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

          {selectedFilter ? (
            <View style={{ marginTop: '2%' }}>
              <TouchableOpacity
                style={[
                  layout.justifyCenter,
                  layout.display,
                  layout.rowHCenter,
                  layout.justifyAround,
                  {
                    backgroundColor: colors.bottomTabBackground,
                    width: selectedFilter === 'Mostly Incorrect' ? 120 : 145,
                    height: isTablet ? 40 : 28,
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
                          isTablet ? { padding: '2%' } : layout.paddingForCard,
                          {
                            height: 'auto',
                            backgroundColor: colors.cardBackgroundColor,
                            borderRadius: 16,
                            marginTop: '5%',
                          },
                        ]}
                      >
                        <View style={[layout.row, { width: isTablet ? '95%' : '80%', gap: 10 }]}>
                          <Text
                            style={[fonts.size_14, fonts.fontWeight_small, { color: colors.white }]}
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
                                { marginTop: isTablet ? '2%' : '4%', gap: 8 },
                              ]}
                            >
                              <Image source={Weak} style={{ width: 20, height: 20 }} />
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
                                { marginTop: isTablet ? '2%' : '5%' },
                              ]}
                            >
                              <TouchableOpacity
                                style={[layout.rowHCenter, { gap: 2 }]}
                                onPress={() =>
                                  navigation.navigate('QuestionSolutionScreen', {
                                    AllQuestions: chapterQuestions,
                                    currentQuestionId: ele.qNo,
                                    currentQuestion: ele.question,
                                  })
                                }
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
                  {
                    marginTop: isTablet ? '10%' : '50%',
                    width: isTablet ? '60%' : null,
                    alignSelf: isTablet ? 'center' : null,
                  },
                ]}
              >
                <Text
                  style={[fonts.alignCenter, fonts.size_24, fonts.bold, { color: colors.white }]}
                >
                  No Questions Available
                </Text>
                <Text
                  style={[
                    fonts.alignCenter,
                    fonts.size_16,
                    fonts.fontWeignt_600,
                    { color: colors.gray200, marginTop: '2%' },
                  ]}
                >
                  There are no question available, please select Chapter and Question type to fetch
                  Questions
                </Text>
                <TouchableOpacity
                  style={{ width: '85%' }}
                  onPress={() => setSelectChapterQAModalVisible(true)}
                >
                  <PrimaryGradient
                    styleProp={[layout.justifyCenter, layout.itemsCenter, styles.Button]}
                  >
                    <Text style={[fonts.size_16, fonts.bold, { color: colors.loginBtnTextColor }]}>
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
        setChapterOption={setChapterOption}
        setSelectedChapter={setSelectedChapter}
        visible={selectChapterQAModalVisible}
        closeModal={closeSelectChapterQAModal}
        changeQuestionType={changeQuestionType}
        setQuestionActivityType={setQuestionActivityType}
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
    marginTop: '8%',
    height: 48,
    width: '100%',
    borderRadius: 9,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

// import { Text, View } from 'react-native';
// import React from 'react';

// const QuestionAnalysisTab = () => {
//   return (
//     <View>
//       <Text>QuestionAnalysisTab</Text>
//     </View>
//   );
// };

// export default QuestionAnalysisTab;
