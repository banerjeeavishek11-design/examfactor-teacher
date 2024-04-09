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
import ActivateDiagnosticConfirmationBottomSheet from "@/components/BottomSheet/Activate/ActivateDiagnosticConfirmationBottomSheet";

const TopicData = [
  {
    id: "C1",
    topic: "Motion",
    isActive: false,
  },
  {
    id: "C2",
    topic: "Force and Laws of Motion",
    isActive: false,
  },
  {
    id: "C3",
    topic: "Gravitation",
    isActive: false,
  },
  {
    id: "C4",
    topic: "Work and Energy",
    isActive: false,
  },
  {
    id: "C5",
    topic: "Sound",
    isActive: false,
  },
];

const DiagnosticTab = () => {
  const { layout, fonts, colors } = useTheme();
  const [
    activateConfirmationModalVisible,
    setActivateConfirmationModalVisible,
  ] = useState(false);
  const closeActiveConfirmationModal = () => {
    setActivateConfirmationModalVisible(false);
  };
  const [activatedData, setActivatedData] = useState();

  const topicActivated = (clickedBtnName) => {
    if (clickedBtnName === "YES") {
      let activatedTopic = { ...activatedData };
      activatedTopic.isActive = true;
      let topicIndex = TopicData.findIndex(
        (ele) => ele.topic == activatedData.topic
      );
      TopicData[topicIndex] = activatedTopic;
      console.log("TopicData after update", activatedTopic);
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
          >
            {TopicData.map((topic, index) => {
              return (
                <View
                  style={{
                    borderBottomWidth: index + 1 != TopicData.length ? 1 : 0,
                    borderBottomColor:
                      index + 1 != TopicData.length ? colors.gray400 : null,
                    marginVertical: "3%",
                  }}
                  key={topic.id}
                >
                  <View
                    style={[
                      layout.row,
                      layout.justifyBetween,
                      layout.itemsCenter,
                    ]}
                  >
                    <View style={[{ marginBottom: "4%", width: "70%" }]}>
                      <Text
                        style={[
                          fonts.size_16,
                          fonts.fontWeignt_600,
                          { color: colors.white },
                        ]}
                      >
                        {`C${index + 1}`}: {topic.topic}
                      </Text>
                    </View>
                    <View style={{ width: "0%" }}>
                      <ToggleButton
                        setActivateConfirmationModalVisible={
                          setActivateConfirmationModalVisible
                        }
                        activeToggleData={topic.isActive}
                        chapterInfo={{
                          topic: topic,
                        }}
                        setActivatedData={setActivatedData}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <ActivateDiagnosticConfirmationBottomSheet
        visible={activateConfirmationModalVisible}
        setActivateConfirmationModalVisible={
          setActivateConfirmationModalVisible
        }
        callAfterDialogClose={topicActivated}
      />
    </SafeScreen>
  );
};

export default DiagnosticTab;

const styles = StyleSheet.create({});
