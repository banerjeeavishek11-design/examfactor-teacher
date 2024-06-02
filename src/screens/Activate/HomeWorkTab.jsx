import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
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
import ActiveHomeworkConfirmBottomSheet from '@/components/BottomSheet/Activate/ActiveHomeworkConfirmBottomSheet';
import {
  getChaptersBySubjectId,
  getQuestionNumberOfChapter,
} from '../../services/chapterListService';
import { getHomeworkByTeacher } from '../../services/activateHomeworkService';
import { notifyMessage } from '../../utils/error-toast-API';
import { MMKV } from 'react-native-mmkv';
import moment from 'moment';

const storage = new MMKV();

const HomeWorkTab = () => {
  const { layout, fonts, colors } = useTheme();
  const selectedSubjectId = useSelector((state) => state.selectedSubject.subject);
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);
  const sectionName = useSelector((state) => state.selectedSubject.sectionName);
  const subjectId = useSelector((state) => state.selectedSubject.subject);
  const [activateConfirmationModalVisible, setActivateConfirmationModalVisible] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  const [searchChapterName, setSearchChapterName] = useState([]);
  const [chapterDetails, setChapterDetails] = useState([]);
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [topics, setTopics] = useState([]);
  const [sectionId, setSectionId] = useState(null);
  const [gradeId, setGradeId] = useState(null);
  const resFromMMKV = storage.getString('teacherDetails');
  const teacherDetails = resFromMMKV ? JSON.parse(resFromMMKV) : null;
  const [homeworkData, setHomeworkData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [topicList, setTopicList] = useState([]);
  const [topicsLoading, setTopicsLoading] = useState(false);

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

  useFocusEffect(
    React.useCallback(() => {
      setSearchValue('');
      if (chapterDetails.length != 0) {
        setExpandedCards((prevState) => ({
          [chapterDetails[0].chapterId]: !prevState[chapterDetails[0].chapterId],
        }));
      }
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      getAllChaptersDetails(selectedSubjectId);
      getHomeworks();
    }, [selectedSubjectId, sectionId, gradeId])
  );

  // useEffect(() => {
  //   getAllChaptersDetails(selectedSubjectId);
  //   getHomeworks();
  // }, [selectedSubjectId, sectionId, gradeId]);

  const onSearchChapters = (search) => {
    const searchItem = chapterDetails.filter((ele) =>
      ele.chapterDesc.toLowerCase().includes(search.toLowerCase())
    );
    setSearchChapterName(searchItem);
    setSearchValue(search);
  };

  const toggleContent = (id, unitId) => {
    getQuestionNumbers(id, unitId);
    setExpandedCards((prevState) => ({
      [id]: !prevState[id],
    }));
  };

  const handleToggleClick = (chapterId, topicId, topics) => {
    if (!isAlreadyAssigned(chapterId, topicId)) {
      setActivateConfirmationModalVisible(true);
      setSelectedChapterId(chapterId);
      setSelectedTopicId(topicId);
      let assignedChapterTopics = homeworkData?.filter((t) => t.chapterId == chapterId);
      let assignableTopics = topics.filter(
        (t) => !(assignedChapterTopics.filter((at) => at.topicId == t.topicId).length > 0)
      );
      setTopics(assignableTopics);
    }
  };

  const getAllChaptersDetails = (subjectId) => {
    setIsLoading(true);
    getChaptersBySubjectId(subjectId)
      .then((res) => {
        res.data.chapters.sort((a, b) => a.displaySeq - b.displaySeq);
        setChapterDetails(res.data.chapters);
        setSearchChapterName(res.data.chapters);
        getQuestionNumbers(res.data.chapters[0].chapterId, res.data.chapters[0].unitId);
        setIsLoading(false);
        setExpandedCards(() => ({
          [res.data.chapters[0].chapterId]: [res.data.chapters[0].chapterId],
        }));
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('Failed to get chapter details');
        }
        setIsLoading(false);
      });
  };

  const getHomeworks = () => {
    let params = {
      gradeId: gradeId,
      sectionId: sectionId,
      subjectId: subjectId,
    };
    setIsLoading(true);
    getHomeworkByTeacher(params)
      .then((res) => {
        storage.set('activateHomework', JSON.stringify(res.data));
        setHomeworkData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('unabled to get Homework details', error);
        }
        setIsLoading(false);
      });
  };

  const getQuestionNumbers = (chapterCode, unitCode) => {
    setTopicsLoading(true);
    let params = {
      subjectCode: subjectId,
      unitCode: unitCode,
      chapterCode: chapterCode,
      query: 'questionCount',
    };

    getQuestionNumberOfChapter(params)
      .then((res) => {
        setTopicList(res.data);
        setTopicsLoading(false);
      })
      .catch((error) => {
        console.log('errorr', error);
        setTopicsLoading(false);
      });
  };

  const isAlreadyAssigned = (chapterId, topicId) => {
    return (
      homeworkData?.filter((obj) => obj.chapterId === chapterId && obj.topicId === topicId).length >
      0
    );
  };

  const getAssigned = (chapterId, topicId) => {
    return homeworkData?.filter((obj) => obj.chapterId === chapterId && obj.topicId === topicId)[0];
  };

  return (
    <SafeScreen>
      <View style={[layout.paddingForFullScreen]}>
        <Searchbar
          placeholder="Search Chapter"
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
          value={searchValue}
          clearIcon={() => <Image style={{ width: 10, height: 10 }} source={Cross} />}
        />
        <Text
          style={[
            fonts.size_13,
            fonts.fontWeight_small,
            { color: colors.gray200, marginTop: '4%', marginBottom: '2%' },
          ]}
        >
          Use toggle to activate the homework
        </Text>
        {isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={colors.termsLinkColor} />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: '30%' }}
          >
            {searchChapterName && searchChapterName.length > 0 ? (
              <>
                {searchChapterName.map((ele) => {
                  return (
                    <TouchableOpacity
                      onPress={() => toggleContent(ele.chapterId, ele.unitId)}
                      key={ele.chapterId}
                      style={[
                        layout.fullWidth,
                        isTablet ? { padding: 25 } : layout.paddingForCard,
                        {
                          backgroundColor: colors.cardBackgroundColor,
                          borderRadius: 14,
                          marginTop: isTablet ? '2%' : '4%',
                          height: 'auto',
                        },
                      ]}
                    >
                      <View style={[layout.display, layout.rowHCenter, layout.justifyBetween]}>
                        <Text
                          style={[fonts.size_14, fonts.bold, { color: colors.white, width: '95%' }]}
                          numberOfLines={1}
                        >{`C${ele.displaySeq}: ${ele.chapterDesc}`}</Text>
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
                      {expandedCards[ele.chapterId] ? (
                        <>
                          {topicsLoading ? (
                            <View style={{ paddingVertical: '2%' }}>
                              <ActivityIndicator size="large" color={colors.termsLinkColor} />
                            </View>
                          ) : (
                            <>
                              {topicList.length === 0 && (
                                <View style={[{ marginVertical: '3%' }]}>
                                  <Text
                                    style={[
                                      fonts.size_14,
                                      fonts.fontWeight_small,
                                      { color: colors.gray200 },
                                    ]}
                                  >
                                    No Topics to Assign
                                  </Text>
                                </View>
                              )}
                              {ele.topics
                                .sort((a, b) => a.displaySeq - b.displaySeq)
                                .map((item) => {
                                  const assignedObj = getAssigned(ele.chapterId, item.topicId);
                                  return (
                                    <View key={item.topicId}>
                                      {topicList.filter(
                                        (topics) => topics.topicCode === item.topicId
                                      ).length > 0 && (
                                        <>
                                          <View
                                            style={[
                                              layout.display,
                                              layout.rowHCenter,
                                              layout.justifyBetween,
                                              {
                                                borderTopColor: colors.gray400,
                                                borderTopWidth: 1,
                                                paddingVertical: isTablet ? '2%' : '5%',
                                                marginTop: '2%',
                                              },
                                            ]}
                                          >
                                            <View style={{ width: '70%' }}>
                                              <Text
                                                style={[
                                                  fonts.size_14,
                                                  fonts.fontWeight_small,
                                                  { color: '#D5D5D7' },
                                                ]}
                                              >
                                                {item.topicDesc}
                                              </Text>
                                            </View>
                                            <View style={{ width: '0%' }}>
                                              <ToggleButton
                                                chapterId={ele.chapterId}
                                                topicId={item.topicId}
                                                topics={ele.topics}
                                                onToggleClick={(chapterId, topicId, topics) =>
                                                  handleToggleClick(chapterId, topicId, topics)
                                                }
                                                isEnabled={isAlreadyAssigned(
                                                  ele.chapterId,
                                                  item.topicId
                                                )}
                                              />
                                            </View>
                                          </View>
                                          {assignedObj ? (
                                            <Text
                                              style={[
                                                fonts.size_12,
                                                fonts.fontWeight_small,
                                                { color: colors.gray200, marginTop: -10 },
                                              ]}
                                            >
                                              Activated on{' '}
                                              {moment(assignedObj.date).format('MMM DD, YYYY')}
                                            </Text>
                                          ) : null}
                                        </>
                                      )}
                                    </View>
                                  );
                                })}
                            </>
                          )}
                        </>
                      ) : null}
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
          </ScrollView>
        )}
      </View>
      <ActiveHomeworkConfirmBottomSheet
        visible={activateConfirmationModalVisible}
        setActivateConfirmationModalVisible={setActivateConfirmationModalVisible}
        chapterId={selectedChapterId}
        topicId={selectedTopicId}
        topics={topics}
        getHomeworks={getHomeworks}
      />
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

export default HomeWorkTab;
