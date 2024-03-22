import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "@/theme";
import { ImageVariant } from "../../atoms";
import Cross from "@/theme/assets/images/cross.png";
import Success from "@/theme/assets/images/forgotsuccess.png";

const ClassSuccessfullySelectedBottomSheet = (props) => {
  const {
    colors,
    variant,
    changeTheme,
    layout,
    gutters,
    fonts,
    components,
    backgrounds,
  } = useTheme();
  const {
    setOpenClassSuccessfullySelectedBottomSheet,
    openClassSuccessfullySelectedBottomSheet,
    showSelecTedClass,
    openFrom,
  } = props;

  const handleSlideDown = () => {
    setOpenClassSuccessfullySelectedBottomSheet(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={openClassSuccessfullySelectedBottomSheet}
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
              style={[{ position: "absolute", top: -30, left: "92%" }]}
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
                onPress={handleSlideDown}
              ></TouchableOpacity>
            </View>
            <View
              style={[
                layout.paddingForCard,
                styles.scrollContainer,
                layout.justifyCenter,
                layout.itemsCenter,
              ]}
            >
              <ImageVariant
                testID="brand-img"
                style={[{ width: 80, height: 80, marginTop: "5%" }]}
                source={Success}
                resizeMode="contain"
              />

              {openFrom === "SelectClassBottomSheet" ? (
                <>
                  <View style={{ width: "50%", marginTop: "3%" }}>
                    <Text
                      style={[
                        fonts.size_16,
                        fonts.bold,
                        fonts.alignCenter,
                        { color: colors.white },
                      ]}
                    >
                      Class successfully Selected!
                    </Text>
                  </View>
                  <View style={{ width: "50%", marginTop: "3%" }}>
                    <Text
                      style={[
                        fonts.size_14,
                        fonts.fontWeight_small,
                        fonts.alignCenter,
                        { color: colors.white, opacity: 0.7 },
                      ]}
                    >
                      Your has been selected Class {showSelecTedClass}
                    </Text>
                  </View>
                </>
              ) : null}
              {
                openFrom === "ActivateHomeWorkConfirmationBottomTab" ? (
                  <View style={{ width: "90%", marginTop: "3%" }}>
                    <Text
                      style={[
                        fonts.size_18,
                        fonts.bold,
                        fonts.alignCenter,
                        { color: colors.white,marginTop:"4%" },
                      ]}
                    >
                      Topic activated Successfully!
                    </Text>
                    <Text style={[
                        fonts.size_14,
                        fonts.fontWeight_small,
                        fonts.alignCenter,
                        { color: colors.gray200,marginTop:"2%" },
                      ]}>Notification has been sent to all students.</Text>
                  </View>
                ) : null
              }
              {
                openFrom === "ActivateDiagnosticConfirmationBottomSheet" ? (
                  <View style={{ width: "90%", marginTop: "3%" }}>
                  <Text
                    style={[
                      fonts.size_18,
                      fonts.bold,
                      fonts.alignCenter,
                      { color: colors.white,marginTop:"4%" },
                    ]}
                  >
                    Chapter activated Successfully!
                  </Text>
                  <Text style={[
                      fonts.size_14,
                      fonts.fontWeight_small,
                      fonts.alignCenter,
                      { color: colors.gray200,marginTop:"2%" },
                    ]}>Notification has been sent to all students.</Text>
                </View>
                ) : null
              }
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ClassSuccessfullySelectedBottomSheet;

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
    height: 300,
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
});
