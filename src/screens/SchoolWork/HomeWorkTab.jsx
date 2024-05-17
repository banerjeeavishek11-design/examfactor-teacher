import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/theme';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { SafeScreen } from '@/components/template';
import Circularprogressbar from '@/components/template/CircularProgressBar/Circularprogressbar';
import UpArrow from '@/theme/assets/images/uparrow.png';
import DownArrow from '@/theme/assets/images/Downarrow.png';
import leftArrow from '../../theme/assets/images/gradientlefttarrow.png';
import rightArrow from '../../theme/assets/images/gradientrightarrow.png';
import ActivatedHomeWork from '@/theme/assets/images/homework.png';
import { Divider } from 'react-native-paper';
import RemindStudentBottomSheet from '@/components/BottomSheet/SchoolWork/RemindStudentBottomSheet';
import PrimaryGradient from '@/components/template/LinearGradient/PrimaryGradient';
import { getStudentHomeworkReports } from '../../services/SchoolWorkServices/schoolWorkServices';
import { getChaptersBySubjectId } from '../../services/chapterListService';
import { notifyMessage } from '../../utils/error-toast-API';
import { getTopicDescById } from '../../utils/namesByIds';
import moment from 'moment';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const leaderboardData = [
  { name: 'Rahul K.', progress: 88, achievable: 87 },
  { name: 'Sanya M.', progress: 85, achievable: 81 },
  { name: 'Karan K.', progress: 74, achievable: 78 },
  { name: 'Piyush K.', progress: 81, achievable: 87 },
  { name: 'Anmol S.', progress: 78, achievable: 84 },
];

