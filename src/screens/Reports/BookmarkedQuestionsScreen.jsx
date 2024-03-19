import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import LeftArrow from "@/theme/assets/images/leftarrow.png";
import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";
import menu from "@/theme/assets/images/3dotMenu.png";
import Filter from "@/theme/assets/images/questionAnalysisFilter.png";
import { useNavigation, useRoute } from "@react-navigation/native";
import RightArrow from "@/theme/assets/images/arrow.png";
import leftArrow from "@/theme/assets/images/leftArrow2.png";
import Correct from "@/theme/assets/images/correctSolution.png";
import BookmarkedQuestionFilterBottomSheet from "@/components/BottomSheet/Reports/BookmarkedQuestionFilterBottomSheet";


const BookmarkedQuestions = [
  {
    id: 1,
    question:
      "A block of mass 2 kg is moving with a speed of 5 m/s on a frictionless surface. It collides with a stationary block of mass 3 kg. After the collision, the two blocks stick together. What is their common velocity?",
  },
  {
    id: 2,
    question:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores optio harum laborum recusandae quam totam cum esse cupiditate debitis expedita, atque maiores ad, voluptate voluptatibus.",
  },
  {
    id: 3,
    question:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae numquam maiores omnis qui dolorem, eveniet culpa itaque eum minus laborum sint soluta possimus vitae inventore?",
  },
  {
    id: 4,
    question:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit laborum rerum consequuntur alias quidem, vitae ipsa sequi repellat doloremque quaerat repellendus quasi voluptatibus, unde in.",
  },
  {
    id: 5,
    question:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci aut ex et dolorum recusandae, quos itaque quibusdam vitae accusamus commodi pariatur dolor necessitatibus accusantium quasi.",
  },
  {
    id: 6,
    question:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque neque dignissimos, optio obcaecati est, magni ducimus eius error culpa suscipit nihil repellat at possimus laudantium?",
  },
  {
    id: 7,
    question:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam at asperiores et aut illum, ab fuga expedita iusto pariatur! Dolorum, perspiciatis est. Quam, distinctio quae?",
  },
  {
    id: 8,
    question:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit quas dolorum rerum praesentium molestias illo architecto corporis, modi, temporibus nostrum repellat mollitia dolor! Perspiciatis, quaerat.",
  },
  {
    id: 9,
    question:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque laboriosam tempore rem dolorum necessitatibus adipisci quae officia, tempora deserunt et blanditiis expedita, eaque exercitationem pariatur.",
  },
  {
    id: 10,
    question:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque laboriosam tempore rem dolorum necessitatibus adipisci quae officia, tempora deserunt et blanditiis expedita, eaque exercitationem pariatur.",
  },
];

const questionsPerPage = 4;

const BookmarkedQuestionsScreen = ({ navigation }) => {
  const { layout, colors, fonts } = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalTabs, setTotalTabs] = useState([]);
  const startIndex = currentPage * questionsPerPage;
  const endIndex = Math.min(
    startIndex + questionsPerPage,
    BookmarkedQuestions.length
  );

  const [bookmarkFilterVisible, setBookmarkFilterVisible] = useState(false);
  const closeBookmarkFilterModal = () => {
    setBookmarkFilterVisible(false)
  }

  useEffect(() => {
    const noOfTabs = Math.ceil(BookmarkedQuestions.length / questionsPerPage);
    const tabs = [];
    for (let i = 0; i < noOfTabs; i++) {
      tabs.push(i);
    }
    setTotalTabs(tabs);
  }, []);

  return (
    <SafeScreen>
      <View style={[layout.paddingForFullScreen]}>
        <View
          style={[
            layout.rowHCenter,
            layout.justifyBetween,
            { marginBottom: "3%" },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
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
                Bookmarked Questions
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setBookmarkFilterVisible(true)}>
            <Image source={Filter} />
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView>
            {BookmarkedQuestions.slice(startIndex, endIndex).map((ques) => {
              return (
                <View
                  key={ques.id}
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
                  <View style={[layout.row, layout.justifyBetween]}>
                    <Text
                      style={[
                        fonts.size_14,
                        fonts.fontWeight_small,
                        { color: colors.white },
                      ]}
                    >
                      {ques.id}.
                    </Text>
                    <View style={{ width: "80%" }}>
                      <Text
                        style={[
                          fonts.size_14,
                          fonts.fontWeight_small,
                          { color: colors.white },
                        ]}
                      >
                        {ques.question}
                      </Text>
                      <TouchableOpacity onPress={()=>navigation.navigate("QuestionSolutionScreen",{
                        AllQuestions: BookmarkedQuestions,
                        currentQuestionId: ques.id,
                        currentQuestion: ques.question
                      })}>
                      <View
                        style={[
                          layout.row,
                          layout.itemsCenter,
                          { marginTop: "3%" },
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
                            width: 10,
                            height: 8,
                            tintColor: colors.termsLinkColor,
                          }}
                          source={RightArrow}
                        />
                      </View>
                      </TouchableOpacity>
                    </View>
                    <Image source={menu} />
                  </View>
                </View>
              );
            })}
            <View
              style={[
                layout.row,
                {
                  justifyContent: "center",
                  gap: 8,
                  marginBottom: "20%",
                  marginTop: "5%",
                },
              ]}
            >
              {totalTabs.map((index) => {
                return (
                  <TouchableOpacity
                    onPress={() => setCurrentPage(index)}
                    key={index}
                  >
                    <View
                      style={[
                        layout.justifyCenter,
                        layout.itemsCenter,
                        {
                          width: 45,
                          height: 45,
                          borderWidth: currentPage === index ? 1 : 0,
                          borderColor:
                            currentPage === index
                              ? colors.termsLinkColor
                              : null,
                          borderRadius: 8,
                          backgroundColor:
                            currentPage === index
                              ? "black"
                              : colors.cardBackgroundColor,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          fonts.bold,
                          {
                            color:
                              currentPage === index
                                ? colors.termsLinkColor
                                : colors.white,
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
          </ScrollView>
        </View>
      </View>
      <BookmarkedQuestionFilterBottomSheet visible={bookmarkFilterVisible} closeModal= {closeBookmarkFilterModal} />
    </SafeScreen>
  );
};

export default BookmarkedQuestionsScreen;

const styles = StyleSheet.create({});
