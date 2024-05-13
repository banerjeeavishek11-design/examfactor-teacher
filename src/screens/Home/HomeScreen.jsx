import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/theme';
import { useSelector } from 'react-redux';
import { Concentrix, SafeScreen, BarChart } from '@/components/template';
import Arrow from '@/theme/assets/images/arrow.png';
import { ImageVariant } from '@/components/atoms';
import { MMKV } from 'react-native-mmkv';
import { useFocusEffect } from '@react-navigation/native';
import { Divider } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import DownArrow from '@/theme/assets/images/Downarrow.png';
import Line from '@/theme/assets/images/line.png';
import Info from '@/theme/assets/images/info.png';
import UpArrow from '@/theme/assets/images/uparrow.png';
import Progressbar from '@/components/template/Progressbar/Progressbar';
import { useNavigation } from '@react-navigation/native';
import SortbyBottomSheet from '@/components/BottomSheet/Home/SortbyBottomSheet';
import PracticeDurationBottomSheet from '@/components/BottomSheet/Home/PracticeDurationBottomSheet';
import { getUserDetailsByUserId } from '../../services/teacherService';
import { updateUserRole } from '../../store/redux-slice/LoginSlice';
import {
  getSubjectWiseReport,
  get7daysScoreForChart,
  get7daysStudyTimeForChart,
} from '../../services/subjectWiseReportService';
import { notifyMessage } from '../../utils/error-toast-API';

/* const dataOfConsolidatedReport = {
  score: 0,
  homeworkProgress: 10,
  diagnosisProgress: 40,
  chapters: [
    {
      chapterId: 'Relations and Functions',
      score: 70,
      homeworkProgress: 70,
      diagnosisProgress: 0,
      timeSpent: 0,
      topicCount: 0,
      activatedtopicCount: 0,
      topics: [
        {
          topicId: 'Operation on real function',
          score: 0,
          progress: 0,
          timeSpent: 0,
        },
        {
          topicId: 'Types of function',
          score: 0,
          progress: 0,
          timeSpent: 0,
        },
      ],
    },
    {
      chapterId: 'Inverse Trigonometric Function',
      score: 40,
      homeworkProgress: 40,
      diagnosisProgress: 0,
      timeSpent: 0,
      topicCount: 0,
      activatedtopicCount: 0,
      topics: [
        {
          topicId: 'Sum and diffeences of angles',
          score: 0,
          progress: 0,
          timeSpent: 0,
        },
        {
          topicId: 'comprehension',
          score: 0,
          progress: 0,
          timeSpent: 0,
        },
      ],
    },
  ],
}; */

// const dummyDataFor7dayScore = [
//   { score: 36, sudentId: 'suninef' },
//   { score: 92, sudentId: 'rahul' },
//   { score: 43, sudentId: 'raja' },
//   { score: 65, sudentId: 'durga' },
//   { score: 55, sudentId: 'amit' },
//   { score: 86, sudentId: 'sayan' },
//   { score: 80, sudentId: 'deep' },
//   { score: 97, sudentId: 'sayantan' },
//   { score: 34, sudentId: 'amarnath' },
//   { score: 45, sudentId: 'sourav' },
// ];
// const dummyDataFor7dayStudyTime = [
//   { studyTime: 36, sudentId: 'suninef' },
//   { studyTime: 92, sudentId: 'rahul' },
//   { studyTime: 43, sudentId: 'raja' },
//   { studyTime: 65, sudentId: 'durga' },
//   { studyTime: 55, sudentId: 'amit' },
//   { studyTime: 86, sudentId: 'sayan' },
//   { studyTime: 80, sudentId: 'deep' },
//   { studyTime: 32, sudentId: 'sayantan' },
//   { studyTime: 34, sudentId: 'amarnath' },
//   { studyTime: 78, sudentId: 'sourav' },
// ];

const configForScore = [
  { groupName: '<60', from: 0, to: 60 },
  { groupName: '60-80', from: 61, to: 80 },
  { groupName: '81-90', from: 81, to: 90 },
  { groupName: '90+', from: 91, to: 100 },
];

const configForStudyTime = [
  { groupName: '0-20', from: 0, to: 20 },
  { groupName: '21-40', from: 21, to: 40 },
  { groupName: '41-60', from: 41, to: 60 },
  { groupName: '60+', from: 61, to: 180 },
];

