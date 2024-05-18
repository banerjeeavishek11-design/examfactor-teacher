import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import LeftArrow from '@/theme/assets/images/leftarrow.png';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/template';
// import menu from '@/theme/assets/images/3dotMenu.png';
import Filter from '@/theme/assets/images/questionAnalysisFilter.png';
import { useRoute } from '@react-navigation/native';
import RightArrow from '@/theme/assets/images/arrow.png';
import BookmarkedQuestionFilterBottomSheet from '@/components/BottomSheet/Reports/BookmarkedQuestionFilterBottomSheet';
import { bookMarkedQuestionsList } from '../../services/ReportsServices/reportsServices';
import { useSelector } from 'react-redux';
import { notifyMessage } from '../../utils/error-toast-API';

const BookmarkedQuestions = [
  {
    id: 1,
    question:
      'A block of mass 2 kg is moving with a speed of 5 m/s on a frictionless surface. It collides with a stationary block of mass 3 kg. After the collision, the two blocks stick together. What is their common velocity?',
  },
  {
    id: 2,
    question:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores optio harum laborum recusandae quam totam cum esse cupiditate debitis expedita, atque maiores ad, voluptate voluptatibus.',
  },
  {
    id: 3,
    question:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae numquam maiores omnis qui dolorem, eveniet culpa itaque eum minus laborum sint soluta possimus vitae inventore?',
  },
  {
    id: 4,
    question:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit laborum rerum consequuntur alias quidem, vitae ipsa sequi repellat doloremque quaerat repellendus quasi voluptatibus, unde in.',
  },
  {
    id: 5,
    question:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci aut ex et dolorum recusandae, quos itaque quibusdam vitae accusamus commodi pariatur dolor necessitatibus accusantium quasi.',
  },
  {
    id: 6,
    question:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque neque dignissimos, optio obcaecati est, magni ducimus eius error culpa suscipit nihil repellat at possimus laudantium?',
  },
  {
    id: 7,
    question:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam at asperiores et aut illum, ab fuga expedita iusto pariatur! Dolorum, perspiciatis est. Quam, distinctio quae?',
  },
  {
    id: 8,
    question:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit quas dolorum rerum praesentium molestias illo architecto corporis, modi, temporibus nostrum repellat mollitia dolor! Perspiciatis, quaerat.',
  },
  {
    id: 9,
    question:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque laboriosam tempore rem dolorum necessitatibus adipisci quae officia, tempora deserunt et blanditiis expedita, eaque exercitationem pariatur.',
  },
  {
    id: 10,
    question:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque laboriosam tempore rem dolorum necessitatibus adipisci quae officia, tempora deserunt et blanditiis expedita, eaque exercitationem pariatur.',
  },
];

const questionsPerPage = 4;

const BookmarkedQuestionsScreen = ({ navigation }) => {
  const { layout, colors, fonts } = useTheme();
  const selectedSubjectId = useSelector((state) => state.selectedSubject.subject);
  const [allBookmarkedQuestionsDetails, setAllBookmarkedQuestionsDetails] = useState();
  // const [isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  const { studentDetails } = route.params || {};

  const [bookmarkFilterVisible, setBookmarkFilterVisible] = useState(false);
  const closeBookmarkFilterModal = () => {
    setBookmarkFilterVisible(false);
  };

  useEffect(() => {
    const noOfTabs = Math.ceil(BookmarkedQuestions.length / questionsPerPage);
    const tabs = [];
    for (let i = 0; i < noOfTabs; i++) {
      tabs.push(i);
    }
  }, []);

  useEffect(() => {
    getBookmarkQuestions();
  }, [selectedSubjectId]);

  const getBookmarkQuestions = () => {
    // setIsLoading(true);
    let params = {
      subjectCode: selectedSubjectId,
      active: true,
    };
    bookMarkedQuestionsList(params)
      .then((res) => {
        setAllBookmarkedQuestionsDetails(res?.data);
        // setIsLoading(false);
      })
      .catch((error) => {
        // setIsLoading(false);
        if (
          error?.response?.status === 400 ||
          error.code === 'ERR-10' ||
          error?.response?.status === 401
        ) {
          notifyMessage('unable to fetch bookmarkdetails');
        } else if (error?.response?.status === 404) {
          notifyMessage('Data not found');
        }
      });
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
          <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
            {allBookmarkedQuestionsDetails?.length > 0 ? (
              <>
                {allBookmarkedQuestionsDetails?.map((ques) => {
                  return (
                    <View key={ques.id}>
                      <View
                        style={[
                          layout.fullWidth,
                          layout.paddingForCard,
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
                            {ques.id}.
                          </Text>

                          <Text
                            style={[
                              fonts.size_14,
                              fonts.fontWeight_small,
                              { color: colors.white, width: '90%', textAlign: 'justify', top: -2 },
                            ]}
                          >
                            {ques?.subTopic}
                          </Text>
                        </View>

                        <TouchableOpacity
                          // onPress={() =>
                          //   navigation.navigate('QuestionSolutionScreen', {
                          //     AllQuestions: BookmarkedQuestions,
                          //     currentQuestionId: ques.id,
                          //     currentQuestion: ques.question,
                          //     studentDetails: studentDetails,
                          //   })
                          // }
                          style={[
                            layout.row,
                            layout.itemsCenter,
                            { marginTop: '3%', marginLeft: '5%' },
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
                No Bookmarked Questions Found
              </Text>
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

export default BookmarkedQuestionsScreen;
