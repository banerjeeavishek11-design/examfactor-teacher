import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import Search from '@/theme/assets/images/search.png';
import { useTheme } from '@/theme';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import { SafeScreen } from '@/components/template';
import ToggleButton from '@/components/template/ToggleButton/ToggleButton';
import DownArrow from '@/theme/assets/images/Downarrow.png';
import UpArrow from '@/theme/assets/images/uparrow.png';
import ScheduleTestActivationBottomSheet from '@/components/BottomSheet/Activate/ScheduleTestActivationBottomSheet';
import { getChaptersBySubjectId } from '../../services/chapterListService';
import { getAssessmentDetails } from '../../services/getAssessmentDetails';
import { getClasswoksByTeacher } from '../../services/ActivateServices/activeClassworkServices';
import { notifyMessage } from '../../utils/error-toast-API';
import { MMKV } from 'react-native-mmkv';
import moment from 'moment';

const storage = new MMKV();

const ClassWorkTab = () => {
  const { layout, fonts, colors } = useTheme();
  const sectionName = useSelector((state) => state.selectedSubject.sectionName);
  const selectedSubjectId = useSelector((state) => state.selectedSubject.subject);
  const accessToken = storage.getString('access_token');
  const [activateConfirmationModalVisible, setActivateConfirmationModalVisible] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  // const [activatedData, setActivatedData] = useState();
  const [searchChapterName, setSearchChapterName] = useState([]);
  const [chapterDetails, setChapterDetails] = useState([]);
  const [gradeId, setGradeId] = useState(null);
  const [partnerId, setPartnerId] = useState(null);
  const resFromMMKV = storage.getString('teacherDetails');
  const teacherDetails = resFromMMKV ? JSON.parse(resFromMMKV) : null;
  const [totalTime, setTotalTime] = useState();
  const [assessmentId, setAssessmentId] = useState();
  const [sectionId, setSectionId] = useState(null);
  const [assessmentName, setAssessmentName] = useState();
  const [totalQuestions, setTotalQuestions] = useState();
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const [classworkData, setClassworkData] = useState();
  const [forDate, setForDate] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const formattedDate = moment(forDate).format('DD MMM YYYY');

  useEffect(() => {
    if (teacherDetails && teacherDetails.length > 0) {
      for (let item of teacherDetails) {
        if (item.sectionName === sectionName) {
          setGradeId(item.gradeId);
          setPartnerId(item.partnerId);
          setSectionId(item.id);
          return;
        }
      }
    }
  }, [sectionName, teacherDetails]);

  useFocusEffect(
    React.useCallback(() => {
      getAllChaptersDetails(selectedSubjectId);
      getClassworks();
    }, [selectedSubjectId])
  );

  useEffect(() => {}, [searchChapterName]);

  useEffect(() => {
    getAllChaptersDetails(selectedSubjectId);
    // setSearchChapterName(chapterDetails);
  }, [selectedSubjectId]);

  const onSearchChapters = (search) => {
    const searchItem = chapterDetails.filter((ele) =>
      ele.chapterDesc.toLowerCase().includes(search.toLowerCase())
    );
    setSearchChapterName(searchItem);
  };

  const toggleContent = (id) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    let params = {
      page: 0,
      size: 10,
      active: true,
      subjectId: selectedSubjectId,
      chapterId: id,
      businessType: 'B2B',
      gradeId: gradeId,
      partnerId: partnerId,
    };
    setIsLoading(true);
    getAssessmentDetails(accessToken, params)
      .then((res) => {
        const chap = chapterDetails.map((ele) => {
          if (ele.chapterId === id) {
            return {
              ...ele,
              assessments: res.data.content,
            };
          }
          return ele;
        });
        setSearchChapterName(chap);
        setIsLoading(false);
        // setAssessmentDetails(res.data.content);
      })
      .catch((error) => {
        notifyMessage('something went wrong fetching assessments' + error);
        setIsLoading(false);
      });
  };

  const getAllChaptersDetails = (subjectId) => {
    const access_token = storage.getString('access_token');
    setIsLoading(true);
    getChaptersBySubjectId(access_token, subjectId)
      .then((res) => {
        res.data.chapters.sort((a, b) => a.displaySeq - b.displaySeq);
        setChapterDetails(res.data.chapters);
        setSearchChapterName(
          res.data.chapters.map((ele) => ({
            ...ele,
            assessments: [],
          }))
        );
        setIsLoading(false);
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('Failed to get chapter details');
        }
        setIsLoading(false);
      });
  };

  const getClassworks = () => {
    let params = {
      gradeId: gradeId,
      sectionId: sectionId,
      subjectId: selectedSubjectId,
    };
    setIsLoading(true);
    getClasswoksByTeacher(accessToken, params)
      .then((res) => {
        setClassworkData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('error', error);
        setIsLoading(false);
      });
  };

  const handleToggleClick = (
    chapterId,
    totalTime,
    assessmentId,
    assessmentName,
    totalQuestions
  ) => {
    if (!isAlreadyAssigned(chapterId, assessmentId)) {
      setTotalTime(totalTime);
      setAssessmentId(assessmentId);
      setAssessmentName(assessmentName);
      setTotalQuestions(totalQuestions);
      setSelectedChapterId(chapterId);
      setActivateConfirmationModalVisible(true);
    }
  };

  const isAlreadyAssigned = (chapterId, assessmentId) => {
    return (
      classworkData?.filter(
        (obj) => obj.chapterId === chapterId && obj.assessmentId === assessmentId
      ).length > 0
    );
  };

  const getAssigned = (chapterId, assessmentId) => {
    return classworkData?.filter(
      (obj) => obj.chapterId === chapterId && obj.assessmentId === assessmentId
    )[0];
  };

  return (
    <SafeScreen>
      <View style={[layout.paddingForFullScreen]}>
        <Searchbar
          placeholder="Search Class Work"
          placeholderTextColor="rgba(275, 275, 275, 0.5)"
          iconColor="rgba(275, 275, 275, 0.5)"
          inputStyle={[fonts.size_14, fonts.fontWeignt_600, { color: colors.white, right: 10 }]}
          icon={() => (
            <Image source={Search} resizeMode="contain" style={{ width: 14, height: 14 }} />
          )}
          onChangeText={onSearchChapters}
          style={{
            backgroundColor: '#09070E',
            borderColor: 'rgba(275, 275, 275, 0.5)',
            borderWidth: 1,
            borderRadius: 8,
          }}
          clearButtonMode="while-editing"
          selectionColor={colors.buttonTextColor}
        />
        <Text
          style={[
            fonts.size_13,
            fonts.fontWeight_small,
            { color: colors.gray200, marginTop: '4%' },
          ]}
        >
          Use toggle to activate the homework
        </Text>
        {isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={colors.termsLinkColor} />
          </View>
        ) : (
          <ScrollView>
            <View style={{ marginBottom: '30%' }}>
              {searchChapterName && searchChapterName.length > 0 ? (
                <>
                  {searchChapterName.map((ele, i) => {
                    return (
                      <TouchableOpacity
                        onPress={() => toggleContent(ele.chapterId)}
                        style={[
                          layout.fullWidth,
                          layout.paddingForCard,
                          {
                            backgroundColor: colors.cardBackgroundColor,
                            borderRadius: 14,
                            marginTop: '3%',
                            marginBottom: '2%',
                          },
                        ]}
                        key={ele.chapterId}
                      >
                        <View style={[layout.display, layout.rowHCenter, layout.justifyBetween]}>
                          <Text
                            style={[
                              fonts.size_14,
                              fonts.fontWeignt_600,
                              { color: colors.white, width: '95%' },
                            ]}
                            numberOfLines={1}
                          >{`C${i + 1}: ${ele.chapterDesc}`}</Text>
                          <TouchableOpacity>
                            {expandedCards[ele.chapterId] ? (
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
                        <View>
                          {expandedCards[ele.chapterId] ? (
                            <>
                              {ele?.assessments?.map((element) => {
                                const assignedObj = getAssigned(ele.chapterId, element.id);
                                return (
                                  <View
                                    key={element.id}
                                    style={[
                                      layout.row,
                                      layout.justifyBetween,
                                      layout.itemsCenter,
                                      {
                                        borderTopColor: colors.gray400,
                                        borderTopWidth: 1,
                                        paddingVertical: '5%',
                                        marginTop: '2%',
                                      },
                                    ]}
                                  >
                                    <View style={{ width: '70%' }}>
                                      <Text
                                        style={[
                                          fonts.size_16,
                                          fonts.fontWeight_small,
                                          { color: colors.white, marginBottom: '4%' },
                                        ]}
                                      >
                                        {element.assessmentName}
                                      </Text>
                                      {assignedObj ? (
                                        <Text
                                          style={[
                                            fonts.size_14,
                                            fonts.fontWeight_small,
                                            { color: colors.gray200 },
                                          ]}
                                        >
                                          Activated on{' '}
                                          {moment(assignedObj.assignmentDate).format(
                                            'MMM DD, YYYY'
                                          )}
                                        </Text>
                                      ) : null}
                                      {formattedDate && (
                                        <Text
                                          style={[
                                            fonts.size_14,
                                            fonts.bold,
                                            { color: colors.white },
                                          ]}
                                        >
                                          For {formattedDate}
                                        </Text>
                                      )}
                                    </View>
                                    <View
                                      style={{
                                        width: '0%',
                                      }}
                                    >
                                      <ToggleButton
                                        setActivateConfirmationModalVisible={
                                          setActivateConfirmationModalVisible
                                        }
                                        chapterId={ele.chapterId}
                                        totalTime={element.totalTime}
                                        assessmentId={element.id}
                                        assessmentName={element.assessmentName}
                                        totalQuestions={element.totalNoOfQuestions}
                                        onToggleClick={() => {
                                          handleToggleClick(
                                            ele.chapterId,
                                            element.totalTime,
                                            element.id,
                                            element.assessmentName,
                                            element.totalNoOfQuestions
                                          );
                                        }}
                                        isEnabled={isAlreadyAssigned(ele.chapterId, element.id)}
                                      />
                                    </View>
                                  </View>
                                );
                              })}
                            </>
                          ) : null}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </>
              ) : (
                <View style={(styles.loader, { marginTop: '50%' })}>
                  <Text
                    style={[
                      fonts.size_20,
                      fonts.fontWeight_small,
                      fonts.alignCenter,
                      { color: colors.white },
                    ]}
                  >
                    No Data Available
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}
        <ScheduleTestActivationBottomSheet
          visible={activateConfirmationModalVisible}
          setActivateConfirmationModalVisible={setActivateConfirmationModalVisible}
          totalTime={totalTime}
          assessmentId={assessmentId}
          assessmentName={assessmentName}
          totalQuestions={totalQuestions}
          chapterId={selectedChapterId}
          getClassworks={getClassworks}
          setForDate={setForDate}
        />
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  loader: {
    minHeight: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClassWorkTab;
