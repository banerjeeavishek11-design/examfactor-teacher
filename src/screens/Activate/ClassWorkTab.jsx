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
    tests: [
      { id: "Test 1", activated: "Aug 28,2023", for: "02 Sep, 2023" },
      { id: "Test 3", activated: "Aug 29,2023", for: "03 Sep, 2023" },
      { id: "Test 2", activated: "Aug 30,2023", for: "04 Sep, 2023" },
    ],
  },
  {
    id: "C2",
    topic: "Force and Laws of Motion",
    tests: [
      { id: "Test 1", activated: "Aug 28,2023", for: "02 Sep, 2023" },
      { id: "Test 3", activated: "Aug 29,2023", for: "03 Sep, 2023" },
      { id: "Test 2", activated: "Aug 30,2023", for: "04 Sep, 2023" },
    ],
  },
  {
    id: "C3",
    topic: "Gravitation",
    tests: [
      { id: "Test 1", activated: "Aug 28,2023", for: "02 Sep, 2023" },
      { id: "Test 3", activated: "Aug 29,2023", for: "03 Sep, 2023" },
      { id: "Test 2", activated: "Aug 30,2023", for: "04 Sep, 2023" },
    ],
  },
  {
    id: "C4",
    topic: "Work and Energy",
    tests: [
      { id: "Test 1", activated: "Aug 28,2023", for: "02 Sep, 2023" },
      { id: "Test 3", activated: "Aug 29,2023", for: "03 Sep, 2023" },
      { id: "Test 2", activated: "Aug 30,2023", for: "04 Sep, 2023" },
    ],
  },
  {
    id: "C5",
    topic: "Sound",
    tests: [
      { id: "Test 1", activated: "Aug 28,2023", for: "02 Sep, 2023" },
      { id: "Test 3", activated: "Aug 29,2023", for: "03 Sep, 2023" },
      { id: "Test 2", activated: "Aug 30,2023", for: "04 Sep, 2023" },
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
          placeholder="Search Class Work"
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
                    {topic.tests.map((tests) => {
                      return (
                        <View
                          key={tests.id}
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
                                { color: colors.white },
                              ]}
                            >
                              {tests.id}
                            </Text>
                            <Text style={[fonts.size_14,{color: colors.gray200}]}>Activated on {tests.activated}</Text>
                            <Text style={[fonts.size_14,fonts.bold,{color: colors.gray200}]}>For {tests.for}</Text>
                          </View>
                          <View
                            style={{
                              backgroundColor: colors.cardBackgroundColor,
                            }}
                          >
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
    </SafeScreen>
  );
};

export default HomeWorkTab;

const styles = StyleSheet.create({});
