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
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Classwork from '@/theme/assets/images/classwork.png';
import PrimaryGradient from '@/components/template/LinearGradient/PrimaryGradient';
import Progressbar from '@/components/template/Progressbar/Progressbar';
import UpArrow from '@/theme/assets/images/uparrow.png';
import DownArrow from '@/theme/assets/images/Downarrow.png';
import Circularprogressbar from '@/components/template/CircularProgressBar/Circularprogressbar';
import {
  getStudentClassworkReports,
  getStudentWiseClassworkReports,
} from '../../services/SchoolWorkServices/schoolWorkServices';
import { Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const ClassWorkTab = () => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);
  const sectionName = useSelector((state) => state.selectedSubject.sectionName);
  const selectedSubjectId = useSelector((state) => state.selectedSubject.subject);
  const chapterId = useSelector((state) => state.selectedChapter.chapterId);
  const classFromMMKV = storage.getString('activateClasswork');
  const classwork = classFromMMKV ? JSON.parse(classFromMMKV) : [];
  const resFromMMKV = storage.getString('teacherDetails');
  const teacherDetails = resFromMMKV ? JSON.parse(resFromMMKV) : null;
  const [expandedCards, setExpandedCards] = useState({});
  const [expandCardId, setExpandedCardId] = useState('');
  const [sectionId, setSectionId] = useState();
  const [assessmentWiseReport, setAssessmentWiseReport] = useState([]);
  const [data, setData] = useState([]);
  const [maxStudentNumber, setMaxStudentNumber] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [isClassworkLoading, setIsClassworkLoading] = useState(false);

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
      getStudentClasswork();
    }, [chapterId])
  );

  const getStudentClasswork = () => {
    let params = {
      sectionId: sectionId,
      subjectId: selectedSubjectId,
      chapterId: chapterId,
    };
    setIsLoading(true);
    getStudentClassworkReports(params)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('error', error);
        setIsLoading(false);
      });
  };

  const handleActiveChapter = () => {
    navigation.navigate('ActivateTab', {
      screen: 'ActivateClassWorkTab',
    });
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
    setIsClassworkLoading(true);
    getStudentWiseClassworkReports(params)
      .then((res) => {
        setAssessmentWiseReport(res.data);
        setIsClassworkLoading(false);
      })
      .catch((error) => {
        setIsClassworkLoading(false);
        console.log('error', error);
      });
  };

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={[layout.paddingForFullScreen, {}]}>
        {classwork.length > 0 ? (
          <>
            {data.length === 0 && (
              <View style={[layout.justifyCenter, layout.itemsCenter, { height: 450 }]}>
                <Text style={[fonts.size_14, fonts.fontWeignt_600, { color: colors.white }]}>
                  No Data
                </Text>
              </View>
            )}
            {data?.map((ele, index) => {
              return isLoading ? (
                <View style={styles.loader}>
                  <ActivityIndicator size="large" color={colors.termsLinkColor} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => toggleContent(ele.assessmentId)}
                  key={index}
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
                          fonts.size_12,
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
                      {isClassworkLoading ? (
                        <View style={{ paddingVertical: '2%' }}>
                          <ActivityIndicator size="large" color={colors.termsLinkColor} />
                        </View>
                      ) : (
                        <>
                          <View
                            style={[
                              layout.itemsCenter,
                              layout.paddingForCard,
                              { paddingTop: '0%' },
                            ]}
                          >
                            <Divider
                              style={{
                                width: '100%',
                                backgroundColor: colors.lineBackgroundColor,
                              }}
                            />
                          </View>
                          <View>
                            {assessmentWiseReport.length === 0 ? (
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
                            )}
                            {assessmentWiseReport?.map((item, index) => (
                              <>
                                {index < maxStudentNumber ? (
                                  <View
                                    key={item.studentName}
                                    style={[
                                      styles.row,
                                      index % 2 === 0 ? styles.evenRow : styles.oddRow,
                                      index + 1 == assessmentWiseReport.length && {
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
                                ) : null}
                              </>
                            ))}
                          </View>
                        </>
                      )}
                    </View>
                  ) : null}
                  {assessmentWiseReport.length > 5 && expandedCards[ele.assessmentId] && (
                    <TouchableOpacity
                      onPress={() => {
                        maxStudentNumber === 2 ? setMaxStudentNumber(1000) : setMaxStudentNumber(5);
                      }}
                      style={{ marginTop: '4%', marginBottom: '4%' }}
                    >
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
  loader: {
    minHeight: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
