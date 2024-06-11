import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/theme';
import { useSelector } from 'react-redux';
import { Concentrix, SafeScreen } from '@/components/template';
import Arrow from '@/theme/assets/images/arrow.png';
import { ImageVariant } from '@/components/atoms';
import { MMKV } from 'react-native-mmkv';
import { useFocusEffect } from '@react-navigation/native';
import { Divider } from 'react-native-paper';
// import { useDispatch } from 'react-redux';
import DownArrow from '@/theme/assets/images/Downarrow.png';
import Line from '@/theme/assets/images/line.png';
import Info from '@/theme/assets/images/info.png';
import UpArrow from '@/theme/assets/images/uparrow.png';
import Progressbar from '@/components/template/Progressbar/Progressbar';
import { useNavigation } from '@react-navigation/native';
import SortbyBottomSheet from '@/components/BottomSheet/Home/SortbyBottomSheet';
import PracticeDurationBottomSheet from '@/components/BottomSheet/Home/PracticeDurationBottomSheet';
import { getUserDetailsByUserId } from '../../services/teacherService';
import { getStudentProgress } from '../../services/subjectWiseReportService';
// import { updateUserRole } from '../../store/redux-slice/LoginSlice';
import {
  getSubjectWiseReport,
  get7daysScoreForChart,
  get7daysStudyTimeForChart,
} from '../../services/subjectWiseReportService';
import { notifyMessage } from '../../utils/error-toast-API';
import { getChaptersBySubjectId } from '../../services/chapterListService';
import { getClasswoksByTeacher } from '../../services/ActivateServices/activeClassworkServices';
import { getDiagnosticsByTeacher } from '../../services/activateDiagnosticService';
import { getHomeworkByTeacher } from '../../services/activateHomeworkService';
import Caraosal from './Caraosal';
import Header from '../../components/template/Header/Header';

const configForScore = [
  { groupName: '<60', from: 0, to: 60 },
  { groupName: '60-80', from: 61, to: 80 },
  { groupName: '81-90', from: 81, to: 90 },
  { groupName: '90+', from: 91, to: 100 },
];

const configForStudyTime = [
  { groupName: '0-10', from: 0, to: 10 },
  { groupName: '11-30', from: 11, to: 30 },
  { groupName: '31-60', from: 31, to: 60 },
  { groupName: '0-10', from: 0, to: 10 },
  { groupName: '11-30', from: 11, to: 30 },
  { groupName: '31-60', from: 31, to: 60 },
  { groupName: '60+', from: 61, to: 180 },
];

const storage = new MMKV();

