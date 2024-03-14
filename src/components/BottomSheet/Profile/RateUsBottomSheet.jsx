import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { useTheme } from "@/theme";
import React, { useState, useEffect } from "react";
import RateUsStart from "@/theme/assets/images/rateusstar.png";
import Cross from "@/theme/assets/images/cross.png";
import { ImageVariant } from "../../atoms";
import PrimaryGradient from "../../template/LinearGradient/PrimaryGradient";
import ThanksForFeedbackBottomSheet from "./ThanksForFeedbackBottomSheet";

const starRatings = [
  { id: 1, selected: false },
  { id: 2, selected: false },
  { id: 3, selected: false },
  { id: 4, selected: false },
  { id: 5, selected: false },
];

const lessThanThreeStarOptions = [
  { id: 1, name: "Unclear and irrelevant questions", isChecked: false },
  { id: 2, name: "Incorrect or misleading information", isChecked: false },
  { id: 3, name: "Confusing and non-intuitive navigation", isChecked: false },
  { id: 4, name: "Unappealing platform theme", isChecked: false },
];
const moreThanThreeStarOptions = [
  { id: 1, name: "Great quality of questions", isChecked: false },
  { id: 2, name: "Great quality of solutions", isChecked: false },
  { id: 3, name: "Best platform interface", isChecked: false },
  { id: 4, name: "Great platform theme", isChecked: false },
  { id: 5, name: "Features are engaging", isChecked: false },
  { id: 6, name: "Overall great experience", isChecked: false },
];

