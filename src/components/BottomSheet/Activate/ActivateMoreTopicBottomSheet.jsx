import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import React, { useState } from "react";
import { useTheme } from "@/theme";
import { ImageVariant } from "@/components/atoms";
import Cross from "@/theme/assets/images/cross.png";
import PrimaryGradient from "@/components/template/LinearGradient/PrimaryGradient";
import { Searchbar } from "react-native-paper";
import Search from "@/theme/assets/images/search.png";
import ClassSuccessfullySelectedBottomSheet from "../Home/ClassSuccessfullySelectedBottomSheet";

const MoreTopicData = [
  { id: 1, topic: "Introduction to Motion" },
  { id: 2, topic: "Rate of Motion" },
  { id: 3, topic: "Rate of Change of Velocity" },
  { id: 4, topic: "Graphical Representation of Motion" },
  { id: 5, topic: "Equations of Motion by Graphical Method" },
];

const ActivateMoreTopicBottomSheet = ({ visible, closeModal }) => {
  const { layout, fonts, colors } = useTheme();

  return (
    <View style={styles.container}>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.bottomSheetContent,
              { backgroundColor: colors.bottomSheetBackgroundColor },
            ]}
          >
            <TouchableOpacity
              onPress={closeModal}
              style={[{ position: "absolute", top: -35, left: "92%" }]}
            >
              <ImageVariant
                testID="brand-img"
                style={{ width: 16, height: 16, tintColor: colors.gray200 }}
                source={Cross}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.center}>
              <TouchableOpacity
                style={styles.slideIndicator}
                onPress={closeModal}
              ></TouchableOpacity>
            </View>
            <View style={[layout.paddingForCard, styles.scrollContainer]}>
              <View style={{ width: "80%" }}>
                <Text
                  style={[
                    fonts.size_20,
                    fonts.bold,
                    { color: colors.white, textAlign: "left" },
                  ]}
                >
                  Activate More Home Work.
                </Text>
                <Text
                  style={[
                    fonts.size_14,
                    fonts.fontWeight_small,
                    { color: colors.gray200, marginVertical: "4%" },
                  ]}
                >
                  Number of topics selected: 2
                </Text>
              </View>
              <Searchbar
                placeholder="Search Topics"
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
                  backgroundColor: colors.bottomSheetBackgroundColor,
                  borderColor: "rgba(275, 275, 275, 0.5)",
                  borderWidth: 1,
                  borderRadius: 8,
                }}
                clearButtonMode="while-editing"
                selectionColor={colors.buttonTextColor}
              />
              <ScrollView>
                {MoreTopicData.map((topicName) => {
                  return (
                    <TouchableOpacity
                      key={topicName.id}
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
                      <View
                        style={[layout.row, layout.itemsCenter, { gap: 8 }]}
                      >
                        <TouchableOpacity
                          // onPress={() =>
                          //   handleToggle(
                          //     item.chapterCode,
                          //     topic.topicCode
                          //   )
                          // }
                          activeOpacity={0.8}
                        >
                          <View
                            style={[
                              styles.checkbox,
                              layout.justifyCenter,
                              layout.itemsCenter,
                              { color: colors.white },
                              // selectedItem.includes(topic.topicCode) &&
                              //   styles.checked,
                            ]}
                          >
                            {/* {selectedItem.includes(topic.topicCode) && (
                                    <Ionicons
                                      name="checkmark-outline"
                                      size={18}
                                      color="white"
                                    />
                                  )} */}
                          </View>
                        </TouchableOpacity>
                        <Text
                          style={[
                            fonts.size_14,
                            fonts.fontWeight_small,
                            { color: colors.white },
                          ]}
                        >
                          {topicName.topic}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              <View style={styles.footer}>
                <TouchableOpacity
                  onPress={closeModal}
                  style={[
                    layout.justifyCenter,
                    styles.footerButton,
                    {
                      backgroundColor: colors.cardBackgroundColor,
                    },
                  ]}
                >
                  <Text
                    style={[
                      fonts.size_16,
                      fonts.bold,
                      fonts.alignCenter,
                      { color: colors.termsLinkColor },
                    ]}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    layout.justifyCenter,
                    styles.footerButton,
                    {
                      backgroundColor: colors.termsLinkColor,
                    },
                  ]}
                  onPress={closeModal}
                >
                  <PrimaryGradient
                    styleProp={[
                      layout.justifyCenter,
                      { height: "100%", borderRadius: 8 },
                    ]}
                  >
                    <Text
                      style={[
                        fonts.size_16,
                        fonts.bold,
                        fonts.alignCenter,
                        { color: colors.loginBtnTextColor },
                      ]}
                    >
                      Confirm
                    </Text>
                  </PrimaryGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
     
    </View>
  );
};

export default ActivateMoreTopicBottomSheet;

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
    height: 550,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 2,
    borderColor: "gray",
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  slideIndicator: {
    width: 88,
    height: 8,
    backgroundColor: "#2F2B3A",
    borderRadius: 20,
    alignSelf: "center",
    marginTop: "4%",
  },
  line: {
    position: "absolute",
    top: "65%",
    left: 18,
    right: 18,
    borderBottomWidth: 1,
    // borderBottomColor: Colors.textGray,
  },
  button: {
    // backgroundColor: Colors.buttonBackgroundColor,
    padding: 10,
    paddingTop: 11,
    borderRadius: 9,
    alignItems: "center",
  },
  smallBtn: {
    height: 32,
    borderRadius: 9,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    backgroundColor: "#22222F",
    borderRadius: 12,
    height: 60,
    marginTop: 8,
    width: "100%",
  },
  radioButtonText: {
    marginLeft: 8,
    color: "#fff",
  },
  scrollContainer: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    //   padding: 20,
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: "transparent", // Change if needed
  },
  footerButton: {
    width: "48%",
    height: 48,
    borderRadius: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderColor: "white",
    borderWidth: 1,
    // marginTop: 10,
  },
});
