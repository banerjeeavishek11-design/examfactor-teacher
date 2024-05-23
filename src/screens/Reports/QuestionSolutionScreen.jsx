import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import LeftArrow from '@/theme/assets/images/leftarrow.png';
import { useTheme } from '@/theme';
import { useSelector } from 'react-redux';
import { SafeScreen } from '@/components/template';
import { useNavigation, useRoute } from '@react-navigation/native';
// import rightArrow from '@/theme/assets/images/rightarrow.png';
// import leftArrow from '@/theme/assets/images/leftArrow2.png';
import Correct from '@/theme/assets/images/correctSolution.png';
import ContentParser from '../../components/ContentParser/ContentParser';
import MathJax from '../../components/mathjax/Mathjax';

const QuestionSolutionScreen = () => {
  const route = useRoute();
  const { studentDetails, questions } = route.params;
  const navigation = useNavigation();
  const { fonts, colors, layout } = useTheme();
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);

  const mmlOptions = {
    styles: {
      '#formula': {
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 24,
        textAlign: 'center',
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

  const renderOption = (optionContent) => {
    const content = optionContent?.map((val) => {
      if (val?.contentType === 'IMAGE') {
        return (
          <Image
            key={val.data}
            source={{
              uri: val.data,
            }}
            style={{
              width: '90%',
              height: 250,
              borderRadius: 12,
              backgroundColor: 'white',
              marginVertical: 10,
              resizeMode: 'contain',
            }}
          />
        );
      } else if (val?.contentType === 'TEXT') {
        return (
          <MathJax
            key={val.data}
            mathJaxOptions={mmlOptions}
            html={`<div>${val.data}</div>`}
            style={[mathjaxStyles.mathjaxContainer]}
          />
        );
      } else return null;
    });

    return content;
  };

  return (
    <SafeScreen>
      <View style={[layout.paddingForFullScreen]}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('BookmarkedQuestionsScreen', { studentDetails: studentDetails });
            }}
          >
            <View style={[layout.rowHCenter, layout.display]}>
              <Image style={{ width: 7, height: 11 }} source={LeftArrow} resizeMode="contain" />
              <Text style={[fonts.size_16, fonts.bold, { color: colors.backButtonColor, left: 5 }]}>
                Back
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: '15%' }}>
          <Text
            style={[
              fonts.size_16,
              fonts.fontWeight_small,
              { color: colors.white, marginTop: '4%' },
            ]}
          >
            Question
          </Text>
          <View style={{ width: '90%' }}>
            <Text style={[fonts.size_18, fonts.bold, { color: colors.gray400, marginTop: '4%' }]}>
              TOPIC: {questions?.topic}
            </Text>
            {questions && (
              <View pointerEvents="none">
                <ContentParser content={questions.questionContents} />
              </View>
            )}
          </View>
          <View style={{ marginVertical: isTablet ? '2%' : '5%', gap: 10 }}>
            {questions &&
              questions?.answerChoices.map((answer, index) => {
                const id = answer.id;
                return (
                  <View key={id}>
                    <View
                      style={[
                        layout.row,
                        layout.justifyBetween,
                        layout.itemsCenter,
                        {
                          borderColor: answer.correct ? '#3DD598' : colors.gray400,
                          borderWidth: 1,
                          height: 50,
                          borderRadius: 10,
                          padding: '2%',
                        },
                      ]}
                    >
                      <View
                        style={[
                          layout.justifyStart,
                          layout.itemsCenter,
                          layout.row,
                          {
                            gap: 10,
                          },
                        ]}
                      >
                        <Text style={[fonts.size_16, fonts.bold, { color: colors.gray100 }]}>
                          {index === 0 ? 'A' : index === 1 ? 'B' : index === 2 ? 'C' : 'D'}
                        </Text>
                        <View
                          style={[
                            fonts.size_14,
                            fonts.bold,
                            {
                              color: colors.white,
                              flex: 1,
                              justifyContent: 'center',
                            },
                          ]}
                        >
                          {renderOption(answer?.answerChoiceContents)}
                        </View>
                      </View>
                      {answer.correct ? <Image source={Correct} style={{ right: 25 }} /> : null}
                    </View>
                    {answer.correct ? (
                      <Text style={{ color: '#3DD598', marginTop: 2, left: 6 }}>
                        This is The correct Answer
                      </Text>
                    ) : null}
                  </View>
                );
              })}
          </View>
          <Text
            style={[
              fonts.size_18,
              fonts.bold,
              { color: colors.gray400, marginTop: !isTablet && '4%' },
            ]}
          >
            SOLUTION
          </Text>
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
            pointerEvents="none"
          >
            <ContentParser content={questions?.solution} />
          </View>
          <Text style={[fonts.size_18, fonts.bold, { color: colors.gray400, marginTop: '3%' }]}>
            INSIGHTS
          </Text>
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
            <View
              style={[
                layout.row,
                layout.justifyBetween,
                { borderBottomColor: colors.gray200, borderBottomWidth: 0.8 },
              ]}
            >
              <Text style={[fonts.size_16, fonts.fontWeight_small, { color: colors.gray200 }]}>
                Difficulty Level
              </Text>
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.gray200, marginBottom: '3%' },
                ]}
              >
                {questions?.difficultyLevel}
              </Text>
            </View>
            <View
              style={[
                layout.row,
                layout.justifyBetween,
                { borderBottomColor: colors.gray200, borderBottomWidth: 0.8 },
              ]}
            >
              <Text style={[fonts.size_16, fonts.fontWeight_small, { color: colors.gray200 }]}>
                Total user attempts
              </Text>
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.gray200, marginBottom: '3%' },
                ]}
              >
                {questions?.totalAttemptCount}
              </Text>
            </View>
            <View
              style={[
                layout.row,
                layout.justifyBetween,
                { borderBottomColor: colors.gray200, borderBottomWidth: 0.8 },
              ]}
            >
              <Text style={[fonts.size_16, fonts.fontWeight_small, { color: colors.gray200 }]}>
                Got it right
              </Text>
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.gray200, marginBottom: '3%' },
                ]}
              >
                {questions?.correctCount}
              </Text>
            </View>
            <View style={[layout.row, layout.justifyBetween]}>
              <Text style={[fonts.size_16, fonts.fontWeight_small, { color: colors.gray200 }]}>
                Time spent
              </Text>
              <Text style={[fonts.size_16, fonts.fontWeight_small, { color: colors.gray200 }]}>
                0 secs
              </Text>
            </View>
          </View>
          {/* <View
            style={[
              layout.row,
              layout.justifyBetween,
              layout.itemsCenter,
              { marginTop: '20%', marginBottom: '5%', height: 60 },
            ]}
          >
            <TouchableOpacity
              style={[
                layout.row,
                layout.justifyCenter,
                layout.itemsCenter,
                {
                  borderRadius: 10,
                  width: '49%',
                  height: 50,
                  backgroundColor: colors.cardBackgroundColor,
                  gap: 4,
                },
              ]}
            >
              <Image
                style={{
                  width: 20,
                  height: 10,
                  tintColor: colors.linearGradientColor,
                }}
                source={leftArrow}
              />
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.linearGradientColor },
                ]}
              >
                Previous
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                layout.row,
                layout.justifyCenter,
                layout.itemsCenter,
                {
                  borderRadius: 10,
                  width: '49%',
                  height: 50,
                  backgroundColor: colors.cardBackgroundColor,
                  gap: 5,
                },
              ]}
            >
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.linearGradientColor },
                ]}
              >
                Next
              </Text>
              <Image
                style={{
                  width: 20,
                  height: 10,
                  tintColor: colors.linearGradientColor,
                }}
                source={rightArrow}
              />
            </TouchableOpacity>
          </View> */}
        </ScrollView>
      </View>
    </SafeScreen>
  );
};

export default QuestionSolutionScreen;
