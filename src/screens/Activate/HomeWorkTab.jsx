import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import Search from "@/theme/assets/images/search.png";
import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";
import ToggleButton from "@/components/template/ToggleButton/ToggleButton";
import DownArrow from "@/theme/assets/images/Downarrow.png";
import UpArrow from "@/theme/assets/images/uparrow.png";
import ActiveHomeworkConfirmBottomTab from "@/components/BottomSheet/Activate/ActiveHomeworkConfirmBottomTab";

const TopicData = [
  {
    id: "C1",
    topic: "Motion",
    subTopics: [
      { id: 1, subtopic: "Introduction to Motion" },

      { id: 2, subtopic: "Rate of Motion" },
      { id: 3, subtopic: "Rate of Change of Velocity" },
      { id: 4, subtopic: "Graphical Representation of Motion" },
      { id: 5, subtopic: "Equations of Motion by Graphical Method" },
      { id: 6, subtopic: "Uniform Circular Motion" },
    ],
  },
  {
    id: "C2",
    topic: "Force and Laws of Motion",
    subTopics: [
      { id: 1, subtopic: "Introduction to Motion" },

      { id: 2, subtopic: "Rate of Motion" },
      { id: 3, subtopic: "Rate of Change of Velocity" },
      { id: 4, subtopic: "Equations of Motion by Graphical Method" },
      { id: 5, subtopic: "Uniform Circular Motion" },
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
  const closeActiveConfirmationModal = () => {
    setActivateConfirmationModalVisible(false);
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
          // onChangeText={onSearchChapters}
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
            { color: colors.gray200, marginTop: "4%" },
          ]}
        >
          Use toggle to activate the homework
        </Text>
        <ScrollView>
          <View style={{ marginBottom: "30%" }}>
            {TopicData.map((topic) => {
              return (
                <View
                  style={[
                    layout.fullWidth,
                    layout.paddingForCard,
                    {
                      backgroundColor: colors.cardBackgroundColor,
                      borderRadius: 14,
                      marginTop: "3%",
                      marginBottom: "2%",
                    },
                  ]}
                  key={topic.id}
                >
                  <View
                    style={[
                      layout.row,
                      layout.justifyBetween,
                      layout.itemsCenter,
                    ]}
                  >
                    <View style={[layout.row, { gap: 5, marginBottom: "5%" }]}>
                      <Text
                        style={[
                          fonts.size_16,
                          fonts.bold,
                          { color: colors.white },
                        ]}
                      >
                        {topic.id}:
                      </Text>
                      <Text
                        style={[
                          fonts.size_16,
                          fonts.bold,
                          { color: colors.white },
                        ]}
                      >
                        {topic.topic}
                      </Text>
                    </View>
                    {
                      <TouchableOpacity>
                        <Image
                          style={{ width: 14, height: 8 }}
                          source={DownArrow}
                        />
                      </TouchableOpacity>
                    }
                  </View>
                  <View>
                    {topic.subTopics.map((subTopic) => {
                      return (
                        <View
                          key={subTopic.id}
                          style={[
                            layout.row,
                            layout.justifyBetween,
                            layout.itemsCenter,
                            {
                              borderTopColor: colors.gray400,
                              borderTopWidth: 1,
                              paddingVertical: "5%",
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
                              {subTopic.subtopic}
                            </Text>
                          </View>
                          <View style={{backgroundColor: colors.cardBackgroundColor}}>
                            <ToggleButton
                              setActivateConfirmationModalVisible={
                                setActivateConfirmationModalVisible
                              }
                             
    
                            />
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <ActiveHomeworkConfirmBottomTab
        visible={activateConfirmationModalVisible}
        closeModal={closeActiveConfirmationModal}
       
      />
    </SafeScreen>
  );
};

export default HomeWorkTab;

const styles = StyleSheet.create({});
