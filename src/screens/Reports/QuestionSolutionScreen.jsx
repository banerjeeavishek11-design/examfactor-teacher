import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import LeftArrow from "@/theme/assets/images/leftarrow.png";
import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";
import { useNavigation, useRoute } from "@react-navigation/native";
import rightArrow from "@/theme/assets/images/rightarrow.png";
import leftArrow from "@/theme/assets/images/leftArrow2.png";
import Correct from "@/theme/assets/images/correctSolution.png";

const answer = [
  { id: "A", answer: "0.5m/s", correct: false },
  { id: "B", answer: "5m/s", correct: true },
  { id: "C", answer: "50m/s", correct: false },
  { id: "D", answer: "100m/s", correct: false },
];

const QuestionSolutionScreen = () => {
  const route = useRoute();
  const { AllQuestions, currentQuestionId, currentQuestion,studentDetails } = route.params;
  const navigation = useNavigation();
  const { fonts, colors, layout } = useTheme();

  const [question, setQuestion] = useState(currentQuestion)

  // const showNextQuestion = ()=>{
  //   const nextQestionId = currentQuestionId + 1;
  //   const nextQuestion = AllQuestions.find((ques)=> ques.id === nextQestionId);
  //   setQuestion(nextQuestion.question)
  // }

  return (
    <SafeScreen>
      <View style={[layout.paddingForFullScreen]}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("BookmarkedQuestionsScreen",{ studentDetails: studentDetails});
            }}
          >
            <View style={[layout.rowHCenter, layout.display]}>
              <Image
                style={{ width: 7, height: 11 }}
                source={LeftArrow}
                resizeMode="contain"
              />
              <Text
                style={[
                  fonts.size_16,
                  fonts.bold,
                  { color: colors.backButtonColor, left: 5 },
                ]}
              >
                Back
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Text
            style={[
              fonts.size_16,
              fonts.fontWeight_small,
              { color: colors.white, marginTop: "4%" },
            ]}
          >
            Question
          </Text>
          <View style={{ width: "90%" }}>
            <Text
              style={[
                fonts.size_18,
                fonts.bold,
                { color: colors.gray400, marginTop: "4%" },
              ]}
            >
              TOPIC: INTRODUCTION TO MOTION
            </Text>
            <Text
              style={[
                fonts.size_14,
                fonts.fontWeight_small,
                { color: colors.gray200, marginTop: "4%" },
              ]}
            >
              {question}
            </Text>
          </View>
          <View style={{ marginVertical: "5%", gap: 10 }}>
            {answer.map((answer) => {
              return (
                <View key={answer.id}>
                  <View
                    style={[
                      layout.row,
                      layout.justifyBetween,
                      layout.itemsCenter,
                      {
                        borderColor: answer.correct
                          ? "#3DD598"
                          : colors.gray400,
                        borderWidth: 1,
                        height: 50,
                        borderRadius: 10,
                        padding: "2%",
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
                      <Text
                        style={[
                          fonts.size_16,
                          fonts.bold,
                          { color: colors.gray100 },
                        ]}
                      >
                        {answer.id}
                      </Text>
                      <Text style={[fonts.size_16, { color: colors.gray100 }]}>
                        {answer.answer}
                      </Text>
                    </View>
                    {answer.correct ? <Image source={Correct} /> : null}
                  </View>
                </View>
              );
            })}
          </View>
          <Text style={[fonts.size_18, fonts.bold, { color: colors.gray400 }]}>
            INSIGHTS
          </Text>
          <View
            style={[
              layout.fullWidth,
              layout.paddingForCard,
              {
                height: "auto",
                backgroundColor: colors.cardBackgroundColor,
                borderRadius: 16,
                marginTop: "3%",
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
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.gray200 },
                ]}
              >
                Difficulty Level
              </Text>
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.gray200, marginBottom: "3%" },
                ]}
              >
                Easy
              </Text>
            </View>
            <View
              style={[
                layout.row,
                layout.justifyBetween,
                { borderBottomColor: colors.gray200, borderBottomWidth: 0.8 },
              ]}
            >
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.gray200 },
                ]}
              >
                Total user attempts
              </Text>
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.gray200, marginBottom: "3%" },
                ]}
              >
                45
              </Text>
            </View>
            <View
              style={[
                layout.row,
                layout.justifyBetween,
                { borderBottomColor: colors.gray200, borderBottomWidth: 0.8 },
              ]}
            >
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.gray200 },
                ]}
              >
                Got it right
              </Text>
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.gray200, marginBottom: "3%" },
                ]}
              >
                67%
              </Text>
            </View>
            <View style={[layout.row, layout.justifyBetween]}>
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.gray200 },
                ]}
              >
                Time spent
              </Text>
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.gray200 },
                ]}
              >
                1 min 10 secs
              </Text>
            </View>
          </View>
          <Text
            style={[
              fonts.size_18,
              fonts.bold,
              { color: colors.gray400, marginTop: "4%" },
            ]}
          >
            SOLUTION
          </Text>
          <View
            style={[
              layout.fullWidth,
              layout.paddingForCard,
              {
                height: "auto",
                backgroundColor: colors.cardBackgroundColor,
                borderRadius: 16,
                marginTop: "3%",
                gap: 10,
              },
            ]}
          >
            <Text
              style={[
                fonts.size_16,
                fonts.fontWeight_small,
                { color: colors.gray200 },
              ]}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quo
              quisquam, aliquam nostrum animi iste error delectus explicabo
              tempore dolorem deserunt doloremque voluptate ipsam corrupti
              debitis a vitae enim! Error cupiditate ex doloremque omnis est?
            </Text>
          </View>
          <View
            style={[
              layout.row,
              layout.justifyBetween,
              layout.itemsCenter,
              { marginTop: "20%", marginBottom: "5%", height: 60 },
            ]}
          >
            <TouchableOpacity
              style={[
                layout.row,
                layout.justifyCenter,
                layout.itemsCenter,
                {
                  borderRadius: 10,
                  width: "49%",
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
                  width: "49%",
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
          </View>
        </ScrollView>
      </View>
    </SafeScreen>
  );
};

export default QuestionSolutionScreen;

const styles = StyleSheet.create({});
