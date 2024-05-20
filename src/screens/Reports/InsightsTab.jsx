import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/template';
import { ImageVariant } from '@/components/atoms';
import { useSelector } from 'react-redux';
import DownArrow from '@/theme/assets/images/Downarrow.png';
import SelectChapterBottomSheet from '@/components/BottomSheet/Reports/SelectChapterBottomSheet';
import SelectAreaBottomSheet from '@/components/BottomSheet/Reports/SelectAreaBottomSheet';
import PrimaryGradient from '@/components/template/LinearGradient/PrimaryGradient';
import Weak from '@/theme/assets/images/subtopicWeakIcon.png';
import { getReportInsights } from '../../services/ReportsServices/reportsServices';
import { getChaptersBySubjectId } from '../../services/chapterListService';
import { getTopicDescById, getSubTopicDescById } from '../../utils/namesByIds';

import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const InsightsScreen = () => {
  const { fonts, layout, colors } = useTheme();
  const selectedSubjectId = useSelector((state) => state.selectedSubject.subject);
  const sectionName = useSelector((state) => state.selectedSubject.sectionName);
  const resFromMMKV = storage.getString('teacherDetails');
  const teacherDetails = resFromMMKV ? JSON.parse(resFromMMKV) : null;

  const [insightReportsData, setInsightReportsData] = useState([]);
  const [chapList, setChapList] = useState([]);

  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedChapterName, setSelectedChapterName] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  const [chapterSelectionType, setChapterSelectionType] = useState();
  const [sectionId, setSectionId] = useState(null);

  const isTablet = useSelector((state) => state.screenDimensions.isTablet);

  const [selectChapterModalVisible, setSelectChapterModalVisible] = useState(false);
  const closeSelectChapterModal = () => {
    setSelectChapterModalVisible(false);
  };

  const [selectAreaModalVisible, setSelectAreaModalVisible] = useState(false);
  const closeSelectAreaModal = () => {
    setSelectAreaModalVisible(false);
  };

  useEffect(() => {
    if (teacherDetails && teacherDetails.length > 0) {
      for (let item of teacherDetails) {
        if (item.sectionName === sectionName) {
          setSectionId(item.id);
          return;
        }
      }
    }
  }, [sectionName, teacherDetails]);

  useEffect(() => {
    if (selectedChapter && chapterSelectionType) getInsights();
  }, [selectedSubjectId, selectedChapter, chapterSelectionType, selectedUnit]);

  // useEffect(() => {
  //   if (selectedChapter !== null) {
  //     const result = chapList.find((chapter) => chapter.chapterId === selectedChapter);
  //     //result.data may come undefined because project is using limited dummy data
  //     if (result?.data === undefined) {
  //       setInsightReportsData([]);
  //       return;
  //     }
  //     setInsightReportsData(result?.data);
  //   }
  // }, [selectedChapter]);

  useEffect(() => {
    getChaptersBySubjectId(selectedSubjectId)
      .then((res) => {
        setChapList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedSubjectId]);

  const getInsights = () => {
    let params = {
      subjectId: selectedSubjectId,
      unitId: selectedUnit,
      chapterId: selectedChapter,
      sectionId: sectionId,
      selectionType: chapterSelectionType,
    };
    getReportInsights(params)
      .then((res) => {
        setInsightReportsData(res.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const groupedData = insightReportsData.reduce((acc, item) => {
    const topicId = item.topicId;
    if (!acc[topicId]) {
      acc[topicId] = [];
    }
    acc[topicId].push(item);
    return acc;
  }, {});

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={[layout.paddingForFullScreen, { paddingTop: '2%' }]}>
        <View>
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
                  borderColor: selectedChapter !== null ? colors.termsLinkColor : null,
                  width:
                    selectedChapter !== null
                      ? Math.min(210, Math.max(90, selectedChapterName.length * 8))
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
                {selectedChapter !== null ? selectedChapterName : 'Chapter'}
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
              onPress={() => setSelectAreaModalVisible(true)}
              style={[
                layout.justifyCenter,
                layout.display,
                layout.rowHCenter,
                layout.justifyBetween,
                {
                  backgroundColor: colors.bottomTabBackground,
                  borderWidth: 1,
                  borderColor: selectedArea !== null ? colors.termsLinkColor : null,
                  width:
                    selectedArea !== null
                      ? Math.min(145, Math.max(45, selectedArea.length * 10.2))
                      : 65,
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
                    color: selectedArea !== null ? colors.termsLinkColor : colors.white,
                    opacity: selectedArea !== null ? 1 : 0.3,
                  },
                  fonts.alignCenter,
                ]}
              >
                {selectedArea != null ? selectedArea : 'Areas'}
              </Text>
              <ImageVariant
                testID="brand-img"
                style={{
                  width: 10,
                  height: 10,
                  tintColor: selectedArea !== null ? colors.termsLinkColor : colors.white,
                  opacity: selectedArea !== null ? 1 : 0.4,
                }}
                source={DownArrow}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </ScrollView>
          {selectedChapter !== null ? (
            <View>
              {Object.keys(groupedData).map((topicId) => (
                <View key={topicId} style={[]}>
                  <Text
                    style={[
                      fonts.size_20,
                      fonts.bold,
                      { color: colors.white, opacity: 0.4, marginTop: '5%', marginBottom: '-2%' },
                    ]}
                  >
                    {getTopicDescById(chapList.chapters, topicId)}
                  </Text>
                  {selectedChapter !== null ? (
                    <View>
                      {groupedData[topicId].map((ele) => {
                        return (
                          <View
                            key={ele.id}
                            style={[
                              fonts.size_12,
                              fonts.fontWeight_small,
                              { color: colors.gray100 },
                            ]}
                          >
                            <View style={[layout.display, layout.justifyBetween]}>
                              <Text style={[fonts.size_14, fonts.bold, { color: colors.gray100 }]}>
                                {getSubTopicDescById(chapList.chapters, ele.subTopicId)}
                              </Text>
                              {(chapterSelectionType === 'WEAK' ||
                                chapterSelectionType === 'ALL') && (
                                <View
                                  style={[
                                    layout.rowHCenter,
                                    layout.itemsCenter,
                                    { marginTop: isTablet ? '1%' : '4%', gap: 8 },
                                  ]}
                                >
                                  <Image source={Weak} style={{ width: 25, height: 25 }} />
                                  <Text
                                    style={[
                                      fonts.size_12,
                                      fonts.fontWeight_small,
                                      { color: colors.gray100 },
                                    ]}
                                  >
                                    Weak for {Math.round(ele.weakPercentage)}% of the student
                                  </Text>
                                </View>
                              )}
                              {(chapterSelectionType === 'STRONG' ||
                                chapterSelectionType === 'ALL') && (
                                <View
                                  style={[
                                    layout.rowHCenter,
                                    layout.itemsCenter,
                                    { marginTop: isTablet ? '1%' : '4%', gap: 8 },
                                  ]}
                                >
                                  <Image source={Weak} style={{ width: 25, height: 25 }} />
                                  <Text
                                    style={[
                                      fonts.size_12,
                                      fonts.fontWeight_small,
                                      { color: colors.gray100 },
                                    ]}
                                  >
                                    Strong for {Math.round(ele.strongPercentage)}% of the student
                                  </Text>
                                </View>
                              )}
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
                        style={[
                          fonts.alignCenter,
                          fonts.size_24,
                          fonts.bold,
                          { color: colors.white, width: '80%' },
                        ]}
                      >
                        No Subtopic Available
                      </Text>
                      <Text
                        style={[
                          fonts.alignCenter,
                          fonts.size_16,
                          fonts.fontWeignt_600,
                          { color: colors.gray200, marginTop: '2%' },
                        ]}
                      >
                        There are no Subtopic, please select Chapter and Question type to fetch
                        Questions
                      </Text>
                      <TouchableOpacity
                        style={{ width: '85%' }}
                        onPress={() => setSelectChapterModalVisible(true)}
                      >
                        <PrimaryGradient
                          styleProp={[layout.justifyCenter, layout.itemsCenter, styles.Button]}
                        >
                          <Text
                            style={[fonts.size_16, fonts.bold, { color: colors.loginBtnTextColor }]}
                          >
                            Select Chapter
                          </Text>
                        </PrimaryGradient>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
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
                style={[
                  fonts.alignCenter,
                  fonts.size_24,
                  fonts.bold,
                  { color: colors.white, width: '80%' },
                ]}
              >
                No Subtopic Available
              </Text>
              <Text
                style={[
                  fonts.alignCenter,
                  fonts.size_16,
                  fonts.fontWeignt_600,
                  { color: colors.gray200, marginTop: '2%' },
                ]}
              >
                There are no Subtopic, please select Chapter and Question type to fetch Questions
              </Text>
              <TouchableOpacity
                style={{ width: '85%' }}
                onPress={() => setSelectChapterModalVisible(true)}
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
      </ScrollView>
      <SelectChapterBottomSheet
        visible={selectChapterModalVisible}
        closeModal={closeSelectChapterModal}
        setSelectedChapter={setSelectedChapter}
        setSelectedChapterName={setSelectedChapterName}
        setSelectedUnit={setSelectedUnit}
        setSelectAreaModalVisible={setSelectAreaModalVisible}
      />
      <SelectAreaBottomSheet
        visible={selectAreaModalVisible}
        closeModal={closeSelectAreaModal}
        setSelectedArea={setSelectedArea}
        setChapterSelectionType={setChapterSelectionType}
      />
    </SafeScreen>
  );
};

export default InsightsScreen;

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