const HomeWorkTab = () => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);
  const sectionName = useSelector((state) => state.selectedSubject.sectionName);
  const selectedSubjectId = useSelector((state) => state.selectedSubject.subject);
  const homeFromMMKV = storage.getString('activateHomework');
  const homework = homeFromMMKV ? JSON.parse(homeFromMMKV) : [];
  const resFromMMKV = storage.getString('teacherDetails');
  const teacherDetails = resFromMMKV ? JSON.parse(resFromMMKV) : null;
  const [expandedCards, setExpandedCards] = useState({});
  const [expandCardId, setExpandedCardId] = useState('');
  const [openRemindStudentBottomSheet, setOpenRemindStudentBottomSheet] = useState(false);
  // const [activatedHomeWork, setActivatedHomeWork] = useState(false);
  const [showChapterName, setShowChapterName] = useState();
  const [sectionId, setSectionId] = useState();
  const [chapList, setChapList] = useState([]);
  const [chapListIndex, setChapListIndex] = useState(0);
  const [chapterId, setChapterId] = useState();
  const [gradeId, setGradeId] = useState();
  const [topicId, setTopicId] = useState('');
  const [data, setData] = useState([]);
  const [topicWiseResponse, setTopicWiseResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (teacherDetails && teacherDetails.length > 0) {
      for (let item of teacherDetails) {
        if (item.sectionName === sectionName) {
          setSectionId(item.id);
          setGradeId(item.gradeId);
          return;
        }
      }
    }
  }, [sectionName, teacherDetails]);

  useFocusEffect(
    React.useCallback(() => {
      getAllChaptersDetails(selectedSubjectId);
    }, [selectedSubjectId])
  );

  useFocusEffect(
    React.useCallback(() => {
      setShowChapterName(chapList[chapListIndex]?.chapterDesc);
    }, [chapList[chapListIndex]])
  );

  const getAllChaptersDetails = (subjectId) => {
    setIsLoading(true);
    getChaptersBySubjectId(subjectId)
      .then((res) => {
        res.data.chapters.sort((a, b) => a.displaySeq - b.displaySeq);
        setChapList(res.data.chapters);
        setChapterId(res.data.chapters[0].chapterId);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('unabled to get chapter details');
        }
        setIsLoading(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getStudentHomeworks();
    }, [chapterId])
  );

  const getStudentHomeworks = () => {
    let params = {
      sectionId: sectionId,
      subjectId: selectedSubjectId,
      chapterId: chapterId,
    };
    setIsLoading(true);
    getStudentHomeworkReports(params)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('error', error);
        setIsLoading(false);
      });
  };

  const toggleContent = (id) => {
    setExpandedCardId(id);
    setExpandedCards((prevState) => ({
      [id]: !prevState[id],
    }));
    getTopicWiseDetails(id);
  };

  const getTopicWiseDetails = (topicId) => {
    let params = {
      sectionId: sectionId,
      subjectId: selectedSubjectId,
      chapterId: chapterId,
      topicId: topicId,
    };
    setIsLoading(true);
    getStudentHomeworkReports(params)
      .then((res) => {
        setIsLoading(false);
        setTopicWiseResponse(res.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  const handleActiveHomework = () => {
    // setActivatedHomeWork(true);
    navigation.navigate('ActivateHomeWorkTab');
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

  let payloadForReminder = {
    gradeId: gradeId,
    sectionId: sectionId,
    subjectId: selectedSubjectId,
    chapterId: chapterId,
    topicId: topicId,
  };

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={[layout.paddingForFullScreen, {}]}>
        {isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={colors.termsLinkColor} />
          </View>
        ) : (
          <>
            {homework.length > 0 && (
              <View
                style={[
                  layout.row,
                  layout.justifyBetween,
                  { marginTop: '4%', marginHorizontal: '2%' },
                ]}
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
            {homework.length > 0 ? (
              <>
                {data.length !== 0 && (
                  <Text
                    style={[
                      fonts.size_14,
                      fonts.bold,
                      { color: colors.white, opacity: 0.4, marginTop: '2%' },
                    ]}
                  >
                    Last 7 Days Assigned homework
                  </Text>
                )}
                {data.length === 0 && (
                  <View style={[layout.justifyCenter, layout.itemsCenter, { height: 450 }]}>
                    <Text style={[fonts.size_14, fonts.fontWeignt_600, { color: colors.white }]}>
                      No Data
                    </Text>
                  </View>
                )}
                {data.map((ele, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => toggleContent(ele.topicId)}
                      key={index}
                      style={[
                        layout.fullWidth,
                        {
                          backgroundColor: colors.cardBackgroundColor,
                          height: expandedCards[ele.topicId] ? 'auto' : isTablet ? 110 : 110,
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
                            numberOfLines={1}
                            style={[fonts.size_14, fonts.bold, { color: colors.white, top: -6 }]}
                          >
                            {getTopicDescById(chapList, ele.topicId)}
                          </Text>
                          <Text
                            style={[
                              fonts.size_10,
                              fonts.fontWeight_small,
                              { color: colors.backButtonColor, marginBottom: '8%' },
                            ]}
                          >
                            Student Completed The Homework
                          </Text>
                        </View>
                        <View style={{ width: isTablet ? '0%' : '20%', top: -5 }}>
                          <Circularprogressbar
                            total={ele.totalStudentCount}
                            progress={ele.totalStudentCompletionCount}
                          />
                        </View>
                        <View style={{ width: '5%' }}>
                          <TouchableOpacity>
                            {expandCardId === ele.topicId && expandedCards[ele.topicId] ? (
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
                          layout.paddingForCard,
                          { paddingTop: '0%', marginTop: isTablet ? '-1%' : null },
                        ]}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setOpenRemindStudentBottomSheet(true);
                            setTopicId(ele.topicId);
                          }}
                        >
                          <Text
                            style={[
                              fonts.size_12,
                              fonts.fontWeignt_600,
                              {
                                color: colors.termsLinkColor,
                                textDecorationLine: 'underline',
                                marginTop: -18,
                              },
                            ]}
                          >
                            Remind Students
                          </Text>
                        </TouchableOpacity>
                      </View>

                      {expandCardId === ele.topicId && expandedCards[ele.topicId] ? (
                        <View>
                          <View style={[layout.paddingForCard, { paddingTop: '0%' }]}>
                            {ele.remindOn !== null ? (
                              <Text
                                style={[
                                  fonts.size_12,
                                  fonts.fontWeight_small,
                                  {
                                    color: '#7A7A82',
                                  },
                                ]}
                              >
                                Reminded on {moment(ele.remindOn).format('MMM DD, YYYY')}
                              </Text>
                            ) : null}
                            <View style={[layout.itemsCenter]}>
                              <Divider
                                style={{
                                  width: '100%',
                                  backgroundColor: colors.lineBackgroundColor,
                                }}
                              />
                            </View>
                          </View>
                          <View>
                            <View style={styles.header}>
                              <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
                                Name
                              </Text>
                              <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
                                Home Work Time
                              </Text>
                              <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
                                Progress
                              </Text>
                            </View>
                            {topicWiseResponse[0]?.b2BStudentHomeWorkReportList?.map(
                              (item, index) => (
                                <View
                                  key={index}
                                  style={[
                                    styles.row,
                                    index % 2 === 0 ? styles.evenRow : styles.oddRow,
                                    index === leaderboardData.length - 1 && styles.lastRow,
                                    { borderRadius: 14 },
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
                                      {item.timeSpent}
                                    </Text>
                                    <Text
                                      style={[
                                        fonts.size_14,
                                        fonts.fontWeight_small,
                                        { color: colors.white, opacity: 0.7 },
                                      ]}
                                    >
                                      {item.completionPercentage} %
                                    </Text>
                                  </View>
                                </View>
                              )
                            )}
                          </View>
                        </View>
                      ) : null}
                      {expandedCards[ele.id] && (
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
                  source={ActivatedHomeWork}
                  resizeMode="contain"
                />
                <Text style={[fonts.size_20, fonts.fontWeignt_600, { color: colors.white }]}>
                  Home Work not assigned
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
                  Go to activate and assign Home Work for students at first
                </Text>
                <TouchableOpacity onPress={() => handleActiveHomework()}>
                  <PrimaryGradient styleProp={[styles.loginButton, layout.justifyCenter]}>
                    <View style={[layout.display, layout.rowHCenter]}>
                      <Text
                        style={[fonts.size_16, fonts.bold, { color: colors.loginBtnTextColor }]}
                      >
                        Activate Home Work
                      </Text>
                    </View>
                  </PrimaryGradient>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </ScrollView>
      <RemindStudentBottomSheet
        setOpenRemindStudentBottomSheet={setOpenRemindStudentBottomSheet}
        openRemindStudentBottomSheet={openRemindStudentBottomSheet}
        payloadForReminder={payloadForReminder}
        getStudentHomeworks={getStudentHomeworks}
      />
    </SafeScreen>
  );
};

export default HomeWorkTab;

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
  loader: {
    height: 500,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
