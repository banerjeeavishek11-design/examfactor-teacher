import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useFocusEffect } from '@react-navigation/native';
import Classwork from '@/theme/assets/images/classwork.png';
import PrimaryGradient from '@/components/template/LinearGradient/PrimaryGradient';
import Progressbar from '@/components/template/Progressbar/Progressbar';
import UpArrow from '@/theme/assets/images/uparrow.png';
import DownArrow from '@/theme/assets/images/Downarrow.png';
import leftArrow from '../../theme/assets/images/gradientlefttarrow.png';
import rightArrow from '../../theme/assets/images/gradientrightarrow.png';
import Circularprogressbar from '@/components/template/CircularProgressBar/Circularprogressbar';
import { getChaptersBySubjectId } from '../../services/chapterListService';
import {
  getStudentClassworkReports,
  getStudentWiseClassworkReports,
} from '../../services/SchoolWorkServices/schoolWorkServices';
import { Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { notifyMessage } from '../../utils/error-toast-API';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const leaderboardData = [
  { name: 'Rahul K.', progress: 88, achievable: 87 },
  { name: 'Sanya M.', progress: 85, achievable: 81 },
  { name: 'Karan K.', progress: 74, achievable: 78 },
  { name: 'Piyush K.', progress: 81, achievable: 87 },
  { name: 'Anmol S.', progress: 78, achievable: 84 },
];

const ClassWorkTab = () => {
  const { colors, layout, fonts } = useTheme();
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);
  const sectionName = useSelector((state) => state.selectedSubject.sectionName);
  const selectedSubjectId = useSelector((state) => state.selectedSubject.subject);
  const classFromMMKV = storage.getString('activateClasswork');
  const classwork = classFromMMKV ? JSON.parse(classFromMMKV) : [];
  const resFromMMKV = storage.getString('teacherDetails');
  const teacherDetails = resFromMMKV ? JSON.parse(resFromMMKV) : null;
  const [expandedCards, setExpandedCards] = useState({});
  const [expandCardId, setExpandedCardId] = useState('');
  // const [activatedTest, setActivatedTest] = useState(false);
  const [showChapterName, setShowChapterName] = useState();
  const [chapList, setChapList] = useState([]);
  const [chapListIndex, setChapListIndex] = useState(0);
  const [sectionId, setSectionId] = useState();
  const [chapterId, setChapterId] = useState();
  const [assessmentWiseReport, setAssessmentWiseReport] = useState([]);
  const [data, setData] = useState([]);

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

  useFocusEffect(
    React.useCallback(() => {
      getAllChaptersDetails(selectedSubjectId);
      setChapListIndex(0);
    }, [selectedSubjectId])
  );

  useFocusEffect(
    React.useCallback(() => {
      setShowChapterName(chapList[chapListIndex]?.chapterDesc);
    }, [chapList[chapListIndex]])
  );

  const getAllChaptersDetails = (subjectId) => {
    // setIsLoading(true);
    getChaptersBySubjectId(subjectId)
      .then((res) => {
        res.data.chapters.sort((a, b) => a.displaySeq - b.displaySeq);
        setChapList(res.data.chapters);
        setChapterId(res.data.chapters[0].chapterId);
        // setIsLoading(false);
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('unabled to get chapter details');
        }
        // setIsLoading(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getStudentClasswork();
    }, [chapterId])
  );

  const getStudentClasswork = () => {
    let params = {
      sectionId: sectionId,
      subjectId: selectedSubjectId,
      chapterId: chapterId,
    };
    getStudentClassworkReports(params)
      .then((res) => {
        setData(res.data);
        // setAssessmentId(res.data[0].assessmentId);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const handleActiveChapter = () => {
    // setActivatedTest(true);
  };

  const toggleContent = (id) => {
    setExpandedCardId(id);
    setExpandedCards((prevState) => ({
      [id]: !prevState[id],
    }));
    let params = {
      sectionId: sectionId,
      subjectId: selectedSubjectId,
      chapterId: chapterId,
      assessmentId: id,
    };
    getStudentWiseClassworkReports(params)
      .then((res) => {
        setAssessmentWiseReport(res.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const handleChapterChangePress = (type) => {
    const index = chapListIndex;
    if (type === 'right') {
      if (index + 1 >= chapList.length) {
        setChapListIndex(0);
        setChapterId(chapList[0].chapterId);
      } else {
        setChapListIndex((prev) => prev + 1);
        setChapterId(chapList[index + 1].chapterId);
      }
    } else {
      if (index - 1 < 0) {
        setChapListIndex(chapList.length - 1);
        setChapterId(chapList[chapList.length - 1].chapterId);
      } else {
        setChapListIndex((prev) => prev - 1);
        setChapterId(chapList[index - 1].chapterId);
      }
    }
  };

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={[layout.paddingForFullScreen, {}]}>
        {classwork.length > 0 && (
          <View
            style={[layout.row, layout.justifyBetween, { marginTop: '4%', marginHorizontal: '2%' }]}
          >
            <TouchableOpacity
              onPress={() => handleChapterChangePress('left')}
              disabled={chapListIndex === 0}
              style={{ opacity: chapListIndex === 0 ? 0.5 : 1 }}
            >
              <Image source={leftArrow} style={{ width: 28, height: 16 }} />
            </TouchableOpacity>
            <Text
              style={[
                fonts.size_13,
                fonts.bold,
                { color: colors.white, width: '80%', textAlign: 'center' },
              ]}
            >
              C{chapListIndex + 1} : {showChapterName}
            </Text>
            <TouchableOpacity
              onPress={() => handleChapterChangePress('right')}
              style={{
                opacity: chapListIndex === chapList.length - 1 ? 0.5 : 1,
              }}
              disabled={chapListIndex === chapList.length - 1}
            >
              <Image source={rightArrow} style={{ width: 28, height: 16 }} />
            </TouchableOpacity>
          </View>
        )}

        {classwork.length > 0 ? (
          <>
            {data?.map((ele) => {
              return (
                <TouchableOpacity
                  onPress={() => toggleContent(ele.assessmentId)}
                  key={ele.assessmentId}
                  style={[
                    layout.fullWidth,
                    {
                      backgroundColor: colors.cardBackgroundColor,
                      height: expandedCards[ele.assessmentId] ? 'auto' : 130,
                      borderRadius: 14,
                      marginTop: '3%',
                    },
                  ]}
                >
                  <View
                    style={[
                      layout.display,
                      layout.rowHCenter,
                      layout.justifyBetween,
                      layout.paddingForCard,
                      { paddingBottom: '0%' },
                    ]}
                  >
                    <View style={{ width: '55%' }}>
                      <Text
                        numberOfLines={2}
                        style={[fonts.size_14, fonts.bold, { color: colors.white, top: -6 }]}
                      >
                        {ele.assessmentName}
                      </Text>
                      <Text
                        style={[
                          fonts.size_10,
                          fonts.fontWeight_small,
                          { color: colors.backButtonColor, marginBottom: '5%' },
                        ]}
                      >
                        Student Completed the test
                      </Text>
                    </View>
                    <View style={{ width: isTablet ? '0%' : '20%', top: -5 }}>
                      <Circularprogressbar
                        total={ele.totalStudents}
                        progress={ele.totalCompletedStudents}
                      />
                    </View>
                    <View style={{ width: '5%' }}>
                      <TouchableOpacity>
                        {expandCardId === ele.assessmentId && expandedCards[ele.assessmentId] ? (
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
                      { paddingTop: '2%', marginTop: isTablet ? '-3%' : null },
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
                    <View style={{ width: '40%', left: 10 }}>
                      <Progressbar progress={ele.averageScore / 100} color="#3DD598" />
                    </View>
                    <Text
                      style={[
                        fonts.size_12,
                        fonts.fontWeight_small,
                        { color: colors.white, left: 25 },
                      ]}
                    >
                      {ele.averageScore}/{ele.fullMark}
                    </Text>
                  </View>

                  {expandCardId === ele.assessmentId && expandedCards[ele.assessmentId] ? (
                    <View>
                      <View
                        style={[layout.itemsCenter, layout.paddingForCard, { paddingTop: '0%' }]}
                      >
                        <Divider
                          style={{
                            width: '100%',
                            backgroundColor: colors.lineBackgroundColor,
                          }}
                        />
                      </View>
                      <View>
                        <View style={styles.header}>
                          <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
                            Name
                          </Text>
                          <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
                            Score
                          </Text>
                          <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
                            Accuracy
                          </Text>
                        </View>
                        {assessmentWiseReport?.map((item, index) => (
                          <View
                            key={index}
                            style={[
                              styles.row,
                              index % 2 === 0 ? styles.evenRow : styles.oddRow,
                              index === leaderboardData.length - 1 && styles.lastRow,
                            ]}
                          >
                            <Text
                              style={[
                                fonts.size_14,
                                fonts.fontWeight_small,
                                { color: colors.white, opacity: 0.7 },
                              ]}
                            >
                              {item.studentName}
                            </Text>
                            <View
                              style={[
                                layout.row,
                                layout.itemsCenter,
                                {
                                  width: '55%',
                                  justifyContent: 'space-between',
                                },
                              ]}
                            >
                              <Text
                                style={[
                                  fonts.size_14,
                                  fonts.fontWeight_small,
                                  { color: colors.white, opacity: 0.7 },
                                ]}
                              >
                                {item.score}
                              </Text>
                              <Text
                                style={[
                                  fonts.size_14,
                                  fonts.fontWeight_small,
                                  { color: colors.white, opacity: 0.7 },
                                ]}
                              >
                                {item.accuracy} %
                              </Text>
                            </View>
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : null}
                  {expandedCards[ele.assessmentId] && (
                    <TouchableOpacity style={{ marginTop: '4%', marginBottom: '4%' }}>
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
                alignItems: 'center',
              },
            ]}
          >
            <Image
              style={{ width: 230, height: 230, marginTop: '4%' }}
              source={Classwork}
              resizeMode="contain"
            />
            <Text
              style={[
                fonts.size_20,
                fonts.fontWeignt_600,
                { color: colors.white, textAlign: 'center' },
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
                  textAlign: 'center',
                  width: '70%',
                },
              ]}
            >
              Go to activate and activate test for class work
            </Text>
            <TouchableOpacity onPress={handleActiveChapter}>
              <PrimaryGradient styleProp={[styles.loginButton, layout.justifyCenter]}>
                <View style={[layout.display, layout.rowHCenter]}>
                  <Text style={[fonts.size_16, fonts.bold, { color: colors.loginBtnTextColor }]}>
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
    width: '100%',
    borderRadius: 9,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '4%',
    paddingRight: '4%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45,
    paddingLeft: '4%',
    paddingRight: '4%',
    marginTop: '2%',
  },
  evenRow: {
    backgroundColor: '#2C2C39',
  },
  oddRow: {
    backgroundColor: '#222230',
  },
});
