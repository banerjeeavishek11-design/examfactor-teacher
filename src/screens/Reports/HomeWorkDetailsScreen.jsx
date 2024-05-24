import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { ImageVariant } from '@/components/atoms';
import LeftArrow from '@/theme/assets/images/leftarrow.png';
import UpArrow from '@/theme/assets/images/uparrow.png';
import DownArrow from '@/theme/assets/images/Downarrow.png';
import Star from '@/theme/assets/images/Star.png';
import { myChapterDetails } from '../../services/ReportsServices/reportsServices';
import { useSelector } from 'react-redux';
import { MMKV } from 'react-native-mmkv';
import { getChaptersBySubjectId } from '../../services/chapterListService';

const storage = new MMKV();
const HomeWorkDetailsScreen = () => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);
  const { chapterDetails, studentDetails } = route.params || {};
  const resFromMMKV = storage.getString('teacherDetails');
  const teacherDetails = resFromMMKV ? JSON.parse(resFromMMKV) : null;
  const selectedSubjectId = useSelector((state) => state.selectedSubject.subject);
  const sectionName = useSelector((state) => state.selectedSubject.sectionName);
  const [expandedCards, setExpandedCards] = useState({});
  const [sectionId, setSectionId] = useState(null);
  const [expandCardId, setExpandedCardId] = useState('');
  const [topicsData, setTopicsData] = useState([]);
  const [chaptersData, setChaptersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      getAllChapters();
    }, [])
  );

  const getAllChapters = () => {
    setIsLoading(true);
    getChaptersBySubjectId(selectedSubjectId)
      .then((res) => {
        setChaptersData(res.data.chapters);
        setIsLoading(false);
      })
      .catch(() => {});
  };

  const toggleContent = (chapterId) => {
    setIsLoading(true);
    setExpandedCardId(chapterId);
    setExpandedCards((prevState) => ({
      ...prevState,
      [chapterId]: !prevState[chapterId],
    }));
    let params = {
      sectionId: sectionId,
      chapterId: chapterId,
      studentId: studentDetails?.userName,
    };
    myChapterDetails(selectedSubjectId, params)
      .then((res) => {
        if (chapterId) {
          setTopicsData(res.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('error from chapter details', error.message);
        setIsLoading(false);
      });
  };

  const getTopicNameById = (chapter, topicId) => {
    const topic = chapter.topics.find((t) => t.topicId === topicId);
    return topic ? topic.topicDesc : 'Unknown Topic';
  };

  const getSubTopicNameById = (topic, subTopicId) => {
    const subTopic = topic.subTopics.find((st) => st.subTopicId === subTopicId);
    return subTopic ? subTopic.subTopicDesc : 'Unknown SubTopic';
  };

  return (
    <SafeScreen>
      <View style={[layout.fullWidth, layout.paddingForFullScreen]}>
        <TouchableOpacity
          style={[layout.display, layout.rowHCenter, { paddingBottom: '1%' }]}
          onPress={() =>
            navigation.navigate('StudentWiseReportScreen', {
              chapterDetails: chapterDetails,
              studentDetails: studentDetails,
            })
          }
        >
          <ImageVariant
            testID="brand-img"
            style={{
              width: 10,
              height: 11,
              tintColor: colors.backButtonColor,
              top: -2,
            }}
            source={LeftArrow}
            resizeMode="contain"
          />
          <Text style={[fonts.size_16, fonts.bold, { color: colors.backButtonColor, left: 5 }]}>
            Chapter Covered
          </Text>
        </TouchableOpacity>
        <ScrollView
          contentContainerStyle={{ paddingBottom: '15%' }}
          showsVerticalScrollIndicator={false}
        >
          {chapterDetails?.length > 0 ? (
            <>
              {chapterDetails.map((ele, i) => {
                return (
                  <View key={ele.chapterId}>
                    {ele?.strongAreaCount === 0 && ele?.weakAreaCount === 0 ? null : (
                      <TouchableOpacity
                        onPress={() => toggleContent(ele.chapterId)}
                        style={[
                          layout.fullWidth,
                          isTablet ? { padding: 20 } : layout.paddingForCard,
                          {
                            backgroundColor: colors.cardBackgroundColor,
                            height: expandedCards[ele.chapterId] ? 'auto' : 78,
                            borderRadius: 16,
                            marginTop: '3%',
                          },
                        ]}
                      >
                        <View style={[layout.display, layout.rowHCenter, layout.justifyBetween]}>
                          <View>
                            <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
                              {`C${i + 1}`}: {ele.chapter}
                            </Text>
                            <Text
                              style={[
                                fonts.size_12,
                                fonts.fontWeight_small,
                                { color: '#FFAB48' },
                                { marginTop: '2%' },
                              ]}
                            >
                              {`${ele.strongAreaCount} strong & ${ele.weakAreaCount} weak areas identified`}
                            </Text>
                          </View>
                          <View style={{ width: '5%' }}>
                            {ele?.strongAreaCount === 0 && ele?.weakAreaCount === 0 ? null : (
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
                            )}
                          </View>
                        </View>
                        {expandCardId === ele.chapterId && expandedCards[ele.chapterId] && (
                          <>
                            {isLoading ? (
                              <View style={styles.loader}>
                                <ActivityIndicator size="large" color={colors.termsLinkColor} />
                              </View>
                            ) : (
                              <>
                                {topicsData.map((topicData, index) => {
                                  const chapter = chaptersData.find((ch) =>
                                    ch.topics.some((t) => t.topicId === topicData.topicId)
                                  );
                                  if (chapter) {
                                    const topicName = getTopicNameById(chapter, topicData.topicId);
                                    return (
                                      <View
                                        key={index}
                                        style={[
                                          layout.fullWidth,
                                          isTablet ? { padding: 20 } : layout.paddingForCard,
                                          {
                                            backgroundColor: colors.bottomSheetBackgroundColor,
                                            borderRadius: 14,
                                            marginTop: '4%',
                                          },
                                        ]}
                                      >
                                        <Text
                                          style={[
                                            fonts.size_16,
                                            fonts.fontWeight_small,
                                            { color: colors.white, marginBottom: '2%' },
                                          ]}
                                        >
                                          {topicName}
                                        </Text>
                                        {topicData.subTopicSummarylist.map(
                                          (subTopicData, subIndex) => {
                                            const topic = chapter.topics.find(
                                              (t) => t.topicId === topicData.topicId
                                            );

                                            const subTopicName = topic
                                              ? getSubTopicNameById(topic, subTopicData.subTopicId)
                                              : 'Unknown SubTopic';
                                            // console.log('subTopicData', subTopicData.passed);
                                            return (
                                              <View
                                                key={subIndex}
                                                style={[layout.row, layout.itemsCenter, { gap: 5 }]}
                                              >
                                                <Text
                                                  style={[
                                                    fonts.size_13,
                                                    fonts.fontWeight_small,
                                                    {
                                                      color: colors.backButtonColor,
                                                      marginVertical: '2%',
                                                    },
                                                  ]}
                                                >
                                                  {subTopicName}
                                                </Text>
                                                {subTopicData?.passed === true && (
                                                  <Image
                                                    source={Star}
                                                    style={{ width: 15, height: 15 }}
                                                  />
                                                )}
                                              </View>
                                            );
                                          }
                                        )}
                                      </View>
                                    );
                                  }
                                  return null;
                                })}
                              </>
                            )}
                          </>
                        )}
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </>
          ) : (
            <Text
              style={[
                fonts.size_16,
                fonts.fontWeight_small,
                fonts.alignCenter,
                { color: colors.white, marginTop: '90%' },
              ]}
            >
              No Chapters Found
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  loader: {
    marginTop: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '5%',
  },
});

export default HomeWorkDetailsScreen;
