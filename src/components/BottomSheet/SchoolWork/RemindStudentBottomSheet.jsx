import { useTheme } from "@/theme";
import React, { useState } from "react";
import { View, Modal, StyleSheet, TouchableOpacity, Text } from "react-native";
import Cross from "@/theme/assets/images/cross.png";
import { ImageVariant } from "../../atoms";
import PrimaryGradient from "../../template/LinearGradient/PrimaryGradient";
import RemindStudentSuccessfullyBottomSheet from "./RemindStudentSuccessfullyBottomSheet";

const RemindStudentBottomSheet = (props) => {
  const { setOpenRemindStudentBottomSheet, openRemindStudentBottomSheet } =
    props;
  const { colors, layout, fonts } = useTheme();
  const [openRemindStudentSuccessfully, setOpenRemindStudentSuccessfully] =
    useState(false);

  const handleSlideDown = () => {
    setOpenRemindStudentBottomSheet(false);
  };

  const handleYes = () => {
    setOpenRemindStudentSuccessfully(true);
    setTimeout(() => {
      setOpenRemindStudentBottomSheet(false);
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={openRemindStudentBottomSheet}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.bottomSheetContent,
              { backgroundColor: colors.bottomSheetBackgroundColor },
            ]}
          >
            <TouchableOpacity
              onPress={handleSlideDown}
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
                onPress={handleSlideDown}
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
                Are you sure you want to remind students to complete homework
              </Text>
              <Text
                style={[
                  fonts.size_14,
                  fonts.fontWeight_small,
                  { color: "#E2E2E2", paddingBottom: "2%" },
                ]}
              >
                Are you sure you want to remind students to complete homework
              </Text>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={() => setOpenRemindStudentBottomSheet(false)}
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
                    fonts.fontWeignt_600,
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
                onPress={handleYes}
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
                      fonts.fontWeignt_600,
                      fonts.alignCenter,
                      { color: colors.loginBtnTextColor },
                    ]}
                  >
                    Yes
                  </Text>
                </PrimaryGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <RemindStudentSuccessfullyBottomSheet
        setOpenRemindStudentSuccessfully={setOpenRemindStudentSuccessfully}
        openRemindStudentSuccessfully={openRemindStudentSuccessfully}
      />
    </View>
  );
};

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
    height: 350,
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
    height: 52,
    marginTop: 8,
    width: "100%",
  },
  radioButtonText: {
    marginLeft: 15,
    color: "#fff",
  },
  scrollContainer: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "transparent", // Change if needed
  },
  footerButton: {
    width: "48%",
    height: 48,
    borderRadius: 8,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    backgroundColor: "#22222F",
    borderRadius: 12,
    height: 52,
    marginTop: 5,
    width: "100%",
  },
});

export default RemindStudentBottomSheet;
