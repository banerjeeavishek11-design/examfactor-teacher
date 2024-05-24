import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LeftArrow from '@/theme/assets/images/leftarrow.png';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/template';
// import menu from '@/theme/assets/images/3dotMenu.png';
// import menu from '@/theme/assets/images/3dotMenu.png';
import Filter from '@/theme/assets/images/questionAnalysisFilter.png';
import { useRoute } from '@react-navigation/native';
import RightArrow from '@/theme/assets/images/arrow.png';
import BookmarkedQuestionFilterBottomSheet from '@/components/BottomSheet/Reports/BookmarkedQuestionFilterBottomSheet';
import { bookMarkedQuestionsList } from '../../services/ReportsServices/reportsServices';
import { useSelector } from 'react-redux';
import { notifyMessage } from '../../utils/error-toast-API';
import MathJax from '../../components/mathjax/Mathjax';

const questionsPerPage = 5;

const BookmarkedQuestionsScreen = ({ navigation }) => {
  const { layout, colors, fonts } = useTheme();
  const selectedSubjectId = useSelector((state) => state.selectedSubject.subject);
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);
  const [allBookmarkedQuestionsDetails, setAllBookmarkedQuestionsDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalTabs, setTotalTabs] = useState([]);
  const startIndex = currentPage * questionsPerPage;
  const endIndex = Math.min(startIndex + questionsPerPage, allBookmarkedQuestionsDetails?.length);

  const route = useRoute();
  const { studentDetails } = route.params || {};

  const [bookmarkFilterVisible, setBookmarkFilterVisible] = useState(false);
  const closeBookmarkFilterModal = () => {
    setBookmarkFilterVisible(false);
  };

  useEffect(() => {
    const noOfTabs = Math.ceil(allBookmarkedQuestionsDetails?.length / questionsPerPage);
    const tabs = [];
    for (let i = 0; i < noOfTabs; i++) {
      tabs.push(i);
    }
    setTotalTabs(tabs);
  }, [allBookmarkedQuestionsDetails]);

  useEffect(() => {
    getBookmarkQuestions();
  }, [selectedSubjectId]);

  const mmlOptions = {
    styles: {
      '#formula': {
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
      },
    },
    jax: ['input/MathML'],
  };
  const mathjaxStyles = {
    mathjaxContainer: {
      backgroundColor: 'transparent',
      fontFamily: 'Poppins-SemiBold',
    },
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
        setAllBookmarkedQuestionsDetails(res?.data?.content);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        if (
          error?.response?.status === 400 ||
          error.code === 'ERR-10' ||
          error?.response?.status === 401
        ) {
          notifyMessage('unable to fetch bookmarkquestionlist');
        }
      });
  };
  const goToSolutionScreen = (questions) => {
    navigation.navigate('QuestionSolutionScreen', { questions: questions });
  };

  return (
    <SafeScreen>
      <View style={[layout.paddingForFullScreen]}>
        <View style={[layout.rowHCenter, layout.justifyBetween, { marginBottom: '3%' }]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('StudentWiseReportScreen', { studentDetails: studentDetails });
            }}
          >
            <View style={[layout.rowHCenter, layout.display]}>
              <Image
                style={{ width: 7, height: 11, top: -1 }}
                source={LeftArrow}
                resizeMode="contain"
              />
              <Text style={[fonts.size_16, fonts.bold, { color: colors.backButtonColor, left: 5 }]}>
                Bookmarked Questions
              </Text>
            </View>
          </TouchableOpacity>
          {allBookmarkedQuestionsDetails?.length === 0 ? null : (
            <TouchableOpacity onPress={() => setBookmarkFilterVisible(true)}>
              <Image source={Filter} />
            </TouchableOpacity>
          )}
        </View>

        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            contentContainerStyle={{ paddingBottom: '30%' }}
          >
            {isLoading ? (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color={colors.termsLinkColor} />
              </View>
            ) : (
              <>
                {allBookmarkedQuestionsDetails?.length > 0 ? (
                  <>
                    {allBookmarkedQuestionsDetails?.slice(startIndex, endIndex)?.map((ques, i) => {
                      const concatenatedData = ques?.question?.questionContents
                        .filter((ele) => ele.contentType === 'TEXT')
                        .map((ele) => ele.data)
                        .join(' ');
                      return (
                        <View key={ques.questionId}>
                          <View
                            style={[
                              layout.fullWidth,
                              isTablet ? { padding: 20 } : layout.paddingForCard,
                              {
                                height: 'auto',
                                backgroundColor: colors.cardBackgroundColor,
                                borderRadius: 16,
                                marginTop: '3%',
                                gap: 10,
                              },
                            ]}
                          >
                            <View style={[layout.row]}>
                              <Text
                                style={[
                                  fonts.size_14,
                                  fonts.fontWeight_small,
                                  { color: colors.white, width: '5%' },
                                ]}
                              >
                                {i + 1}.
                              </Text>

                              <Text
                                style={[
                                  fonts.size_14,
                                  fonts.fontWeight_small,
                                  {
                                    color: colors.white,
                                    width: '90%',
                                    textAlign: 'justify',
                                    top: -2,
                                  },
                                ]}
                              >
                                {ques?.question?.subTopic}
                              </Text>
                            </View>
                            <View style={isTablet && { marginLeft: '4%' }} pointerEvents="none">
                              <MathJax
                                mathJaxOptions={mmlOptions}
                                html={`<div>${concatenatedData}</div>`}
                                style={[mathjaxStyles.mathjaxContainer]}
                              />
                            </View>

                            <TouchableOpacity
                              onPress={() => goToSolutionScreen(ques?.question)}
                              style={[
                                layout.row,
                                layout.itemsCenter,
                                { marginTop: isTablet ? '1%' : '3%', marginLeft: '5%' },
                              ]}
                            >
                              <Text
                                style={[
                                  fonts.size_12,
                                  fonts.fontWeight_small,
                                  { color: colors.termsLinkColor },
                                ]}
                              >
                                View Solution
                              </Text>
                              <Image
                                style={{
                                  width: 6,
                                  height: 8,
                                  left: 3,
                                  tintColor: colors.termsLinkColor,
                                }}
                                source={RightArrow}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    })}
                    <View
                      style={[
                        layout.row,
                        {
                          justifyContent: 'center',
                          gap: 8,
                          marginBottom: '20%',
                          marginTop: '5%',
                        },
                      ]}
                    >
                      {totalTabs.map((index) => {
                        return (
                          <TouchableOpacity onPress={() => setCurrentPage(index)} key={index}>
                            <View
                              style={[
                                layout.justifyCenter,
                                layout.itemsCenter,
                                {
                                  width: 45,
                                  height: 45,
                                  borderWidth: currentPage === index ? 1 : 0,
                                  borderColor: currentPage === index ? colors.termsLinkColor : null,
                                  borderRadius: 8,
                                  backgroundColor:
                                    currentPage === index ? 'black' : colors.cardBackgroundColor,
                                },
                              ]}
                            >
                              <Text
                                style={[
                                  fonts.bold,
                                  {
                                    color:
                                      currentPage === index ? colors.termsLinkColor : colors.white,
                                  },
                                ]}
                              >
                                {index + 1}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </>
                ) : (
                  <Text
                    style={[
                      fonts.size_16,
                      fonts.fontWeight_small,
                      fonts.alignCenter,
                      { color: colors.white, marginTop: isTablet ? '20%' : '90%' },
                    ]}
                  >
                    No Bookmarked Questions Found
                  </Text>
                )}
              </>
            )}
          </ScrollView>
        </View>
      </View>
      <BookmarkedQuestionFilterBottomSheet
        visible={bookmarkFilterVisible}
        closeModal={closeBookmarkFilterModal}
      />
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  loader: {
    marginTop: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default BookmarkedQuestionsScreen;
