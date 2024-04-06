import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { useTheme } from "@/theme";
import Feedback from "@/theme/assets/images/forgotsuccess.png";
import { ImageVariant } from "../../atoms";
import rightArrow from "@/theme/assets/images/rightarrow.png";
import Cross from "@/theme/assets/images/cross.png";
import PrimaryGradient from "../../template/LinearGradient/PrimaryGradient";

const RemindStudentSuccessfullyBottomSheet = (props) => {
  const { setOpenRemindStudentSuccessfully, openRemindStudentSuccessfully } =
    props;
  const { fonts, colors, layout } = useTheme();

  useEffect(() => {
    setTimeout(() => {
      setOpenRemindStudentSuccessfully(false);
    },5000);
  }, [openRemindStudentSuccessfully]);

  return (
    <View>
      <Modal
        visible={openRemindStudentSuccessfully}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.bottomSheetContent,
              layout.paddingForCard,
              { backgroundColor: colors.bottomTabBackground },
            ]}
          >
            <TouchableOpacity
              onPress={() => setOpenRemindStudentSuccessfully(false)}
              style={{ position: "absolute", top: -35, left: "98%" }}
            >
              <ImageVariant
                testID="brand-img"
                style={{ width: 16, height: 16, tintColor: colors.gray200 }}
                source={Cross}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                style={styles.slideIndicator}
                onPress={() => setOpenRemindStudentSuccessfully(false)}
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
                    fonts.size_16,
                    fonts.bold,
                    fonts.alignCenter,
                    {
                      color: colors.white,
                      marginTop: "5%",
                    },
                  ]}
                >
                  Remind to students to complete Home Work Successfully!
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
                    fonts.alignCenter,
                    {
                      color: colors.white,
                      width: "75%",
                      alignSelf: "center",
                      opacity: 0.6,
                    },
                  ]}
                >
                  All students with pending homework will get reminded.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RemindStudentSuccessfullyBottomSheet;

const styles = StyleSheet.create({
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
  slideIndicator: {
    width: 88,
    height: 8,
    backgroundColor: "#2F2B3A",
    borderRadius: 20,
    alignSelf: "center",
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
