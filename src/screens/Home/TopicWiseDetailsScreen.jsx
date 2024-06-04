import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/theme';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ImageVariant } from '@/components/atoms';
import { useSelector } from 'react-redux';
import LeftArrow from '@/theme/assets/images/leftarrow.png';
import UpArrow from '@/theme/assets/images/uparrow.png';
import DownArrow from '@/theme/assets/images/Downarrow.png';
import { SafeScreen } from '@/components/template';
import Circularprogressbar from '@/components/template/CircularProgressBar/Circularprogressbar';
import Progressbar from '@/components/template/Progressbar/Progressbar';
import { getTopicDescById, getChapterDescById } from '../../utils/namesByIds';
import { getStudentHomeworkReport } from '../../services/subjectWiseReportService';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const TopicWiseDetailsScreen = () => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);
  const { topics, chapterName, subjectName, chapList } = route.params || {};
  const sectionName = useSelector((state) => state.selectedSubject.sectionName);
  const subjectId = useSelector((state) => state.selectedSubject.subject);
  const resFromMMKV = storage.getString('teacherDetails');
  const teacherDetails = resFromMMKV ? JSON.parse(resFromMMKV) : null;
  const [expandedCards, setExpandedCards] = useState({});
  const [sectionId, setSectionId] = useState(null);
  const [gradeId, setGradeId] = useState(null);
  const [homeworkReportData, setHomeworkReportData] = useState();
  const [seeMaxStudent, setSeeMaxStudent] = useState(5);
  // const [selectedTopicId, setSelectedTopicId] = useState();

  useEffect(() => {
    if (teacherDetails && teacherDetails.length > 0) {
      for (let item of teacherDetails) {
        if (item.sectionName === sectionName) {
          setGradeId(item.gradeId);
          setSectionId(item.id);
          return;
        }
      }
    }
  }, [sectionName, teacherDetails]);

  const toggleContent = (id) => {
    // setSelectedTopicId(id);
    setExpandedCards((prevState) => ({
      [id]: !prevState[id],
    }));
    getHomeworkReports(id);
  };

  useEffect(() => {
    const initialExpandedState = {};
    topics.forEach((ele) => {
      initialExpandedState[ele.topicId] = false;
    });
    setExpandedCards(initialExpandedState);
  }, []);

  const getHomeworkReports = (topicId) => {
    let params = {
      sectionId: sectionId,
      topicId: topicId,
      gradeId: gradeId,
      subjectId: subjectId,
      chapterId: chapterName,
      // duration: 0,
    };
    getStudentHomeworkReport(params)
      .then((res) => {
        setHomeworkReportData(res.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <SafeScreen>
      <View
        style={[
          layout.fullWidth,
          layout.paddingForFullScreen,
          {
            height: 'auto',
            backgroundColor: colors.headerBackgroundColor,
          },
        ]}
      >
        <TouchableOpacity
          style={[layout.display, layout.rowHCenter, { height: 'auto' }]}
          onPress={() =>
            navigation.navigate('SubjectDetailsScreen', {
              subjectName: subjectName,
              chapList: chapList,
            })
          }
        >
          <ImageVariant
            testID="brand-img"
            style={{
              width: 10,
              height: 11,
              tintColor: colors.backButtonColor,
            }}
            source={LeftArrow}
            resizeMode="contain"
          />
          <Text style={[fonts.size_16, fonts.bold, { color: colors.backButtonColor, left: 5 }]}>
            {getChapterDescById(chapList, chapterName)}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={[layout.paddingForFullScreen, isTablet && { marginTop: '-4%' }]}
      >
        {topics.map((ele) => {
          const progressPercentage = ele?.progress / 100;
          return (
            <TouchableOpacity
              onPress={() => toggleContent(ele?.topicId)}
              key={ele?.topicId}
              style={[
                layout.fullWidth,
                // layout.paddingForCard,
                {
                  backgroundColor: colors.cardBackgroundColor,
                  height: expandedCards[ele?.topicId] ? 'auto' : 100,
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
                  isTablet ? { padding: 20 } : layout.paddingForCard,
                  { paddingBottom: '0%' },
                ]}
              >
                <View style={{ width: '60%' }}>
                  <Text
                    numberOfLines={1}
                    style={[
                      isTablet ? fonts.size_16 : fonts.size_14,
                      fonts.bold,
                      { color: colors.white, top: -6 },
                    ]}
                  >
                    {getTopicDescById(chapList, ele?.topicId)}
                  </Text>
                  <Text
                    style={[
                      fonts.size_13,
                      fonts.fontWeight_small,
                      { color: colors.backButtonColor },
                    ]}
                  >
                    Students completed the homework
                  </Text>
                </View>
                <View style={{ width: '25%', top: -5 }}>
                  <Circularprogressbar progress={ele?.progress} />
                </View>
                <View style={{ width: '5%' }}>
                  <TouchableOpacity>
                    {expandedCards[ele?.topicId] ? (
                      <Image
                        style={{ width: 14, height: 10 }}
                        source={UpArrow}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        style={{ width: 14, height: 10 }}
                        source={DownArrow}
                        resizeMode="contain"
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {expandedCards[ele?.topicId] ? (
                <View>
                  <View style={[isTablet ? { padding: 20 } : layout.paddingForCard]}>
                    <Text
                      style={[
                        fonts.size_12,
                        fonts.fontWeight_small,
                        {
                          color: ele?.progress <= 60 ? '#FFAB48' : '#3DD598',
                          // marginTop: "5%",
                        },
                      ]}
                    >
                      Progress {`${ele?.progress}%`}
                    </Text>
                    <View style={{ marginTop: isTablet ? '1%' : '4%' }}>
                      <Progressbar
                        progress={progressPercentage}
                        color={progressPercentage <= 0.6 ? '#FFAB48' : '#3DD598'}
                      />
                    </View>
                  </View>
                  <View>
                    <View style={styles.header}>
                      <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>Name</Text>
                      <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
                        Progress
                      </Text>
                      <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
                        Achievable
                      </Text>
                    </View>
                    {homeworkReportData?.map((item, index) => (
                      <>
                        {index < seeMaxStudent && (
                          <View
                            key={item.studentId}
                            style={[
                              styles.row,
                              index % 2 === 0 ? styles.evenRow : styles.oddRow,
                              index === homeworkReportData.length - 1 && {
                                borderBottomLeftRadius: 14,
                                borderBottomRightRadius: 14,
                              },
                            ]}
                          >
                            <Text
                              style={[
                                fonts.size_14,
                                fonts.fontWeight_small,
                                { color: colors.gray200 },
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
                                  { color: colors.gray200 },
                                ]}
                              >
                                {`${item.completionPercentage}%`}
                              </Text>
                              <Text
                                style={[
                                  fonts.size_14,
                                  fonts.fontWeight_small,
                                  { color: colors.gray200 },
                                ]}
                              >
                                {`${item.score}/100`}
                              </Text>
                            </View>
                          </View>
                        )}
                      </>
                    ))}
                  </View>
                </View>
              ) : null}
              {homeworkReportData.length > 5 && expandedCards[ele.topicId] && (
                <TouchableOpacity
                  onPress={() => {
                    setSeeMaxStudent(seeMaxStudent === 5 ? 500 : 5);
                  }}
                  style={{ marginVertical: isTablet ? '2%' : '4%' }}
                >
                  <Text
                    style={[
                      fonts.size_14,
                      fonts.fontWeignt_600,
                      fonts.alignCenter,
                      { color: colors.termsLinkColor },
                    ]}
                  >
                    {seeMaxStudent === 5 ? 'See More' : 'See Less'}
                  </Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeScreen>
  );
};

export default TopicWiseDetailsScreen;

const styles = StyleSheet.create({
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
