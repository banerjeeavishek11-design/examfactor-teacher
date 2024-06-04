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
import Cross from '@/theme/assets/images/cross.png';
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
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);
  const [activateConfirmationModalVisible, setActivateConfirmationModalVisible] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  const [expandCardId, setExpandedCardId] = useState('');
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
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTestLoading, setIsTestLoading] = useState(false);

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
    }, [selectedSubjectId, sectionId, gradeId])
  );

  // useFocusEffect(
  //   React.useCallback(() => {
  //     setSearchValue('');
  //   }, [])
  // );

  useFocusEffect(
    React.useCallback(() => {
      setSearchValue('');
    }, [])
  );

  // useEffect(() => {}, [searchChapterName]);

  useEffect(() => {
    getAllChaptersDetails(selectedSubjectId);
  }, [selectedSubjectId]);

  const onSearchChapters = (search) => {
    const searchItem = chapterDetails.filter((ele) =>
      ele.chapterDesc.toLowerCase().includes(search.toLowerCase())
    );
    setSearchChapterName(searchItem);
    setSearchValue(search);
  };

  const toggleContent = (id) => {
    setExpandedCardId(id);
    setExpandedCards((prevState) => ({
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
    setIsTestLoading(true);
    getAssessmentDetails(params)
      .then((res) => {
        if (res.data.content.length == 0) {
          setIsTestLoading(false);
          // notifyMessage('No tests found');
          return;
        }
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
        setIsTestLoading(false);
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('something went wrong fetching assessments' + error);
        }
        setIsTestLoading(false);
      });
  };

  const getAllChaptersDetails = (subjectId) => {
    setIsLoading(true);
    getChaptersBySubjectId(subjectId)
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
    getClasswoksByTeacher(params)
      .then((res) => {
        setClassworkData(res.data);
        storage.set('activateClasswork', JSON.stringify(res.data));
        setIsLoading(false);
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('Failed to fetch classwork Data' + error);
        }
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
          value={searchValue}
          clearButtonMode="while-editing"
          selectionColor={colors.buttonTextColor}
          clearIcon={() => <Image style={{ width: 10, height: 10 }} source={Cross} />}
        />
        <Text
          style={[
            fonts.size_13,
            fonts.fontWeight_small,
            { color: colors.gray200, marginTop: '4%' },
          ]}
        >
          Use toggle to activate the classwork
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
                  {searchChapterName.map((ele) => {
                    return (
                      <TouchableOpacity
                        onPress={() => toggleContent(ele.chapterId)}
                        style={[
                          layout.fullWidth,
                          isTablet ? { padding: 25 } : layout.paddingForCard,
                          {
                            backgroundColor: colors.cardBackgroundColor,
                            borderRadius: 14,
                            marginTop: isTablet ? '2%' : '3%',
                            marginBottom: !isTablet && '2%',
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
                          >{`C${ele.displaySeq}: ${ele.chapterDesc}`}</Text>
                          <TouchableOpacity>
                            {expandCardId === ele.chapterId && expandedCards[ele.chapterId] ? (
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
                          {expandCardId === ele.chapterId && expandedCards[ele.chapterId] ? (
                            <View>
                              {isTestLoading ? (
                                <View style={{ paddingVertical: '2%' }}>
                                  <ActivityIndicator size="large" color={colors.termsLinkColor} />
                                </View>
                              ) : (
                                <>
                                  {(ele?.assessments === undefined ||
                                    ele?.assessments?.length === 0) && (
                                    <View
                                      style={[
                                        layout.itemsCenter,
                                        {
                                          borderTopColor: colors.gray400,
                                          borderTopWidth: 1,
                                          paddingVertical: '5%',
                                          marginTop: '2%',
                                        },
                                      ]}
                                    >
                                      <Text
                                        style={[
                                          fonts.fontWeight_small,
                                          fonts.size_14,
                                          fonts.alignCenter,
                                          { color: colors.white },
                                        ]}
                                      >
                                        No Tests Found
                                      </Text>
                                    </View>
                                  )}
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
                                            paddingVertical: isTablet ? '3%' : '5%',
                                            marginTop: '2%',
                                          },
                                        ]}
                                      >
                                        <View style={{ width: '70%' }}>
                                          <Text
                                            style={[
                                              fonts.size_16,
                                              fonts.fontWeight_small,
                                              {
                                                color: colors.white,
                                                marginBottom: isTablet ? '2%' : '4%',
                                              },
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
                              )}
                            </View>
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
