import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import { Concentrix, SafeScreen } from '@/components/template';
import { ImageVariant } from '@/components/atoms';
import LeftArrow from '@/theme/assets/images/leftarrow.png';
import RightArrow from '@/theme/assets/images/rightarrow.png';
import UpFullArrow from '@/theme/assets/images/upfullarrow.png';
import { useRoute } from '@react-navigation/native';
import Progressbar from '@/components/template/Progressbar/Progressbar';
import { Divider } from 'react-native-paper';
import {
  bookMarkedQuestionsList,
  mySubjectInsightAssessmentDetails,
  mySubjectInsightByStudentId,
  mySubjectInsightScores,
  mySubjectInsightTimeSpend,
} from '../../services/ReportsServices/reportsServices';
import { useSelector } from 'react-redux';
import { notifyMessage } from '../../utils/error-toast-API';
import { formatSecond2 } from '../../utils/date-time-utility';
import ChapterInsightCarousel from '../../components/carousel/ChapterInsightCarousel';

const StudentWiseReportScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { studentDetails } = route.params || {};
  const selectedSubjectId = useSelector((state) => state.selectedSubject.subject);
  const { colors, layout, fonts } = useTheme();
  const [specificStudentDetails, setSpecificStudentDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [timeSpentData, setTimespentData] = useState();
  const [classworkData, setClassworkData] = useState();
  const [classworkInsightDetails, setClassworkInsightDetails] = useState();
  const [allBookmarkedQuestionsDetails, setAllBookmarkedQuestionsDetails] = useState();
  const [chapterScoreMap, setChapterScoreMap] = useState({});
  const overallProgress = specificStudentDetails
    ? specificStudentDetails?.completionPercentage / 100
    : 0;
  const chaptersStatusInfo = specificStudentDetails?.chaptersStatusInfo || [];
  useEffect(() => {
    mySubjectInsight();
    mySubjectTimeSpend();
    getBookmarkQuestions();
    getMySubjectInsightData();
  }, [selectedSubjectId]);

  const mySubjectInsight = () => {
    setIsLoading(true);
    let params = {
      studentId: studentDetails?.userName,
    };
    mySubjectInsightByStudentId(selectedSubjectId, params)
      .then((res) => {
        if (res?.data?.summary) {
          setSpecificStudentDetails(res?.data?.summary);
          setClassworkData(res.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('unabled to fetch chapter details');
        }
        setIsLoading(false);
      });
  };

  const mySubjectTimeSpend = () => {
    setIsLoading(true);
    let params = {
      studentId: studentDetails?.userName,
    };
    mySubjectInsightTimeSpend(selectedSubjectId, params)
      .then((res) => {
        setTimespentData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('unabled to fetch chapter details');
        }
        setIsLoading(false);
      });
  };

  const findTimePercent = (seconds, _maxTime) => {
    if (!_maxTime || !seconds) return 0.1;
    return Math.floor((seconds / _maxTime) * 100);
  };

  const thisWeek = timeSpentData?.thisWeek?.timeSpent;
  const lastWeek = timeSpentData?.lastWeek?.timeSpent;
  const peers = timeSpentData?.peers?.timeSpent;
  const maxTime = Math.max(thisWeek || 0, lastWeek || 0, peers || 0);

  const goToClassWorkInsightScreen = () => {
    setIsLoading(true);
    let params = {
      studentId: studentDetails?.userName,
    };
    mySubjectInsightAssessmentDetails(selectedSubjectId, params)
      .then((res) => {
        setClassworkInsightDetails(res.data);
        setIsLoading(false);
        navigation.navigate('ClassWorkdetailsScreen', {
          classworkInsightDetails: classworkInsightDetails,
        });
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('unable to fetch assessmentDetails');
        }
        setIsLoading(false);
      });
  };

  const getBookmarkQuestions = () => {
    setIsLoading(true);
    let params = {
      subjectCode: selectedSubjectId,
      active: true,
      studentId: studentDetails?.userName,
    };
    bookMarkedQuestionsList(params)
      .then((res) => {
        setAllBookmarkedQuestionsDetails(res?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (
          error?.response?.status === 400 ||
          error.code === 'ERR-10' ||
          error?.response?.status === 401
        ) {
          notifyMessage('unable to fetch bookmarkdetails');
        }
      });
  };

  const getMySubjectInsightData = () => {
    mySubjectInsightScores(selectedSubjectId)
      .then((res) => {
        const chapterScoreMap = res.data.reduce((ac, ch) => ({ ...ac, [ch.chapterId]: ch }), {});
        setChapterScoreMap(chapterScoreMap);
      })
      .catch((error) => {
        console.log('error from chapter', error);
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('unabled to fetch score and study time');
        }
        setIsLoading(false);
      });
  };

  let data = [];
  const scoreArray = [];
  const timeSpentArray = [];

  chaptersStatusInfo?.forEach((cs) => {
    const score = chapterScoreMap[cs.chapterId]?.score || 0;
    const timespent = chapterScoreMap[cs.chapterId]?.timeSpent || 0;
    scoreArray.push(score);
    timeSpentArray.push(timespent);
  });
  data.push(scoreArray, timeSpentArray);

  return (
    <SafeScreen>
      <View
        style={[
          layout.fullWidth,
          layout.paddingForFullScreen,
          {
            height: 50,
            // backgroundColor: colors.headerBackgroundColor,
          },
        ]}
      >
        <TouchableOpacity
          style={[layout.display, layout.rowHCenter]}
          onPress={() => navigation.navigate('StudentLevelTab')}
        >
          <ImageVariant
            testID="brand-img"
            style={{
              width: 10,
              height: 11,
              tintColor: colors.backButtonColor,
              top: 3,
            }}
            source={LeftArrow}
            resizeMode="contain"
          />
          <Text style={[fonts.size_16, fonts.bold, { color: colors.backButtonColor, left: 5 }]}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: '10%' }}>
        {isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={colors.termsLinkColor} />
          </View>
        ) : (
          <View style={[layout.paddingForFullScreen, { paddingTop: '0%' }]}>
            <Text style={[fonts.size_14, fonts.bold, { color: colors.white, opacity: 0.5 }]}>
              {`${studentDetails?.firstName}'S REPORT`}
            </Text>
            <View
              style={[
                layout.fullWidth,
                layout.paddingForCard,
                {
                  backgroundColor: colors.cardBackgroundColor,
                  height: 'auto',
                  borderRadius: 12,
                  marginTop: '4%',
                },
              ]}
            >
              <View style={{ marginTop: '1%', alignItems: 'center' }}>
                <Concentrix
                  scorePercentage={
                    specificStudentDetails === undefined
                      ? 0
                      : specificStudentDetails?.achievableScore
                  }
                />
              </View>
              <View style={[layout.itemsCenter, { marginTop: '-20%' }]}>
                <Divider
                  style={{
                    width: '100%',
                    backgroundColor: colors.lineBackgroundColor,
                  }}
                />
              </View>
              <View
                style={[
                  layout.display,
                  layout.rowHCenter,
                  layout.justifyBetween,
                  { marginTop: '5%' },
                ]}
              >
                <Text style={[fonts.size_12, fonts.fontWeight_small, { color: colors.white }]}>
                  Overall Progress
                </Text>
                <Text style={[fonts.size_12, fonts.fontWeight_small, { color: colors.white }]}>
                  {`${specificStudentDetails?.completionPercentage || 0}% complete`}
                </Text>
              </View>
              <View style={{ marginTop: '3%' }}>
                <Progressbar progress={overallProgress} color={'#3DD598'} />
              </View>
            </View>
            {/* <BarChart /> */}
            {/* <StudentLevelBarChart
              data={data}
              colors={barChartColor}
              width={width}
              height={height}
              borderRadius={borderRadius}
              xAxisTitle={xAxisTitle}
              yAxisTitle={yAxisTitle}
            /> */}
            <View style={{ marginVertical: '2%' }}>
              <ChapterInsightCarousel
                data={data}
                labels={chaptersStatusInfo.map((cs, idx) => `C${idx + 1}`)}
                colors={[['#7af4fc', '#27d4fa']]}
                width={Dimensions.get('window').width - 30}
                otherStyles={{ borderRadius: 6, marginTop: '4%', paddingTop: 30 }}
                barBorderRadius={3}
                height={220}
                xAxisTitle={'Chapters'}
                yAxisTitle={'Achievable Score %'}
              />
            </View>
            <View
              style={[
                layout.display,
                layout.rowHCenter,
                layout.justifyBetween,
                { marginTop: '8%' },
              ]}
            >
              <Text style={[fonts.size_14, fonts.bold, { color: colors.white, opacity: 0.4 }]}>
                HOME WORK INSIGHTS
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('HomeWorkDetailsScreen', {
                    chapterDetails: specificStudentDetails?.chaptersStatusInfo,
                    studentDetails: studentDetails,
                  })
                }
              >
                <Text style={[fonts.size_14, fonts.bold, { color: colors.termsLinkColor }]}>
                  SEE DETAILS
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                layout.fullWidth,
                layout.paddingForCard,
                {
                  backgroundColor: colors.cardBackgroundColor,
                  borderRadius: 14,
                  height: 'auto',
                  marginTop: '4%',
                },
              ]}
            >
              <View style={[layout.display, layout.rowHCenter, layout.justifyBetween]}>
                <Text
                  style={[
                    fonts.size_14,
                    fonts.fontWeight_small,
                    { color: colors.white, opacity: 0.7 },
                  ]}
                >
                  Number of chapters covered
                </Text>
                <Text style={[fonts.size_14, fonts.fontWeight_small, { color: colors.white }]}>
                  {specificStudentDetails?.chapterCompletedCount || '--'}/
                  {specificStudentDetails?.noOfChapters || '--'}
                </Text>
              </View>
              <View style={[layout.itemsCenter, { marginTop: '2%' }]}>
                <Divider
                  style={{
                    width: '100%',
                    backgroundColor: colors.lineBackgroundColor,
                  }}
                />
              </View>
              <View
                style={[
                  layout.display,
                  layout.rowHCenter,
                  layout.justifyBetween,
                  { marginTop: '2%' },
                ]}
              >
                <Text
                  style={[
                    fonts.size_14,
                    fonts.fontWeight_small,
                    { color: colors.white, opacity: 0.7 },
                  ]}
                >
                  Strong areas
                </Text>
                <Text style={[fonts.size_14, fonts.fontWeight_small, { color: colors.white }]}>
                  {specificStudentDetails?.strongAreaCount || '--'}
                </Text>
              </View>
              <View style={[layout.itemsCenter, { marginTop: '2%' }]}>
                <Divider
                  style={{
                    width: '100%',
                    backgroundColor: colors.lineBackgroundColor,
                  }}
                />
              </View>
              <View
                style={[
                  layout.display,
                  layout.rowHCenter,
                  layout.justifyBetween,
                  { marginTop: '2%' },
                ]}
              >
                <Text
                  style={[
                    fonts.size_14,
                    fonts.fontWeight_small,
                    { color: colors.white, opacity: 0.7 },
                  ]}
                >
                  Weak areas
                </Text>
                <Text style={[fonts.size_14, fonts.fontWeight_small, { color: colors.white }]}>
                  {specificStudentDetails?.weakAreaCount || '--'}
                </Text>
              </View>
              <View style={[layout.itemsCenter, { marginTop: '2%' }]}>
                <Divider
                  style={{
                    width: '100%',
                    backgroundColor: colors.lineBackgroundColor,
                  }}
                />
              </View>
            </View>

            <View
              style={[
                layout.fullWidth,
                layout.autoHeight,
                layout.paddingForCard,
                {
                  backgroundColor: colors.cardBackgroundColor,
                  marginTop: '4%',
                  borderRadius: 14,
                },
              ]}
            >
              <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>Time spent</Text>

              <View style={[layout.display, layout.rowHCenter, { marginTop: '3%' }]}>
                <ImageVariant
                  testID="brand-img"
                  style={{
                    width: 15,
                    height: 12,
                    tintColor: '#3DD598',
                  }}
                  source={UpFullArrow}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    fonts.size_12,
                    fonts.fontWeight_small,
                    {
                      color: '#3DD598',
                      top: 2,
                      marginLeft: '1%',
                    },
                  ]}
                >
                  44% down from previous week
                </Text>
              </View>
              <View style={[layout.display, layout.rowHCenter, { marginTop: '3%' }]}>
                <Text style={[fonts.size_14, fonts.fontWeight_small, { color: colors.gray200 }]}>
                  This week
                </Text>
                <View
                  style={[
                    layout.row,
                    layout.itemsCenter,
                    {
                      marginLeft: '4%',
                      width: '60%',
                    },
                  ]}
                >
                  <View
                    style={[styles.timeLine1, { width: `${findTimePercent(thisWeek, maxTime)}%` }]}
                  />
                  <Text
                    style={[
                      fonts.size_12,
                      fonts.fontWeight_small,
                      { color: colors.white, marginLeft: '3%' },
                    ]}
                  >
                    {formatSecond2(thisWeek || 0)}
                  </Text>
                </View>
              </View>

              <View style={[layout.display, layout.rowHCenter, { marginTop: '3%' }]}>
                <Text style={[fonts.size_14, fonts.fontWeight_small, { color: colors.gray200 }]}>
                  Last week
                </Text>
                <View
                  style={{
                    marginLeft: '4%',
                    width: '60%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={[styles.timeLine2, { width: `${findTimePercent(lastWeek, maxTime)}%` }]}
                  />
                  <Text
                    style={[
                      fonts.size_12,
                      fonts.fontWeight_small,
                      { color: colors.white, marginLeft: '3%' },
                    ]}
                  >
                    {formatSecond2(lastWeek || 0)}
                  </Text>
                </View>
              </View>

              <View style={[layout.display, layout.rowHCenter, { marginTop: '3%' }]}>
                <Text
                  style={[
                    fonts.size_14,
                    fonts.fontWeight_small,
                    { color: colors.gray200, width: 40 },
                  ]}
                >
                  Peers
                </Text>
                <View
                  style={{
                    marginLeft: '13%',
                    width: '60%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={[styles.timeLine3, { width: `${findTimePercent(peers, maxTime)}%` }]}
                  />
                  <Text
                    style={[
                      fonts.size_12,
                      fonts.fontWeight_small,
                      {
                        color: colors.white,
                        marginLeft: '3%',
                      },
                    ]}
                  >
                    {formatSecond2(peers || 0)}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={[
                layout.display,
                layout.rowHCenter,
                layout.justifyBetween,
                { marginTop: '8%' },
              ]}
            >
              <Text style={[fonts.size_14, fonts.bold, { color: colors.white, opacity: 0.4 }]}>
                CLASS WORK INSIGHTS
              </Text>
              <TouchableOpacity onPress={goToClassWorkInsightScreen}>
                <Text style={[fonts.size_14, fonts.bold, { color: colors.termsLinkColor }]}>
                  SEE DETAILS
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                layout.fullWidth,
                layout.paddingForCard,
                {
                  backgroundColor: colors.cardBackgroundColor,
                  borderRadius: 14,
                  height: 'auto',
                  marginTop: '4%',
                },
              ]}
            >
              <View style={[layout.display, layout.rowHCenter, layout.justifyBetween]}>
                <Text
                  style={[
                    fonts.size_14,
                    fonts.fontWeight_small,
                    { color: colors.white, opacity: 0.7 },
                  ]}
                >
                  Number of test taken
                </Text>
                <Text style={[fonts.size_14, fonts.fontWeight_small, { color: colors.white }]}>
                  {classworkData?.noOfTestsTaken || '--'}
                </Text>
              </View>
              <View style={[layout.itemsCenter, { marginTop: '2%' }]}>
                <Divider
                  style={{
                    width: '100%',
                    backgroundColor: colors.lineBackgroundColor,
                  }}
                />
              </View>
              <View
                style={[
                  layout.display,
                  layout.rowHCenter,
                  layout.justifyBetween,
                  { marginTop: '2%' },
                ]}
              >
                <Text
                  style={[
                    fonts.size_14,
                    fonts.fontWeight_small,
                    { color: colors.white, opacity: 0.7 },
                  ]}
                >
                  Accuracy percentage
                </Text>
                <Text style={[fonts.size_14, fonts.fontWeight_small, { color: colors.white }]}>
                  {classworkData?.accuracyPercentage || '--'}
                </Text>
              </View>
              <View style={[layout.itemsCenter, { marginTop: '2%' }]}>
                <Divider
                  style={{
                    width: '100%',
                    backgroundColor: colors.lineBackgroundColor,
                  }}
                />
              </View>
            </View>

            <Pressable
              style={[
                layout.fullWidth,
                layout.paddingForCard,
                {
                  backgroundColor: colors.cardBackgroundColor,
                  height: 53,
                  borderRadius: 8,
                  marginTop: '3%',
                },
              ]}
              onPress={() =>
                navigation.navigate('BookmarkedQuestionsScreen', { studentDetails: studentDetails })
              }
            >
              <View style={[layout.display, layout.rowHCenter, layout.justifyBetween]}>
                <Text
                  style={[
                    fonts.size_14,
                    fonts.fontWeight_small,
                    { color: colors.white, opacity: 0.7 },
                  ]}
                >
                  {`See bookmarked questions (${allBookmarkedQuestionsDetails?.totalElements ?? 0})`}
                </Text>
                <TouchableOpacity>
                  <Image
                    source={RightArrow}
                    resizeMode="contain"
                    style={{
                      width: 16,
                      height: 10,
                      tintColor: colors.termsLinkColor,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeScreen>
  );
};

export default StudentWiseReportScreen;

const styles = StyleSheet.create({
  timeLine1: {
    height: 8,
    backgroundColor: '#3DD598',
    borderRadius: 6,
  },
  timeLine2: {
    height: 8,
    backgroundColor: '#FFAB48',
    borderRadius: 6,
  },
  timeLine3: {
    height: 8,
    backgroundColor: '#B557FF',
    borderRadius: 6,
  },
  loader: {
    marginTop: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
