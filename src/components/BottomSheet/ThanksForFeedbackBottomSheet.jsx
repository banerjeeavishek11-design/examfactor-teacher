import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useTheme } from "@/theme";
import Feedback from "@/theme/assets/images/feedback.png";
import { ImageVariant } from "../atoms";
import rightArrow from "@/theme/assets/images/rightarrow.png";

const ThanksForFeedbackBottomSheet = ({ visible, closeModal }) => {
  const { fonts, colors, layout } = useTheme();
  return (
    <View style={styles.container}>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.bottomSheetContent,
              layout.paddingForCard,
              { backgroundColor: colors.bottomTabBackground },
            ]}
          >
            <TouchableOpacity
              onPress={closeModal}
              style={{ position: "absolute", top: -35, left: "98%" }}
            >
              <Text style={[fonts.size_18, { color: "white" }]}>X</Text>
            </TouchableOpacity>
            <View style={styles.center}>
              <TouchableOpacity
                style={styles.slideIndicator}
                onPress={closeModal}
              >
                <Text style={[fonts.size_18, { color: "white" }]}>-</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: "8%" }}>
              <View style={[layout.justifyCenter, layout.itemsCenter]}>
                <Image
                  style={{ width: 80, height: 80 }}
                  source={Feedback}
                  resizeMode={"contain"}
                />
              </View>
              <View style={{ width: "100%", alignSelf: "center" }}>
                <Text
                  style={[
                    fonts.size_24,
                    fonts.fontWeignt_600,
                    {
                      color: colors.white,
                      marginTop: "5%",
                      textAlign: "center",
                    },
                  ]}
                >
                  Thanks for your feedback!
                </Text>
              </View>

              <View
                style={{
                  width: "100%",
                  marginTop: "3%",
                }}
              >
                <Text
                  style={[
                    fonts.size_14,
                    fonts.fontWeight_small,
                    {
                      color: colors.white,
                      width: "75%",
                      textAlign: "center",
                      alignSelf: "center",
                      opacity: 0.6,
                    },
                  ]}
                >
                  Your appreciation motivate us to provide better quality.
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  {
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: colors.termsLinkColor,
                    marginVertical: "8%",
                  },
                ]}
                onPress={closeModal}
              >
                <TouchableOpacity
                  style={[styles.loginButton, layout.justifyCenter]}
                >
                  <View
                    style={[layout.display, layout.row, layout.itemsCenter]}
                  >
                    <Text
                      style={[
                        fonts.size_16,
                        fonts.bold,
                        { color: colors.loginBtnTextColor },
                      ]}
                    >
                      RATE US ON APP STORE
                    </Text>
                    <ImageVariant
                      testID="brand-img"
                      style={{ width: 16, height: 9, left: 5 }}
                      source={rightArrow}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ThanksForFeedbackBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
  bottomSheetContent: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 2,
    borderColor: "#8F8F94",
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
  },
  line: {
    position: "absolute",
    top: "70%",
    left: 18,
    right: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#8F8F94",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#7AF4FC",
    padding: 10,
    paddingTop: 11,
    borderRadius: 9,
    alignItems: "center",
    marginTop: "5%",
  },
});
