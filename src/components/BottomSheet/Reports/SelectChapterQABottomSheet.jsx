import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/theme";
import { ImageVariant } from "@/components/atoms";
import RadioButton from "../../RadioButton/RadioButton";
import Cross from "@/theme/assets/images/cross.png";
import PrimaryGradient from "@/components/template/LinearGradient/PrimaryGradient";
import SelectQuestionTypeBottomSheet from "./SelectQuestionTypeBottomSheet";

const chapters = [
  { id: 1, chapterId: "C1", chapterName: "Motion", strong: true },
  {
    id: 2,
    chapterId: "C2",
    chapterName: "Force and Laws of Motion",
    strong: true,
  },
  { id: 3, chapterId: "C3", chapterName: "Gravitation", strong: false },
  { id: 4, chapterId: "C4", chapterName: "Work and Energy", strong: true },
  { id: 5, chapterId: "C5", chapterName: "Sound", strong: false },
  { id: 5, chapterId: "C6", chapterName: "Heat", strong: false },
  {
    id: 5,
    chapterId: "C7",
    chapterName: "Electricity and Magnetism",
    strong: true,
  },
  { id: 5, chapterId: "C8", chapterName: "Refraction", strong: false },
];

const SelectChapterQABottomSheet = ({
  visible,
  closeModal,
  setSelectedChapter,
  changeQuestionType
}) => {
  const { fonts, layout, colors } = useTheme();

  const [selectedValue, setSelectedValue] = useState(null);

  const [openQuestionTypeModal, setOpenQuestionTypeModal] = useState(false);
  const closeQuestionTypeModal = () => {
    setOpenQuestionTypeModal(false);
  };
  const [option, setOption] = useState(null);
  const handleOptionChange = (op) => {
    setOption(op);
    console.log("op", op);
  };
  const handleApply = () => {
    setSelectedValue(option);
    // console.log("handle apply from chapter select QA: ", option);
    closeModal();
    setOpenQuestionTypeModal(true);
  };
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
                style={{ width: 16, height: 16, tintColor: "white" }}
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
              <Text
                style={[
                  fonts.size_20,
                  fonts.bold,
                  { color: colors.white, paddingBottom: "2%" },
                ]}
              >
                Select Chapter
              </Text>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: "5%" }}
              >
                {chapters?.map((ele) => (
                  <TouchableOpacity
                    key={ele.chapterId}
                    style={styles.radioButtonContainer}
                    onPress={() => handleOptionChange(ele)}
                    activeOpacity={1}
                  >
                    <View style={{ marginLeft: 10 }}>
                      <RadioButton isActive={option === ele} />
                    </View>
                    <Text
                      style={[
                        styles.radioButtonText,
                        fonts.size_14,
                        fonts.fontWeignt_600,
                      ]}
                    >
                      {ele.chapterId}:
                    </Text>
                    <Text
                      style={[
                        styles.radioButtonText,
                        fonts.size_14,
                        fonts.fontWeignt_600,
                      ]}
                    >
                      {ele.chapterName}
                    </Text>
                  </TouchableOpacity>
                ))}
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
                  onPress={handleApply}
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
                      Apply
                    </Text>
                  </PrimaryGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <SelectQuestionTypeBottomSheet
      changeQuestionType={changeQuestionType}
        setSelectedChapter={setSelectedChapter}
        selectedValue={selectedValue}
        visible={openQuestionTypeModal}
        closeModal={closeQuestionTypeModal}
      />
    </View>
  );
};

export default SelectChapterQABottomSheet;

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
});
