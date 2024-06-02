/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import {
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useFocusEffect } from '@react-navigation/native';
import Diagnostic from '@/theme/assets/images/diagnostic.png';
import PrimaryGradient from '@/components/template/LinearGradient/PrimaryGradient';
import Progressbar from '@/components/template/Progressbar/Progressbar';
import UpArrow from '@/theme/assets/images/uparrow.png';
import DownArrow from '@/theme/assets/images/Downarrow.png';
import { Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
// import leftArrow from '../../theme/assets/images/gradientlefttarrow.png';
// import rightArrow from '../../theme/assets/images/gradientrightarrow.png';
// import { getChaptersBySubjectId } from '../../services/chapterListService';
import { getStudentDiagnosticReports } from '../../services/SchoolWorkServices/schoolWorkServices';
// import { notifyMessage } from '../../utils/error-toast-API';
import { MMKV } from 'react-native-mmkv';
import { getChapterDescById, getTopicDescById, getSubTopicDescById } from '../../utils/namesByIds';

const storage = new MMKV();

const DiagnosticTab = () => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);
  const selectedSubjectId = useSelector((state) => state.selectedSubject.subject);
  const chapterId = useSelector((state) => state.selectedChapter.chapterId);
  const chapList = useSelector((state) => state.selectedChapter.chapList);
  const sectionName = useSelector((state) => state.selectedSubject.sectionName);
  const diagFromMMKV = storage.getString('activateDiagnostic');
  const diagnostic = diagFromMMKV ? JSON.parse(diagFromMMKV) : [];
  const resFromMMKV = storage.getString('teacherDetails');
  const teacherDetails = resFromMMKV ? JSON.parse(resFromMMKV) : null;
  const [expandedCards, setExpandedCards] = useState({});
  const [expandedDiagnosticCards, setExpandedDiagnosticCards] = useState({});
  const [expandedDiagnosticId, setExpandedDiagnosticId] = useState();
  const [sectionId, setSectionId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [seeMaxStudent, setSeeMaxStudent] = useState(5);
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
      getStudentDiagnostics();
    }, [chapterId])
  );

  const getStudentDiagnostics = () => {
    let params = {
      sectionId: sectionId,
      subjectId: selectedSubjectId,
      chapterId: chapterId,
    };
    setIsLoading(true);
    getStudentDiagnosticReports(params)
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
    // setActivatedChapter(true);
    navigation.navigate('ActivateDiagnosticTab');
  };

  const toggleContent = (id) => {
    setExpandedCards((prevState) => ({
      [id]: !prevState[id],
    }));
  };

  const toggleDiagnosticDetails = (id) => {
    setExpandedDiagnosticId(id);
    setExpandedDiagnosticCards((prevState) => ({
      [id]: !prevState[id],
    }));
  };

  return (
    <SafeScreen>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.termsLinkColor} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={[layout.paddingForFullScreen, {}]}>
          {diagnostic.length > 0 ? (
            <>
              {data.map((ele) => {
                return (
                  <TouchableOpacity
                    onPress={() => toggleContent(ele.id)}
                    key={ele.chapterId}
                    style={[
                      layout.fullWidth,
                      {
                        backgroundColor: colors.cardBackgroundColor,
                        height: expandedCards[ele.id] ? 'auto' : isTablet ? 110 : 80,
                        borderRadius: 14,
                        marginTop: '4%',
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
                      <View style={{ width: '70%' }}>
                        <Text
                          numberOfLines={2}
                          style={[fonts.size_14, fonts.bold, { color: colors.white, top: -6 }]}
                        >
                          {getChapterDescById(chapList, ele.chapterId)}
                        </Text>
                        <View style={[layout.display, layout.rowHCenter, layout.justifyBetween]}>
                          <Text
                            style={[
                              fonts.size_12,
                              fonts.fontWeight_small,
                              { color: colors.backButtonColor },
                            ]}
                          >
                            No. of Students
                          </Text>
                          <View style={{ width: '70%', left: 10 }}>
                            <Progressbar
                              progress={ele.noOfStudentCompletionCount / 100}
                              color="#3DD598"
                            />
                          </View>
                          <Text
                            style={[
                              fonts.size_12,
                              fonts.fontWeight_small,
                              { color: colors.white, left: 20 },
                            ]}
                          >
                            {ele.noOfStudentCompletionCount}/30
                          </Text>
                        </View>
                      </View>
                      <View style={{ width: '5%' }}>
                        <TouchableOpacity>
                          {expandedCards[ele.id] ? (
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

                    {expandedCards[ele.id] ? (
                      <View>
                        <View style={[layout.itemsCenter, layout.paddingForCard]}>
                          <Divider
                            style={{
                              width: '100%',
                              backgroundColor: colors.lineBackgroundColor,
                            }}
                          />
                        </View>
                        {ele.b2BStudentDiagnosticSummaryDtoList.length === 0 ? (
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
                          <View>
                            <View style={styles.header}>
                              <View style={{ width: '30%' }}>
                                <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
                                  Name
                                </Text>
                              </View>
                              <View style={{ width: '40%' }}>
                                <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
                                  Diagnostic Completed
                                </Text>
                              </View>
                              <View style={{ width: '30%' }}>
                                <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
                                  No. of Weak Subtopics
                                </Text>
                              </View>
                            </View>
                            {ele.b2BStudentDiagnosticSummaryDtoList.map((item, index) => (
                              <>
                                {index < seeMaxStudent && (
                                  <TouchableOpacity
                                    onPress={() => {
                                      // setShowWeakSubtopics(!showWeakSubtopics);
                                      toggleDiagnosticDetails(item.chapterId);
                                    }}
                                    key={item.chapterId}
                                    style={[
                                      styles.row,
                                      index % 2 === 0 ? styles.evenRow : styles.oddRow,
                                      index ===
                                        ele.b2BStudentDiagnosticSummaryDtoList.length - 1 && {
                                        borderBottomLeftRadius: 14,
                                        borderBottomRightRadius: 14,
                                      },
                                    ]}
                                  >
                                    <View
                                      style={{
                                        width: '30%',
                                      }}
                                    >
                                      <Text
                                        numberOfLines={1}
                                        style={[
                                          fonts.size_14,
                                          fonts.fontWeight_small,
                                          { color: colors.white, opacity: 0.7 },
                                        ]}
                                      >
                                        {item.fullName}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        width: '40%',
                                      }}
                                    >
                                      <Text
                                        numberOfLines={1}
                                        style={[
                                          fonts.size_14,
                                          fonts.fontWeight_small,
                                          {
                                            color: colors.white,
                                            opacity: 0.7,
                                          },
                                        ]}
                                      >
                                        {item.diagnosticChapterCompletionPercentage === 100
                                          ? 'YES'
                                          : 'NO'}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        layout.row,
                                        layout.itemsCenter,
                                        {
                                          width: '30%',
                                          gap: 6,
                                        },
                                      ]}
                                    >
                                      <Text
                                        numberOfLines={1}
                                        style={[
                                          fonts.size_14,
                                          fonts.fontWeight_small,
                                          { color: colors.white, opacity: 0.7 },
                                        ]}
                                      >
                                        {item.dignosticWeakTopicSummary.length}
                                      </Text>
                                      {expandedDiagnosticId === item.chapterId &&
                                      expandedDiagnosticCards[item.chapterId] ? (
                                        <Image style={{ width: 12, height: 6 }} source={UpArrow} />
                                      ) : (
                                        <Image
                                          style={{ width: 10, height: 5 }}
                                          source={DownArrow}
                                        />
                                      )}
                                    </View>
                                  </TouchableOpacity>
                                )}

                                <View style={{ flexDirection: 'column' }}>
                                  {expandedDiagnosticId === item.chapterId &&
                                  expandedDiagnosticCards[item.chapterId] &&
                                  item.dignosticWeakTopicSummary.length > 0 ? (
                                    <View
                                      style={[
                                        {
                                          backgroundColor: '#2C2C39',
                                          marginTop: -1,
                                          height: 'auto',
                                        },
                                      ]}
                                    >
                                      {item.dignosticWeakTopicSummary.map((topic) => (
                                        <View style={{ marginBottom: 10 }} key={topic.topicId}>
                                          <Text
                                            style={[
                                              fonts.size_14,
                                              fonts.bold,
                                              { color: colors.white, paddingHorizontal: 20 },
                                            ]}
                                          >
                                            {getTopicDescById(chapList, topic.topicId)}
                                          </Text>
                                          {topic.subTopicIds.map((subTopic) => (
                                            <View style={{ paddingLeft: 30 }} key={subTopic}>
                                              <Text
                                                style={[
                                                  fonts.size_12,
                                                  fonts.fontWeignt_600,
                                                  { color: colors.gray200 },
                                                ]}
                                              >
                                                {getSubTopicDescById(chapList, subTopic)}
                                              </Text>
                                            </View>
                                          ))}
                                        </View>
                                      ))}
                                    </View>
                                  ) : null}
                                </View>
                              </>
                            ))}
                          </View>
                        )}
                      </View>
                    ) : null}
                    {expandedCards[ele.id] && ele.b2BStudentDiagnosticSummaryDtoList.length > 5 && (
                      <TouchableOpacity
                        onPress={() => {
                          setSeeMaxStudent(seeMaxStudent === 5 ? 500 : 5);
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
                source={Diagnostic}
                resizeMode="contain"
              />
              <Text
                style={[
                  fonts.size_20,
                  fonts.fontWeignt_600,
                  { color: colors.white, textAlign: 'center' },
                ]}
              >
                Chapter not assigned for Diagnostic
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
                Go to activate and assign Diagnostic for students at first
              </Text>
              <TouchableOpacity onPress={() => handleActiveChapter()}>
                <PrimaryGradient styleProp={[styles.loginButton, layout.justifyCenter]}>
                  <View style={[layout.display, layout.rowHCenter]}>
                    <Text style={[fonts.size_16, fonts.bold, { color: colors.loginBtnTextColor }]}>
                      Activate Chapter
                    </Text>
                  </View>
                </PrimaryGradient>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </SafeScreen>
  );
};

export default DiagnosticTab;

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
    width: '100%',
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
