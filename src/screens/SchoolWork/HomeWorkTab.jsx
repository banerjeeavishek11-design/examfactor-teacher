/* eslint-disable prettier/prettier */
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
import ActivatedHomeWork from '@/theme/assets/images/homework.png';
import { Divider } from 'react-native-paper';
import RemindStudentBottomSheet from '@/components/BottomSheet/SchoolWork/RemindStudentBottomSheet';
import PrimaryGradient from '@/components/template/LinearGradient/PrimaryGradient';
import { getStudentHomeworkReports } from '../../services/SchoolWorkServices/schoolWorkServices';
import { getTopicDescById } from '../../utils/namesByIds';
import moment from 'moment';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const HomeWorkTab = () => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);
  const sectionName = useSelector((state) => state.selectedSubject.sectionName);
  const selectedSubjectId = useSelector((state) => state.selectedSubject.subject);
  const chapterId = useSelector((state) => state.selectedChapter.chapterId);
  const chapList = useSelector((state) => state.selectedChapter.chapList);

  const homeFromMMKV = storage.getString('activateHomework');
  const homework = homeFromMMKV ? JSON.parse(homeFromMMKV) : [];
  const resFromMMKV = storage.getString('teacherDetails');
  const teacherDetails = resFromMMKV ? JSON.parse(resFromMMKV) : null;
  const [expandedCards, setExpandedCards] = useState({});
  const [expandCardId, setExpandedCardId] = useState('');
  const [openRemindStudentBottomSheet, setOpenRemindStudentBottomSheet] = useState(false);
  const [sectionId, setSectionId] = useState();
  const [gradeId, setGradeId] = useState();
  const [topicId, setTopicId] = useState('');
  const [data, setData] = useState([]);
  const [topicWiseResponse, setTopicWiseResponse] = useState([]);
  const [seeMaxStudent, setSeeMaxStudent] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [topicsLoading, setTopicsLoading] = useState(false);

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
      getStudentHomeworks();
    }, [sectionId, chapterId])
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
        const sortedData = res.data.sort((a, b) => {
          if (a.topicId < b.topicId) {
            return -1;
          }
          if (a.topicId > b.topicId) {
            return 1;
          }
          return 0;
        });
        setData(sortedData);
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
    setTopicsLoading(true);
    getStudentHomeworkReports(params)
      .then((res) => {
        setTopicsLoading(false);
        setTopicWiseResponse(res.data);
      })
      .catch((error) => {
        setTopicsLoading(false);
        console.log('error', error);
      });
  };

  const handleActiveHomework = () => {
    // setActivatedHomeWork(true);
    navigation.navigate('ActivateHomeWorkTab');
  };

  function formatNameWithInitial(fullName) {
    fullName = fullName.trim();
    const parts = fullName.split(' ');
    if (parts.length === 1) {
      return fullName;
    }
    const firstName = parts.shift();
    const initials = [];
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].length > 0) {
        initials.push(parts[i][0].toUpperCase() + '.');
      }
    }
    const formattedName = [firstName, ...initials].join(' ');
    return formattedName;
  }

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
                          height: expandedCards[ele.topicId] ? 'auto' : isTablet ? 125 : 110,
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
                        <View style={{ width: '63%', marginBottom: '4%' }}>
                          <Text
                            numberOfLines={1}
                            style={[fonts.size_14, fonts.bold, { color: colors.white }]}
                          >
                            {getTopicDescById(chapList, ele.topicId)}
                          </Text>
                          <Text
                            style={[
                              fonts.size_12,
                              fonts.fontWeight_small,
                              { color: colors.backButtonColor },
                            ]}
                          >
                            Student Completed The Homework
                          </Text>
                        </View>
                        <View style={{ width: isTablet ? '0%' : '8%', top: -5 }}>
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
                          disabled={ele.remindOn !== null}
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
                              },
                            ]}
                          >
                            Remind Students
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {expandCardId === ele.topicId && expandedCards[ele.topicId] ? (
                        <View>
                          {topicsLoading ? (
                            <View style={{ paddingVertical: '2%' }}>
                              <ActivityIndicator size="large" color={colors.termsLinkColor} />
                            </View>
                          ) : (
                            <>
                              <View
                                style={[
                                  layout.paddingForCard,
                                  { marginTop: isTablet ? '-6%' : '-7%' },
                                ]}
                              >
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
                                {topicWiseResponse[0]?.b2BStudentHomeWorkReportList?.length ===
                                0 ? (
                                    <View
                                      style={[
                                        layout.justifyCenter,
                                        layout.itemsCenter,
                                        { marginVertical: '3%' },
                                      ]}
                                    >
                                      <Text
                                        style={[
                                          fonts.fontWeight_small,
                                          fonts.size_14,
                                          { color: colors.gray100 },
                                        ]}
                                      >
                                      No Data Found
                                      </Text>
                                    </View>
                                  ) : (
                                    <View style={styles.header}>
                                      <Text
                                        style={[fonts.size_14, fonts.bold, { color: colors.white }]}
                                      >
                                      Name
                                      </Text>
                                      <Text
                                        style={[fonts.size_14, fonts.bold, { color: colors.white }]}
                                      >
                                      Home Work Time
                                      </Text>
                                      <Text
                                        style={[fonts.size_14, fonts.bold, { color: colors.white }]}
                                      >
                                      Progress
                                      </Text>
                                    </View>
                                  )}
                                {topicWiseResponse[0]?.b2BStudentHomeWorkReportList?.map(
                                  (item, index) => {
                                    return (
                                      <>
                                        {index < seeMaxStudent && (
                                          <View
                                            key={item.studentName}
                                            style={[
                                              styles.row,
                                              index % 2 === 0 ? styles.evenRow : styles.oddRow,
                                              index ===
                                                topicWiseResponse[0]?.b2BStudentHomeWorkReportList
                                                  ?.length -
                                                  1 && {
                                                borderBottomLeftRadius: 14,
                                                borderBottomRightRadius: 14,
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
                                              {formatNameWithInitial(item.studentName)}
                                            </Text>
                                            <View
                                              style={[
                                                layout.row,
                                                layout.itemsCenter,
                                                {
                                                  width: '70%',
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
                                                {item?.timeSpent < 60
                                                  ? item?.timeSpent + ' Sec'
                                                  : Math.floor(item?.timeSpent / 60) + ' Min'}
                                              </Text>
                                              <Text
                                                style={[
                                                  fonts.size_14,
                                                  fonts.fontWeight_small,
                                                  !isTablet && { opacity: 0.7, right: 24 },
                                                  { color: colors.white },
                                                ]}
                                              >
                                                {item.completionPercentage} %
                                              </Text>
                                            </View>
                                          </View>
                                        )}
                                      </>
                                    );
                                  }
                                )}
                              </View>
                            </>
                          )}
                        </View>
                      ) : null}
                      {topicWiseResponse[0]?.b2BStudentHomeWorkReportList?.length > 5 && (
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