const storage = new MMKV();
const barchartColor = ['#7AF4FC', '#27D4FA'];
const width = 300;
const height = 250;
const borderRadius = 5;
const yAxisTitle = 'No. of students';
const labelsForStudyTime = ['0-20', '21-40', '41-60', '60+'];
const labelsForScore = ['<60', '60-80', '81-90', '90+'];

const HomeScreen = () => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const userName = storage.getString('username');
  const dispatch = useDispatch();
  // const isTablet = useSelector((state) => state.screenDimensions.isTablet);
  // const selectedClasses = useSelector((state)=> state.teacherClass.classesDataContainer)
  const [showContent, setShowContent] = useState(false);
  const subjectName = useSelector((state) => state.selectedSubject.subjectName);
  const sectionName = useSelector((state) => state.selectedSubject.sectionName);
  const selectedSubjectId = useSelector((state) => state.selectedSubject.subject);
  const [sectionId, setSectionId] = useState(null);
  const [gradeId, setGradeId] = useState(null);
  // const userRole = useSelector((state) => state.login.userRole);

  const resFromMMKV = storage.getString('teacherDetails');
  const teacherDetails = resFromMMKV ? JSON.parse(resFromMMKV) : null;

  const [sortByValue, setSortbyValue] = useState(null);
  const [sortbyModalVisible, setSortbyModalVisible] = useState(false);
  const closeSortbyModal = () => {
    setSortbyModalVisible(false);
  };

  const [practiceDurationValue, setPracticeDurationValue] = useState(null);
  const [practiceDurationModalVisible, setPracticeDurationModalVisible] = useState(false);
  const closePracticeDurationModal = () => {
    setPracticeDurationModalVisible(false);
  };

  const [scoreChartData, setScoreChartData] = useState([[]]);
  const [studyTimeChartData, setStudyTimeChartData] = useState([[]]);
  const [dataOfConsolidatedReport, setDataOfConsolidatedReport] = useState({
    score: 0,
    homeworkProgress: 0,
    diagnosisProgress: 0,
  });

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

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (sectionId && gradeId && selectedSubjectId) {
  //       getSubjectReports();
  //     }
  //   }, [selectedSubjectId, sectionId, gradeId])
  // );

  useEffect(() => {
    getTeacheDetails();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (sectionId && gradeId) {
        get7daysScore();
        get7daysStudyTime();
        getSubjectReports();
      }
    }, [selectedSubjectId, sectionId, gradeId])
  );

  const getSubjectReports = () => {
    let params = {
      gradeId: gradeId,
      sectionId: sectionId,
      subjectId: selectedSubjectId,
    };
    getSubjectWiseReport(params)
      .then((res) => {
        console.log('responst subwise report -- .', JSON.stringify(res.data));
        setDataOfConsolidatedReport(res.data);
      })
      .catch((error) => {
        notifyMessage('failed to fetch subjectwise report', error);
      });
  };

  const getTeacheDetails = () => {
    getUserDetailsByUserId(userName)
      .then((res) => {
        if (res.data) {
          dispatch(updateUserRole(res.data.teacherRole));
        }
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('Something Went Wrong fetching teacher details', error);
        }
      });
  };

  const get7daysScore = () => {
    let params = {
      gradeId: gradeId,
      sectionId: sectionId,
      subjectId: selectedSubjectId,
    };
    get7daysScoreForChart(params)
      .then((res) => {
        setScoreChartData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const get7daysStudyTime = () => {
    let params = {
      gradeId: gradeId,
      sectionId: sectionId,
      subjectId: selectedSubjectId,
    };
    get7daysStudyTimeForChart(params)
      .then((res) => {
        setStudyTimeChartData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  function categorizeData(data, conf) {
    if (data.length === 0) {
      return [
        [0, 0, 0, 0],
        ['0-20', '21-40', '41-60', '60+'],
      ];
    }
    const result = [[0, 0, 0, 0], []];

    data.forEach((entry) => {
      const value = entry.studyTime || entry.score; // Get the value to compare
      let foundGroup = false;

      for (let index = 0; index < 4; index++) {
        const group = conf[index];
        if (!foundGroup && value >= group.from && value <= group.to) {
          result[0][index]++;
          foundGroup = true;
        }
      }
    });

    for (let index = 0; index < 4; index++) {
      result[1].push(conf[index].groupName);
    }

    return result;
  }

  const resultScr = categorizeData(scoreChartData, configForScore);
  const resultStudtim = categorizeData(studyTimeChartData, configForStudyTime);
  // console.log('result score', resultScr);
  // console.log('result stu time', resultStudtim);
  // console.log('scdt', scoreChartData);
  // console.log('stdychrt', studyTimeChartData);

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={[layout.paddingForFullScreen, { paddingTop: '2%' }]}>
        <View style={[layout.display, layout.rowHCenter, layout.justifyBetween]}>
          <Text style={[fonts.size_14, fonts.bold, { color: colors.white, opacity: 0.4 }]}>
            CLASS PREPAREDNESS
          </Text>
          <TouchableOpacity
            style={[layout.display, layout.rowHCenter]}
            onPress={() =>
              navigation.navigate('SubjectDetailsScreen', {
                chapters: dataOfConsolidatedReport.chapters,
                subjectName: subjectName,
              })
            }
          >
            <Text style={[fonts.size_14, fonts.bold, { color: colors.termsLinkColor }]}>
              SEE DETAILS
            </Text>
            <ImageVariant
              testID="brand-img"
              style={{
                width: 11,
                height: 11,
                left: 2,
                tintColor: colors.termsLinkColor,
              }}
              source={Arrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
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
          <Text
            style={[
              fonts.size_20,
              fonts.fontWeight_small,
              fonts.alignCenter,
              { color: colors.white, marginTop: '3%' },
            ]}
          >
            {subjectName}
          </Text>
          <View style={{ marginTop: '1%', alignItems: 'center' }}>
            <Concentrix scorePercentage={dataOfConsolidatedReport.score} />
          </View>
          <View style={[layout.itemsCenter, { marginTop: '-20%' }]}>
            <Divider
              style={{
                width: '100%',
                backgroundColor: colors.lineBackgroundColor,
              }}
            />
          </View>
          <Text
            style={[
              fonts.size_14,
              fonts.fontWeignt_600,
              { color: colors.white, opacity: 0.3, top: 10 },
            ]}
          >
            PRACTICE
          </Text>
          <View
            style={[layout.display, layout.rowHCenter, layout.justifyBetween, { marginTop: '5%' }]}
          >
            <Text style={[fonts.size_12, fonts.fontWeight_small, { color: colors.white }]}>
              Home work
            </Text>
            <Text style={[fonts.size_12, fonts.fontWeight_small, { color: colors.white }]}>
              {`${dataOfConsolidatedReport.homeworkProgress}% Complete`}
            </Text>
          </View>
          <View style={{ marginTop: '3%' }}>
            <Progressbar
              progress={dataOfConsolidatedReport.homeworkProgress / 100}
              color={'#3DD598'}
            />
          </View>
          <View
            style={[layout.display, layout.rowHCenter, layout.justifyBetween, { marginTop: '5%' }]}
          >
            <Text style={[fonts.size_12, fonts.fontWeight_small, { color: colors.white }]}>
              Diagnostic
            </Text>
            <Text style={[fonts.size_12, fonts.fontWeight_small, { color: colors.white }]}>
              {`${dataOfConsolidatedReport.diagnosisProgress}% Complete`}
            </Text>
          </View>
          <View style={{ marginTop: '3%' }}>
            <Progressbar
              progress={dataOfConsolidatedReport.diagnosisProgress / 100}
              color={'#BBA041'}
            />
          </View>
        </View>
        {/* <View
          style={[
            layout.fullWidth,
            layout.paddingForCard,
            {
              backgroundColor: colors.cardBackgroundColor,
              height: 350,
              borderRadius: 12,
              marginTop: '4%',
            },
          ]}
        ></View> */}
        <ScrollView
          contentContainerStyle={[{ gap: 14, paddingRight: 160 }]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ width: '62%' }}>
            <BarChart
              actualData={resultScr}
              colors={barchartColor}
              width={width}
              height={height}
              borderRadius={borderRadius}
              xAxisTitle={'Achievable Score (%)'}
              yAxisTitle={yAxisTitle}
              labels={labelsForScore}
            />
          </View>
          <View style={{ width: '62%' }}>
            <BarChart
              actualData={resultStudtim}
              colors={barchartColor}
              width={width}
              height={height}
              borderRadius={borderRadius}
              xAxisTitle={'Study Time (Min)'}
              yAxisTitle={yAxisTitle}
              labels={labelsForStudyTime}
            />
          </View>
        </ScrollView>

        <View
          style={[layout.display, layout.rowHCenter, layout.justifyBetween, { marginTop: '10%' }]}
        >
          <Text style={[fonts.size_14, fonts.bold, { color: colors.white, opacity: 0.4 }]}>
            STUDENT PROGRESS
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            layout.display,
            layout.rowHCenter,
            { marginRight: 5, marginTop: '3%' },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setSortbyModalVisible(true);
            }}
            style={[
              layout.justifyCenter,
              layout.display,
              layout.rowHCenter,
              layout.justifyBetween,
              {
                backgroundColor: colors.bottomTabBackground,
                borderWidth: 1,
                borderColor: sortByValue !== null ? colors.termsLinkColor : null,
                width: 72,
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
                  color: sortByValue !== null ? colors.termsLinkColor : colors.white,
                  opacity: sortByValue !== null ? 1 : 0.3,
                },
              ]}
            >
              Sort By
            </Text>
            <ImageVariant
              testID="brand-img"
              style={{
                width: 10,
                height: 10,
                tintColor: sortByValue !== null ? colors.termsLinkColor : colors.white,
                opacity: sortByValue !== null ? 1 : 0.4,
              }}
              source={DownArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setPracticeDurationModalVisible(true)}
            style={[
              layout.justifyCenter,
              layout.display,
              layout.rowHCenter,
              layout.justifyBetween,
              {
                backgroundColor: colors.bottomTabBackground,
                borderWidth: 1,
                borderColor: practiceDurationValue !== null ? colors.termsLinkColor : null,
                width: 169,
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
                  color: practiceDurationValue !== null ? colors.termsLinkColor : colors.white,
                  opacity: practiceDurationValue !== null ? 1 : 0.3,
                },
                fonts.alignCenter,
              ]}
            >
              Not Practiced in 7 Days
            </Text>
            <ImageVariant
              testID="brand-img"
              style={{
                width: 10,
                height: 10,
                tintColor: practiceDurationValue !== null ? colors.termsLinkColor : colors.white,
                opacity: practiceDurationValue !== null ? 1 : 0.4,
              }}
              source={DownArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              layout.justifyCenter,
              layout.display,
              layout.rowHCenter,
              layout.justifyBetween,
              {
                backgroundColor: colors.bottomTabBackground,
                width: 149,
                height: 28,
                borderRadius: 4,
                paddingHorizontal: 6,
              },
            ]}
          >
            <Text
              style={[
                fonts.size_12,
                fonts.fontWeight_extraSmall,
                fonts.alignCenter,
                { color: colors.white, opacity: 0.3 },
              ]}
            >
              Achievable Score 90+
            </Text>
            <ImageVariant
              testID="brand-img"
              style={{
                width: 10,
                height: 10,
                tintColor: colors.white,
                opacity: 0.4,
              }}
              source={DownArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </ScrollView>

        {/* <View
          style={[
            layout.fullWidth,
            {
              backgroundColor: colors.cardBackgroundColor,
              height: 200,
              marginTop: "3%",
              borderRadius: 13,
              justifyContent: "center",
            },
          ]}
        >
          <Text
            style={[
              fonts.size_20,
              fonts.fontWeignt_600,
               fonts.alignCenter,
              { color: colors.white,},
            ]}
          >
            Students data not available
          </Text>
        </View> */}

        <TouchableOpacity
          onPress={toggleContent}
          style={[
            layout.fullWidth,
            layout.paddingForCard,

            {
              backgroundColor: colors.cardBackgroundColor,
              height: 'auto',
              marginTop: '4%',
              borderRadius: 14,
            },
          ]}
        >
          <View style={[layout.display, layout.rowHCenter]}>
            <View style={{ width: '30%' }}>
              <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>75%</Text>
              <Text style={[fonts.size_10, fonts.fontWeight_small, { color: colors.gray200 }]}>
                Achievable Score
              </Text>
            </View>
            <ImageVariant
              testID="brand-img"
              style={{
                // width: 60,
                height: 70,
                tintColor: colors.lineBackgroundColor,
                right: 6,
              }}
              source={Line}
              resizeMode="contain"
            />
            <View style={{ width: '65%' }}>
              <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
                Shashank Kumar
              </Text>
              <View style={[layout.display, layout.rowHCenter]}>
                <View style={{ width: '30%' }}>
                  <Text
                    style={[
                      fonts.size_10,
                      fonts.fontWeight_small,
                      { color: colors.backButtonColor },
                    ]}
                  >
                    Home Work
                  </Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Progressbar progress={0.5} color={'#3DD598'} />
                </View>
                <View style={{ width: '20%' }}>
                  <Text style={[fonts.size_10, fonts.bold, { color: colors.white, left: 5 }]}>
                    60%
                  </Text>
                </View>
              </View>

              <View style={[layout.display, layout.rowHCenter]}>
                <View style={{ width: '30%' }}>
                  <Text
                    style={[
                      fonts.size_10,
                      fonts.fontWeight_small,
                      { color: colors.backButtonColor },
                    ]}
                  >
                    Diagnostic
                  </Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Progressbar progress={0.3} color={'#FF575F'} />
                </View>
                <View style={{ width: '20%' }}>
                  <Text style={[fonts.size_10, fonts.bold, { color: colors.white, left: 5 }]}>
                    27%
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ width: '10%' }}>
              <TouchableOpacity>
                {showContent ? (
                  <Image style={{ width: 12, height: 8 }} source={UpArrow} resizeMode="contain" />
                ) : (
                  <Image style={{ width: 12, height: 8 }} source={DownArrow} resizeMode="contain" />
                )}
              </TouchableOpacity>
            </View>
          </View>
          {showContent && (
            <>
              <Divider
                style={{
                  marginTop: '2%',
                  width: '100%',
                  backgroundColor: colors.lineBackgroundColor,
                }}
              />
              <View
                style={[
                  layout.display,
                  layout.rowHCenter,
                  layout.justifyBetween,
                  { marginTop: '2%' },
                ]}
              >
                <View style={{ width: '35%' }}>
                  <Text style={[fonts.size_14, fonts.fontWeignt_600, { color: colors.white }]}>
                    8 days ago
                  </Text>
                  <Text style={[fonts.size_10, fonts.fontWeight_small, { color: colors.gray200 }]}>
                    Last practice
                  </Text>
                </View>
                <View style={{ width: '45%' }}>
                  <Text style={[fonts.size_14, fonts.fontWeignt_600, { color: colors.white }]}>
                    55 Min
                  </Text>
                  <View style={[layout.display, layout.rowHCenter]}>
                    <Text
                      style={[fonts.size_10, fonts.fontWeight_small, { color: colors.gray200 }]}
                    >
                      Avg. Study Time
                    </Text>
                    <ImageVariant
                      testID="brand-img"
                      style={{
                        width: 10,
                        height: 10,
                        tintColor: '#A9A9AD',
                        left: 6,
                      }}
                      source={Info}
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <View style={{ width: '25%' }}>
                  <Text style={[fonts.size_14, fonts.fontWeignt_600, { color: colors.white }]}>
                    75%
                  </Text>
                  <Text style={[fonts.size_10, fonts.fontWeight_small, { color: colors.gray200 }]}>
                    Last test score
                  </Text>
                </View>
              </View>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            layout.fullWidth,
            layout.paddingForCard,
            layout.display,
            layout.rowHCenter,
            {
              backgroundColor: colors.cardBackgroundColor,
              height: 92,
              marginTop: '4%',
              borderRadius: 14,
            },
          ]}
        >
          <View style={{ width: '30%' }}>
            <Text style={[fonts.size_14, fonts.bold, { color: colors.white, left: 5 }]}>0%</Text>
            <Text style={[fonts.size_10, fonts.fontWeight_small, { color: colors.gray200 }]}>
              Achievable Score
            </Text>
          </View>
          <ImageVariant
            testID="brand-img"
            style={{
              // width: 60,
              height: 70,
              tintColor: colors.lineBackgroundColor,
              right: 6,
            }}
            source={Line}
            resizeMode="contain"
          />
          <View style={{ width: '65%' }}>
            <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>Rahul Gupta</Text>
            <View style={[layout.display, layout.rowHCenter]}>
              <View style={{ width: '30%' }}>
                <Text
                  style={[fonts.size_10, fonts.fontWeight_small, { color: colors.backButtonColor }]}
                >
                  Home Work
                </Text>
              </View>
              <View style={{ width: '50%' }}>
                <Progressbar progress={0} color={'#3DD598'} />
              </View>
              <View style={{ width: '20%' }}>
                <Text style={[fonts.size_10, fonts.bold, { color: colors.white, left: 5 }]}>
                  0%
                </Text>
              </View>
            </View>

            <View style={[layout.display, layout.rowHCenter]}>
              <View style={{ width: '30%' }}>
                <Text
                  style={[fonts.size_10, fonts.fontWeight_small, { color: colors.backButtonColor }]}
                >
                  Diagnostic
                </Text>
              </View>
              <View style={{ width: '50%' }}>
                <Progressbar progress={0} color={'#3DD598'} />
              </View>
              <View style={{ width: '20%' }}>
                <Text style={[fonts.size_10, fonts.bold, { color: colors.white, left: 5 }]}>
                  0%
                </Text>
              </View>
            </View>
          </View>
          <View style={{ width: '10%' }}>
            <TouchableOpacity>
              <ImageVariant
                testID="brand-img"
                style={{
                  width: 12,
                  height: 8,
                  tintColor: colors.white,
                }}
                source={DownArrow}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            layout.fullWidth,
            layout.paddingForCard,
            layout.display,
            layout.rowHCenter,
            {
              backgroundColor: colors.cardBackgroundColor,
              height: 92,
              marginTop: '4%',
              borderRadius: 14,
            },
          ]}
        >
          <View style={{ width: '30%' }}>
            <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>52%</Text>
            <Text style={[fonts.size_10, fonts.fontWeight_small, { color: colors.gray200 }]}>
              Achievable Score
            </Text>
          </View>
          <ImageVariant
            testID="brand-img"
            style={{
              // width: 60,
              height: 70,
              tintColor: colors.lineBackgroundColor,
              right: 6,
            }}
            source={Line}
            resizeMode="contain"
          />
          <View style={{ width: '65%' }}>
            <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>Utkarsh Sharma</Text>
            <View style={[layout.display, layout.rowHCenter]}>
              <View style={{ width: '30%' }}>
                <Text
                  style={[fonts.size_10, fonts.fontWeight_small, { color: colors.backButtonColor }]}
                >
                  Home Work
                </Text>
              </View>
              <View style={{ width: '50%' }}>
                <Progressbar progress={0.7} color={'#FFAB48'} />
              </View>
              <View style={{ width: '20%' }}>
                <Text style={[fonts.size_10, fonts.bold, { color: colors.white, left: 5 }]}>
                  45%
                </Text>
              </View>
            </View>

            <View style={[layout.display, layout.rowHCenter]}>
              <View style={{ width: '30%' }}>
                <Text
                  style={[fonts.size_10, fonts.fontWeight_small, { color: colors.backButtonColor }]}
                >
                  Diagnostic
                </Text>
              </View>
              <View style={{ width: '50%' }}>
                <Progressbar progress={0.6} color={'#3DD598'} />
              </View>
              <View style={{ width: '20%' }}>
                <Text style={[fonts.size_10, fonts.bold, { color: colors.white, left: 5 }]}>
                  60%
                </Text>
              </View>
            </View>
          </View>
          <View style={{ width: '10%' }}>
            <TouchableOpacity>
              <ImageVariant
                testID="brand-img"
                style={{
                  width: 12,
                  height: 8,
                  tintColor: colors.white,
                }}
                source={DownArrow}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <SortbyBottomSheet
        visible={sortbyModalVisible}
        closeModal={closeSortbyModal}
        setSortbyValue={setSortbyValue}
      />
      <PracticeDurationBottomSheet
        visible={practiceDurationModalVisible}
        closeModal={closePracticeDurationModal}
        setPracticeDurationValue={setPracticeDurationValue}
      />
    </SafeScreen>
  );
};

export default HomeScreen;