const RateUsBottomSheet = (props) => {
  const { visible, setRateUsModalVisible } = props;
  const { layout, fonts, colors } = useTheme();
  const [selectedRating, setSelectedRating] = useState(0);
  const [submittedRating, setSubmittedRating] = useState(0);
  const [lessThanThreeOptions, setLessThanThreeOptions] = useState(
    lessThanThreeStarOptions
  );
  const [
    thanksForYourFeedbackBottomSheetVisible,
    setThanksForYourFeedbackBottomSheetVisible,
  ] = useState(false);

  const [comment, setComment] = useState("");
  const [selectedIssues, setSelectedIssues] = useState([]);

  useEffect(() => {
    // Update optionsData based on the selectedRating
    if (selectedRating >= 1 && selectedRating <= 3) {
      // Display the first set of options
      setLessThanThreeOptions(lessThanThreeStarOptions);
    } else if (selectedRating >= 4 && selectedRating <= 5) {
      // Display the second set of options
      setLessThanThreeOptions(moreThanThreeStarOptions);
    }
  }, [selectedRating]);

  const handleSlideDown = () => {
    setRateUsModalVisible(false);
    setSubmittedRating(0);
    setSelectedRating(0);
  };

  const handleStarPress = (ratingId) => {
    setSelectedRating(ratingId);
    setSelectedIssues([]);
  };

  const toggleSelection = (name) => {
    if (selectedIssues.includes(name)) {
      setSelectedIssues((prevSelected) =>
        prevSelected.filter((item) => item !== name)
      );
    } else {
      setSelectedIssues((prevSelected) => [...prevSelected, name]);
    }
  };

  const openThanksForFeedbackModal = () => {
    setThanksForYourFeedbackBottomSheetVisible(true);
  };
  const closeThanksForFeedbackModal = () => {
    setThanksForYourFeedbackBottomSheetVisible(false);
  };
  return (
    <View>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={[styles.modalContainer]}>
          <View
            style={[
              styles.bottomSheetContent,
              layout.paddingForFullScreen,
              { backgroundColor: colors.bottomSheetBackgroundColor },
            ]}
          >
            <TouchableOpacity
              onPress={handleSlideDown}
              style={[{ position: "absolute", top: -35, left: "100%" }]}
            >
              <ImageVariant
                testID="brand-img"
                style={{ width: 16, height: 16, tintColor: "white" }}
                source={Cross}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View
            //   style={styles.center}
            >
              <TouchableOpacity
                style={styles.slideIndicator}
                onPress={handleSlideDown}
              >
                <Text>-</Text>
              </TouchableOpacity>

              <View>
                <View style={{ marginTop: "5%" }}>
                  <Text
                    style={[
                      fonts.size_18,
                      fonts.fontWeignt_600,
                      { color: colors.white },
                    ]}
                  >
                    How is your experience so far?
                  </Text>
                </View>
                <ScrollView
                  contentContainerStyle={{ paddingBottom: "0%" }}
                  showsVerticalScrollIndicator={false}
                >
                  <View
                    style={[
                      layout.display,
                      layout.rowHCenter,
                      layout.justifyBetween,
                      { marginTop: "3%" },
                    ]}
                  >
                    {starRatings.map((rating) => (
                      <TouchableOpacity
                        key={rating.id}
                        onPress={() => handleStarPress(rating.id)}
                      >
                        <Image
                          style={{
                            width: 48,
                            height: 48,
                            tintColor:
                              rating.id <= selectedRating
                                ? "#FFAB48"
                                : "#585868",
                          }}
                          source={RateUsStart}
                          resizeMode={"contain"}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View
                    style={[
                      layout.display,
                      layout.rowHCenter,
                      layout.justifyBetween,
                      { marginTop: "3%" },
                    ]}
                  >
                    <Text
                      style={[
                        fonts.alignCenter,
                        { color: colors.backButtonColor },
                      ]}
                    >
                      Not satisfied
                    </Text>
                    <Text
                      style={[
                        fonts.alignCenter,
                        { color: colors.backButtonColor },
                      ]}
                    >
                      Great
                    </Text>
                  </View>
                  {selectedRating > 0 && (
                    <View style={{ marginTop: "8%" }}>
                      <View
                        style={{
                          flexDirection: "column",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            rowGap: 10,
                            columnGap: 10,
                            marginBottom: 10,
                          }}
                        >
                          {lessThanThreeOptions.map((ele) => (
                            <TouchableOpacity
                              key={ele.id}
                              style={{
                                backgroundColor: "#22222F",
                                //   opacity: 0.1,
                                height: 42,
                                paddingHorizontal: 12,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 4,
                                borderWidth: 2,
                                borderColor: selectedIssues.includes(ele.name)
                                  ? "#7AF4FC"
                                  : "transparent",
                              }}
                              onPress={() => toggleSelection(ele.name)}
                            >
                              <Text
                                style={[
                                  fonts.size_14,
                                  fonts.fontWeight_small,
                                  layout.textCenter,
                                  {
                                    color: selectedIssues.includes(ele.name)
                                      ? "#7AF4FC"
                                      : "#7A7A82",
                                  },
                                ]}
                              >
                                {ele.name}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>

                      <View
                        style={[
                          layout.display,
                          layout.row,
                          layout.itemsCenter,
                          styles.inputField,
                          {
                            paddingHorizontal: 10,
                            marginTop: "5%",
                            height: 90,
                          },
                        ]}
                      >
                        <TextInput
                          style={[
                            layout.fullWidth,
                            layout.justifyCenter,
                            fonts.textCenter,
                            fonts.size_16,
                            {
                              color: "#94939B",
                              textAlign: "left",
                              paddingLeft: "0%",
                              minHeight: 70,
                              verticalAlign: "top",
                            },
                          ]}
                          placeholder="Add Comment"
                          placeholderTextColor="#7A7A82"
                          multiline={true}
                          value={comment}
                          onChangeText={(text) => setComment(text)}
                        />
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          handleSlideDown();
                          openThanksForFeedbackModal();
                        }}
                      >
                        <PrimaryGradient
                          styleProp={[styles.loginButton, layout.justifyCenter]}
                        >
                          <View style={[layout.display, layout.rowHCenter]}>
                            <Text
                              style={[
                                fonts.size_16,
                                fonts.bold,
                                { color: colors.loginBtnTextColor },
                              ]}
                            >
                              Submit
                            </Text>
                          </View>
                        </PrimaryGradient>
                      </TouchableOpacity>
                    </View>
                  )}
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <ThanksForFeedbackBottomSheet
        closeModal={closeThanksForFeedbackModal}
        visible={thanksForYourFeedbackBottomSheetVisible}
      />
    </View>
  );
};

export default RateUsBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  bottomSheetContent: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 2,
    borderColor: "#8F8F94",
  },
  slideIndicator: {
    width: 88,
    height: 8,
    backgroundColor: "#2F2B3A",
    borderRadius: 20,
    alignSelf: "center",
  },
  inputField: {
    height: 48,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 4,
  },
  loginButton: {
    height: 48,
    width: "100%",
    borderRadius: 9,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
  },
});
