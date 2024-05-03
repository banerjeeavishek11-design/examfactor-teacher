import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import Diagnostic from '@/theme/assets/images/diagnostic.png';
import PrimaryGradient from '@/components/template/LinearGradient/PrimaryGradient';
import Progressbar from '@/components/template/Progressbar/Progressbar';
import UpArrow from '@/theme/assets/images/uparrow.png';
import DownArrow from '@/theme/assets/images/Downarrow.png';
import { Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import leftArrow from '../../theme/assets/images/gradientlefttarrow.png';
import rightArrow from '../../theme/assets/images/gradientrightarrow.png';

// const topic = [
//   {
//     id: 1,
//     topicName: 'Introduction to Motion',
//     subTitle: 'Students completed the homework',
//     progress: 60,
//   },
//   {
//     id: 2,
//     topicName: 'Rate of Motion',
//     subTitle: 'Based on concepts covered till date',
//     progress: 65,
//   },
//   {
//     id: 3,
//     topicName: 'Rate of Change of Velocity',
//     subTitle: 'Rate of Change of Velocity',
//     progress: 50,
//   },
// ];

// const leaderboardData = [
//   { name: 'Rahul K. ', progress: 'Yes', achievable: 5 },
//   { name: 'Sanya M.', progress: 'No', achievable: 10 },
//   { name: 'Karan K.', progress: 'Yes', achievable: 11 },
//   { name: 'Piyush K.', progress: 'No', achievable: 7 },
//   { name: 'Anmol S.', progress: 'Yes', achievable: 9 },
// ];

const data = [
  {
    chapterId: 'chpater-id-1-1-2',
    noOfStudentCompletionCount: 1,
    b2BStudentDiagnosticSummaryDtoList: [
      {
        id: null,
        fullName: 'Sashi',
        diagnosticChapterCompletionPercentage: 100,
        chapterId: 'chpater-id-1-1-2',
        sectionId: '1230851261945909248_1232324480313888768_CBSE_CLASS_12_B',
        dignosticWeakTopicSummary: [
          {
            topicId: 'topic-id-1-1-2-15',
            subTopicIds: [
              'subtopic-id-115',
              'subtopic-id-114',
              'subtopic-id-125',
              'subtopic-id-117',
              'subtopic-id-116',
              'subtopic-id-119',
              'subtopic-id-118',
              'subtopic-id-120',
              'subtopic-id-122',
              'subtopic-id-121',
              'subtopic-id-124',
              'subtopic-id-123',
            ],
          },
          {
            topicId: 'topic-id-1-1-2-16',
            subTopicIds: [
              'subtopic-id-126',
              'subtopic-id-137',
              'subtopic-id-136',
              'subtopic-id-128',
              'subtopic-id-127',
              'subtopic-id-138',
              'subtopic-id-129',
              'subtopic-id-131',
              'subtopic-id-130',
              'subtopic-id-132',
            ],
          },
          {
            topicId: 'topic-id-1-1-2-17',
            subTopicIds: [
              'subtopic-id-139',
              'subtopic-id-140',
              'subtopic-id-142',
              'subtopic-id-141',
              'subtopic-id-144',
              'subtopic-id-143',
            ],
          },
          {
            topicId: 'topic-id-1-1-2-18',
            subTopicIds: [],
          },
          {
            topicId: 'topic-id-1-1-2-19',
            subTopicIds: [
              'subtopic-id-159',
              'subtopic-id-158',
              'subtopic-id-153',
              'subtopic-id-154',
              'subtopic-id-157',
            ],
          },
          {
            topicId: 'topic-id-1-1-2-20',
            subTopicIds: [
              'subtopic-id-162',
              'subtopic-id-161',
              'subtopic-id-164',
              'subtopic-id-163',
              'subtopic-id-166',
              'subtopic-id-165',
            ],
          },
        ],
        studentId: 'sashief',
        noOfWeakSubTopics: 39,
      },
    ],
  },
];

const DiagnosticTab = () => {
  const { colors, layout, fonts } = useTheme();
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);
  const [expandedCards, setExpandedCards] = useState({});
  const [activatedChapter, setActivatedChapter] = useState(false);

  const handleActiveChapter = () => {
    setActivatedChapter(true);
  };

  const toggleContent = (id) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={[layout.paddingForFullScreen, {}]}>
        <View
          style={[layout.row, layout.justifyBetween, { marginTop: '4%', marginHorizontal: '2%' }]}
        >
          <TouchableOpacity
          // onPress={() => handleChapterChangePress('left')}
          // disabled={chapListIndex === 0}
          // style={{ opacity: chapListIndex === 0 ? 0.5 : 1 }}
          >
            <Image source={leftArrow} style={{ width: 28, height: 16 }} />
          </TouchableOpacity>
          <Text
            style={[
              fonts.size_13,
              fonts.bold,
              { color: colors.white, width: '80%', textAlign: 'center' },
            ]}
          >
            C1:Motion
            {/* Unit {chapListIndex + 1} : {chapList[chapListIndex]?.displayNames[0].name} */}
          </Text>
          <TouchableOpacity
          // onPress={() => handleChapterChangePress('right')}
          // style={{
          //   opacity: chapListIndex === chapList.length - 1 ? 0.5 : 1,
          // }}
          // disabled={chapListIndex === chapList.length - 1}
          >
            <Image source={rightArrow} style={{ width: 28, height: 16 }} />
          </TouchableOpacity>
        </View>
        {activatedChapter === true ? (
          <>
            {data.map((ele) => {
              return (
                <TouchableOpacity
                  onPress={() => toggleContent(ele.id)}
                  key={ele.topicName}
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
                    <View style={{ width: '65%' }}>
                      <Text
                        numberOfLines={2}
                        style={[fonts.size_14, fonts.bold, { color: colors.white, top: -6 }]}
                      >
                        {ele.chapterId}
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
                          <Progressbar progress={0.1} color="#3DD598" />
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
                          <TouchableOpacity
                            key={index}
                            style={[
                              styles.row,
                              index % 2 === 0 ? styles.evenRow : styles.oddRow,
                              // index === leaderboardData.length - 1 && styles.lastRow,
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
                                {item.diagnosticChapterCompletionPercentage === 100 ? 'YES' : 'NO'}
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
                              <Image style={{ width: 10, height: 5 }} source={DownArrow} />
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  ) : null}
                  {expandedCards[ele.id] && (
                    <TouchableOpacity style={{ marginTop: '4%', marginBottom: '4%' }}>
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
            <TouchableOpacity onPress={handleActiveChapter}>
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
});