const HomeScreen = () => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const userName = storage.getString('username');
  // const dispatch = useDispatch();
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);
  // const selectedClasses = useSelector((state)=> state.teacherClass.classesDataContainer)
  const subjectName = useSelector((state) => state.selectedSubject.subjectName);
  const sectionName = useSelector((state) => state.selectedSubject.sectionName);
  const selectedSubjectId = useSelector((state) => state.selectedSubject.subject);
  const [sectionId, setSectionId] = useState(null);
  const [gradeId, setGradeId] = useState(null);
  // const userRole = useSelector((state) => state.login.userRole);

  const resFromMMKV = storage.getString('teacherDetails');
  const teacherDetails = resFromMMKV ? JSON.parse(resFromMMKV) : null;

  const [sortByValue, setSortbyValue] = useState('Practice Progress: High To Low');
  const [sortByBody, setSortByBody] = useState('practiceCompletionPercentage dsc');
  const [sortbyModalVisible, setSortbyModalVisible] = useState(false);
  const closeSortbyModal = () => {
    setSortbyModalVisible(false);
  };

  const [practiceDurationValue, setPracticeDurationValue] = useState('Not Practiced in 7 Days');
  const [practiceDurationBody, setPracticeDurationBody] = useState(7);
  const [practiceDurationModalVisible, setPracticeDurationModalVisible] = useState(false);
  const closePracticeDurationModal = () => {
    setPracticeDurationModalVisible(false);
  };

  const [scoreChartData, setScoreChartData] = useState([[]]);
  const [studyTimeChartData, setStudyTimeChartData] = useState([[]]);
  // const [dataOfConsolidatedReport, setDataOfConsolidatedReport] = useState();
  const [consolidatedReportData, setConsolidatedReportData] = useState();

  const [studentProgressData, setStudentProgressData] = useState([]);

  const [expandedCards, setExpandedCards] = useState({});

  const [chapList, setChapList] = useState([]);

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

  useEffect(() => {
    getAllChaptersDetails();
    getClassworks();
    getDiagnostics();
    getHomeworks();
  }, [selectedSubjectId]);

  // useEffect(() => {
  //   getAllChaptersDetails();
  //   getClassworks();
  //   getDiagnostics();
  //   getHomeworks();
  // }, []);

  useEffect(() => {
    getTeacheDetails();
  }, []);

  useEffect(() => {
    if (selectedSubjectId && sectionId) {
      getProgressForStudents();
    }
  }, [sortByBody, practiceDurationBody, selectedSubjectId, sectionId]);

  useFocusEffect(
    React.useCallback(() => {
      if (sectionId && gradeId) {
        get7daysScore();
        get7daysStudyTime();
        getSubjectReports();
      }
    }, [selectedSubjectId, sectionId, gradeId])
  );

  const getAllChaptersDetails = () => {
    getChaptersBySubjectId(selectedSubjectId)
      .then((res) => {
        res.data.chapters.sort((a, b) => a.displaySeq - b.displaySeq);
        setChapList(res.data.chapters);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getClassworks = () => {
    let params = {
      subjectId: selectedSubjectId,
    };
    getClasswoksByTeacher(params)
      .then((res) => {
        storage.set('activateClasswork', JSON.stringify(res.data));
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('Failed to fetch classwork Data' + error);
        }
      });
  };

  const getDiagnostics = () => {
    let params = {
      subjectId: selectedSubjectId,
    };
    getDiagnosticsByTeacher(params)
      .then((res) => {
        storage.set('activateDiagnostic', JSON.stringify(res.data));
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('unabled to get diagnostic details', error);
        }
      });
  };

  const getHomeworks = () => {
    let params = {
      gradeId: gradeId,
      sectionId: sectionId,
      subjectId: selectedSubjectId,
    };
    getHomeworkByTeacher(params)
      .then((res) => {
        storage.set('activateHomework', JSON.stringify(res.data));
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('unabled to get Homework details', error);
        }
      });
  };

  const getSubjectReports = () => {
    let params = {
      gradeId: gradeId,
      sectionId: sectionId,
      subjectId: selectedSubjectId,
    };
    getSubjectWiseReport(params)
      .then((res) => {
        setConsolidatedReportData(res.data);
      })
      .catch((error) => {
        if (error?.response?.status === 404 && error?.response?.status !== 401)
          setConsolidatedReportData({});
      });
  };

  const getTeacheDetails = () => {
    getUserDetailsByUserId(userName)
      .then((res) => {
        if (res.data) {
          // dispatch(updateUserRole(res.data.teacherRole));
          storage.set('oldPassword', res.data.password);
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

  const getProgressForStudents = () => {
    let paramsOfStudentProgress = {
      practiceDuration: practiceDurationBody,
      sort: sortByBody,
      subjectId: selectedSubjectId,
      sectionId: sectionId,
      // scoreCriteria: 'string',
    };
    getStudentProgress(paramsOfStudentProgress)
      .then((res) => {
        setStudentProgressData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleContent = (id) => {
    // setShowContent(!showContent);
    setExpandedCards((prevState) => ({
      [id]: !prevState[id],
    }));
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
      const value = entry.studyTime || entry.score;
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

  return (
    <SafeScreen>
      {isTablet && <Header />}
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={[layout.paddingForFullScreen, { paddingTop: '2%' }]}
      >
        <View style={[layout.display, layout.rowHCenter, layout.justifyBetween]}>
          <Text style={[fonts.size_14, fonts.bold, { color: colors.white, opacity: 0.4 }]}>
            CLASS PREPAREDNESS
          </Text>
          <TouchableOpacity
            style={[layout.display, layout.rowHCenter]}
            onPress={() =>
              navigation.navigate('SubjectDetailsScreen', {
                chapters: consolidatedReportData?.chapters,
                subjectName: subjectName,
                chapList: chapList,
                avgAchivableScore: consolidatedReportData?.score,
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
            isTablet ? { padding: 20 } : layout.paddingForCard,
            {
              backgroundColor: colors.cardBackgroundColor,
              height: 'auto',
              borderRadius: 12,
              marginTop: '4%',
              marginBottom: '-1%',
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
          <View
            style={{
              marginTop: '1%',
              alignItems: 'center',
              marginBottom: isTablet && '5%',
            }}
          >
            <Concentrix scorePercentage={consolidatedReportData?.score || 0} />
          </View>
          <View style={isTablet && { width: '55%', alignSelf: 'center' }}>
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
              style={[
                layout.display,
                layout.rowHCenter,
                layout.justifyBetween,
                { marginTop: '5%' },
              ]}
            >
              <Text style={[fonts.size_12, fonts.fontWeight_small, { color: colors.white }]}>
                Home work
              </Text>
              <Text style={[fonts.size_12, fonts.fontWeight_small, { color: colors.white }]}>
                {`${consolidatedReportData?.homeworkProgress || 0}% Complete`}
              </Text>
            </View>
            <View style={{ marginTop: '3%' }}>
              <Progressbar
                progress={
                  consolidatedReportData?.homeworkProgress === undefined
                    ? 0
                    : consolidatedReportData?.homeworkProgress / 100
                }
                color={
                  consolidatedReportData?.homeworkProgress <= 25
                    ? '#FF575F'
                    : consolidatedReportData?.homeworkProgress <= 60
                      ? '#BBA041'
                      : '#3DD598'
                }
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
                Diagnostic
              </Text>
              <Text style={[fonts.size_12, fonts.fontWeight_small, { color: colors.white }]}>
                {`${consolidatedReportData?.diagnosisProgress || 0}% Complete`}
              </Text>
            </View>
            <View style={{ marginTop: '3%' }}>
              <Progressbar
                progress={
                  consolidatedReportData?.diagnosisProgress === undefined
                    ? 0
                    : consolidatedReportData?.diagnosisProgress / 100
                }
                color={
                  consolidatedReportData?.diagnosisProgress <= 25
                    ? '#FF575F'
                    : consolidatedReportData?.diagnosisProgress <= 60
                      ? '#BBA041'
                      : '#3DD598'
                }
              />
            </View>
          </View>
        </View>
        <View
          style={[
            layout.fullWidth,
            isTablet ? { padding: 20 } : layout.paddingForCard,
            {
              backgroundColor: colors.cardBackgroundColor,
              height: 'auto',
              borderRadius: 12,
              marginTop: isTablet ? '2%' : '4%',
              marginBottom: '-1%',
            },
          ]}
        >
          <View
            style={[
              layout.display,
              layout.rowHCenter,
              layout.justifyBetween,
              isTablet && { width: '55%', alignSelf: 'center' },
            ]}
          >
            <Text style={[fonts.size_12, fonts.fontWeight_small, { color: colors.white }]}>
              Class Work
            </Text>
            <Text style={[fonts.size_12, fonts.fontWeight_small, { color: colors.white }]}>
              {`${consolidatedReportData?.classworkProgress || 0}% Complete`}
            </Text>
          </View>
          <View style={[isTablet && { width: '55%', alignSelf: 'center' }, { marginTop: '3%' }]}>
            <Progressbar
              progress={
                consolidatedReportData?.classworkProgress === undefined
                  ? 0
                  : consolidatedReportData?.classworkProgress / 100
              }
              color={
                consolidatedReportData?.classworkProgress <= 25
                  ? '#FF575F'
                  : consolidatedReportData?.classworkProgress <= 60
                    ? '#BBA041'
                    : '#3DD598'
              }
            />
          </View>
        </View>

        <Caraosal scoreChartData={resultScr} studyTimeChartData={resultStudtim} />

        <View
          style={[layout.display, layout.rowHCenter, layout.justifyBetween, { marginTop: '6%' }]}
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
                width: sortByValue.length * 6.8,
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
              {sortByValue}
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
              {practiceDurationValue}
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

        {studentProgressData?.length === 0 && (
          <View
            style={[
              layout.fullWidth,
              {
                backgroundColor: colors.cardBackgroundColor,
                height: 400,
                marginTop: '3%',
                borderRadius: 13,
                justifyContent: 'center',
              },
            ]}
          >
            <Text
              style={[
                fonts.size_20,
                fonts.fontWeignt_600,
                fonts.alignCenter,
                { color: colors.white },
              ]}
            >
              Students data not available
            </Text>
          </View>
        )}

        {studentProgressData.map((ele) => (
          <TouchableOpacity
            key={ele.studentId}
            onPress={() => toggleContent(ele.studentId)}
            style={[
              layout.fullWidth,
              isTablet ? { padding: 20 } : layout.paddingForCard,
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
                <Text
                  style={[fonts.size_14, fonts.bold, { color: colors.white }]}
                >{`${ele?.score} %`}</Text>
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
                  {ele?.fullName}
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
                    <Progressbar
                      progress={ele?.practiceCompletionPercentage / 100}
                      color={
                        ele?.practiceCompletionPercentage <= 25
                          ? '#FF575F'
                          : ele?.practiceCompletionPercentage <= 60
                            ? '#BBA041'
                            : '#3DD598'
                      }
                    />
                  </View>
                  <View style={{ width: '20%' }}>
                    <Text style={[fonts.size_10, fonts.bold, { color: colors.white, left: 5 }]}>
                      {ele?.practiceCompletionPercentage} %
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
                    <Progressbar
                      progress={ele?.diagnosticCompletionPercentage / 100}
                      color={
                        ele?.diagnosticCompletionPercentage <= 25
                          ? '#FF575F'
                          : ele?.diagnosticCompletionPercentage <= 60
                            ? '#BBA041'
                            : '#3DD598'
                      }
                    />
                  </View>
                  <View style={{ width: '20%' }}>
                    <Text style={[fonts.size_10, fonts.bold, { color: colors.white, left: 5 }]}>
                      {ele?.diagnosticCompletionPercentage} %
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ width: '10%' }}>
                <TouchableOpacity>
                  {expandedCards[ele.studentId] ? (
                    <Image style={{ width: 12, height: 8 }} source={UpArrow} resizeMode="contain" />
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
            {expandedCards[ele.studentId] && (
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
                    {ele?.lastPracticeDateSince !== -1 ? (
                      <>
                        <Text
                          style={[fonts.size_14, fonts.fontWeignt_600, { color: colors.white }]}
                        >
                          {ele.lastPracticeDateSince != null ? ele.lastPracticeDateSince : '0'} days
                          ago
                        </Text>
                        <Text
                          style={[fonts.size_10, fonts.fontWeight_small, { color: colors.gray200 }]}
                        >
                          Last practice
                        </Text>
                      </>
                    ) : (
                      <Text
                        style={[
                          fonts.size_13,
                          fonts.fontWeignt_600,
                          { color: colors.white, width: '90%' },
                        ]}
                      >
                        Not Yet Practiced
                      </Text>
                    )}
                  </View>
                  <View style={{ width: '45%' }}>
                    <Text style={[fonts.size_14, fonts.fontWeignt_600, { color: colors.white }]}>
                      {ele?.avgStudyTime < 60
                        ? ele?.avgStudyTime + ' Sec'
                        : Math.floor(ele?.avgStudyTime / 60) + ' Min'}
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
                      {ele?.lastTestScore}%
                    </Text>
                    <Text
                      style={[fonts.size_10, fonts.fontWeight_small, { color: colors.gray200 }]}
                    >
                      Last test score
                    </Text>
                  </View>
                </View>
              </>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <SortbyBottomSheet
        visible={sortbyModalVisible}
        closeModal={closeSortbyModal}
        setSortbyValue={setSortbyValue}
        setSortByBody={setSortByBody}
      />
      <PracticeDurationBottomSheet
        visible={practiceDurationModalVisible}
        closeModal={closePracticeDurationModal}
        setPracticeDurationValue={setPracticeDurationValue}
        setPracticeDurationBody={setPracticeDurationBody}
      />
    </SafeScreen>
  );
};

export default HomeScreen;
