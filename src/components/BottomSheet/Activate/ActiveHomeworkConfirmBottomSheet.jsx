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
import Cross from "@/theme/assets/images/cross.png";
import PrimaryGradient from "@/components/template/LinearGradient/PrimaryGradient";
import ActivateMoreTopicBottomSheet from "./ActivateMoreTopicBottomSheet";
import ClassSuccessfullySelectedBottomSheet from "../Home/ClassSuccessfullySelectedBottomSheet";

const ActiveHomeworkConfirmBottomSheet = ({
  visible,
  setActivateConfirmationModalVisible,
  callAfterDialogClose,
}) => {
  const { layout, colors, fonts } = useTheme();
  const [moreTopicModalVisible, setMoreTopicModalVisible] = useState(false);
  const closeMoreTopicModal = () => {
    setMoreTopicModalVisible(false);
  };
  const [
    openClassSuccessfullySelectedBottomSheet,
    setOpenClassSuccessfullySelectedBottomSheet,
  ] = useState(false);

  const topicActivated = (clickedBtnName) => {
    if (clickedBtnName === "YES") {
      setOpenClassSuccessfullySelectedBottomSheet(true);
      setActivateConfirmationModalVisible(false);
      callAfterDialogClose(clickedBtnName);
    } else {
      setActivateConfirmationModalVisible(false);
    }
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
              onPress={() => setActivateConfirmationModalVisible(false)}
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
                onPress={() => setActivateConfirmationModalVisible(false)}
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
                  Are you sure you want to activate this Home Work ?
                </Text>
                <Text
                  style={[
                    fonts.size_14,
                    fonts.fontWeight_small,
                    { color: colors.gray200, marginVertical: "4%" },
                  ]}
                >
                  Number of topics selected: 1
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setMoreTopicModalVisible(true);
                    setActivateConfirmationModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      fonts.size_16,
                      fonts.bold,
                      {
                        color: colors.linearGradientColor,
                        marginBottom: "10%",
                      },
                    ]}
                  >
                    Activate more topics
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.footer}>
                <TouchableOpacity
                  onPress={() => topicActivated("NO")}
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
                  onPress={() => {
                    topicActivated("YES");
                  }}
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
                      Yes
                    </Text>
                  </PrimaryGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <ActivateMoreTopicBottomSheet
        visible={moreTopicModalVisible}
        closeModal={closeMoreTopicModal}
      />
      <ClassSuccessfullySelectedBottomSheet
        setOpenClassSuccessfullySelectedBottomSheet={
          setOpenClassSuccessfullySelectedBottomSheet
        }
        openClassSuccessfullySelectedBottomSheet={
          openClassSuccessfullySelectedBottomSheet
        }
        openFrom={"ActivateHomeWorkConfirmationBottomTab"}
      />
    </View>
  );
};

export default ActiveHomeworkConfirmBottomSheet;

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
