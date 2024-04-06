import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Divider, Searchbar } from "react-native-paper";
import Search from "@/theme/assets/images/search.png";
import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";
import ToggleButton from "@/components/template/ToggleButton/ToggleButton";
import DownArrow from "@/theme/assets/images/Downarrow.png";
import UpArrow from "@/theme/assets/images/uparrow.png";
import ActiveHomeworkConfirmBottomSheet from "@/components/BottomSheet/Activate/ActiveHomeworkConfirmBottomSheet";

const TopicData = [
  {
    id: "C1",
    topic: "Motion",
    subTopics: [
      { id: 1, subtopic: "Introduction to Motion", isActive: false },

      {
        id: 2,
        subtopic: "Rate of Motion",
        isActive: false,
      },
      { id: 3, subtopic: "Rate of Change of Velocity", isActive: false },
      {
        id: 4,
        subtopic: "Graphical Representation of Motion",
        isActive: false,
      },
      {
        id: 5,
        subtopic: "Equations of Motion by Graphical Method",
        isActive: false,
      },
      { id: 6, subtopic: "Uniform Circular Motion", isActive: false },
    ],
  },
  {
    id: "C2",
    topic: "Force and Laws of Motion",
    subTopics: [
      { id: 1, subtopic: "Introduction to Motion", isActive: false },
      { id: 2, subtopic: "Rate of Motion", isActive: false },
      { id: 3, subtopic: "Rate of Change of Velocity", isActive: false },
      {
        id: 4,
        subtopic: "Equations of Motion by Graphical Method",
        isActive: false,
      },
      { id: 5, subtopic: "Uniform Circular Motion", isActive: false },
    ],
  },
  {
    id: "C3",
    topic: "Gravitation",
    subTopics: [
      { id: 1, subtopic: "Introduction to Motion" },
      { id: 2, subtopic: "Rate of Motion" },
      { id: 3, subtopic: "Rate of Change of Velocity" },
      { id: 4, subtopic: "Equations of Motion by Graphical Method" },
      { id: 5, subtopic: "Uniform Circular Motion" },
    ],
  },
  {
    id: "C4",
    topic: "Work and Energy",
    subTopics: [
      { id: 1, subtopic: "Introduction to Motion" },
      { id: 2, subtopic: "Rate of Motion" },
      { id: 3, subtopic: "Rate of Change of Velocity" },
      { id: 4, subtopic: "Equations of Motion by Graphical Method" },
      { id: 5, subtopic: "Uniform Circular Motion" },
    ],
  },
  {
    id: "C5",
    topic: "Sound",
    subTopics: [
      { id: 1, subtopic: "Introduction to Motion" },
      { id: 2, subtopic: "Rate of Motion" },
      { id: 3, subtopic: "Rate of Change of Velocity" },
      { id: 4, subtopic: "Equations of Motion by Graphical Method" },
      { id: 5, subtopic: "Uniform Circular Motion" },
    ],
  },
];

const HomeWorkTab = () => {
  const { layout, fonts, colors } = useTheme();
  const [
    activateConfirmationModalVisible,
    setActivateConfirmationModalVisible,
  ] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  const [searchChapterName, setSearchChapterName] = useState([]);
  const [activatedData, setActivatedData] = useState();

  useEffect(() => {
    setSearchChapterName(TopicData);
  }, []);

  const toggleContent = (id) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const onSearchChapters = (search) => {
    const searchItem = TopicData.filter((ele) =>
      ele.topic.toLowerCase().includes(search.toLowerCase())
    );
    setSearchChapterName(searchItem);
  };

  const topicActivated = (clickedBtnName) => {
    if (clickedBtnName === "YES") {
      let activatedTopic = { ...activatedData.subTopic };
      activatedTopic.isActive = true;
      let topicIndex = TopicData.findIndex(
        (ele) => ele.topic == activatedData.topic
      );
      let subTopicIndex = TopicData[topicIndex].subTopics.findIndex(
        (ele) => ele.subtopic == activatedData.subTopic.subtopic
      );
      TopicData[topicIndex].subTopics[subTopicIndex] = activatedTopic;
      console.log('TopicData after update',TopicData)
      setActivatedData(TopicData);
    }
  };


  return (
    <SafeScreen>
      <View style={[layout.paddingForFullScreen]}>
        <Searchbar
          placeholder="Search Chapter"
          placeholderTextColor="rgba(275, 275, 275, 0.5)"
          iconColor="rgba(275, 275, 275, 0.5)"
          inputStyle={[
            fonts.size_14,
            fonts.fontWeignt_600,
            { color: colors.white, right: 10 },
          ]}
          icon={() => (
            <Image
              source={Search}
              resizeMode="contain"
              style={{ width: 14, height: 14 }}
            />
          )}
          onChangeText={onSearchChapters}
          style={{
            backgroundColor: "#09070E",
            borderColor: "rgba(275, 275, 275, 0.5)",
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
            { color: colors.gray200, marginTop: "4%", marginBottom: "2%" },
          ]}
        >
          Use toggle to activate the homework
        </Text>
        <ScrollView contentContainerStyle={{ paddingBottom: "30%" }}>
          {searchChapterName.map((ele, i) => {
            return (
              <TouchableOpacity onPress={() => toggleContent(ele.id)}
                key={i}
                style={[
                  layout.fullWidth,
                  layout.paddingForCard,
                  {
                    backgroundColor: colors.cardBackgroundColor,
                    borderRadius: 14,
                    marginTop: "4%",
                    height: "auto",
                  },
                ]}
              >
                <View
                  style={[
                    layout.display,
                    layout.rowHCenter,
                    layout.justifyBetween,
                  ]}
                >
                  <Text
                    style={[
                      fonts.size_14,
                      fonts.fontWeignt_600,
                      { color: colors.white },
                    ]}
                  >{`C${i + 1}: ${ele.topic}`}</Text>
                  <TouchableOpacity >
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
                {expandedCards[ele.id] ? (
                  <>
                    {ele.subTopics.map((item) => {
                      return (
                        <View key={item.id}>
                          <View
                            style={[
                              layout.display,
                              layout.rowHCenter,
                              layout.justifyBetween,
                              {
                                borderTopColor: colors.gray400,
                                borderTopWidth: 1,
                                paddingVertical: "5%",
                                marginTop: "2%",
                              },
                            ]}
                          >
                            <View style={{ width: "70%" }}>
                              <Text
                                style={[
                                  fonts.size_16,
                                  fonts.fontWeight_small,
                                  { color: colors.gray200 },
                                ]}
                              >
                                {item.subtopic}
                              </Text>
                            </View>
                            <View style={{ width: "0%" }}>
                              <ToggleButton
                                setActivateConfirmationModalVisible={
                                  setActivateConfirmationModalVisible
                                }
                                activeToggleData={item.isActive}
                                chapterInfo={{
                                  topic: ele.topic,
                                  subTopic: item,
                                }}
                                setActivatedData={setActivatedData}
                              />
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </>
                ) : null}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <ActiveHomeworkConfirmBottomSheet
        visible={activateConfirmationModalVisible}
        setActivateConfirmationModalVisible={
          setActivateConfirmationModalVisible
        }
        callAfterDialogClose={topicActivated}
      />
    </SafeScreen>
  );
};

export default HomeWorkTab;

const styles = StyleSheet.create({});
