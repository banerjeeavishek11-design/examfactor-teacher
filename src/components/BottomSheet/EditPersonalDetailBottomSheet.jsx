import {
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import { useTheme } from "@/theme";
import RightArrow from "@/theme/assets/images/rightarrow.png";
import { Formik } from "formik";
import { ImageVariant } from "../atoms";
import Cross from "@/theme/assets/images/cross.png";

const EditPersonalDetailBottomSheet = ({
  personalDetailBottomSheetVisible,
  closeModal,
  profileData,
  saveNewData,
}) => {
  const { fonts, colors, layout } = useTheme();

  const handleOutsideTap = () => {
    Keyboard.dismiss();
  };

  return (
    <Modal
      visible={personalDetailBottomSheetVisible}
      animationType="slide"
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={handleOutsideTap}>
        <View style={[styles.modalContainer]}>
          <View
            style={[
              styles.bottomSheetContent,
              {
                padding: "4%",
                backgroundColor: colors.bottomSheetBackgroundColor,
                height: "90%",
              },
            ]}
          >
            <TouchableOpacity
              onPress={closeModal}
              style={{ position: "absolute", top: -35, left: "98%" }}
            >
              <ImageVariant style={{ width: 18, height: 18 }} source={Cross} />
            </TouchableOpacity>
            <Text style={[fonts.size_18, fonts.bold, { color: colors.white }]}>
              Edit personal details
            </Text>
            <Formik
              initialValues={{
                fullname: "",
                dob: "",
                gender: "",
                city: "",
                email: "",
                mobile: "",
                emergerncyContact: "",
                address: "",
              }}
              onSubmit={(values, actions) => {
                saveNewData(values);
                console.log(values);
                actions.setSubmitting(false);
                closeModal();
              }}
            >
              {({ handleChange, handleSubmit, values }) => {
                return (
                  <View style={{ marginTop: "8%" }}>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      style={{ height: "90%" }}
                    >
                      <View style={styles.inputContainer}>
                        <Text
                          style={[
                            fonts.size_18,
                            {
                              color: colors.white,
                              marginBottom: "2%",
                              opacity: 0.8,
                            },
                          ]}
                        >
                          Full Name
                        </Text>
                        <TextInput
                          style={[
                            styles.inputField,
                            layout.fullWidth,
                            layout.justifyCenter,
                            // Fonts.textCenter,
                            fonts.size_16,
                            {
                              color: colors.gray200,
                              textAlign: "left",
                              paddingLeft: "3%",
                              backgroundColor: colors.bottomTabBackground,
                            },
                          ]}
                          editable={false}
                          placeholder={profileData.fullName}
                          placeholderTextColor={colors.gray200}
                          onChangeText={handleChange("fullname")}
                          value={values.fullname}
                        />
                      </View>

                      <View style={styles.inputContainer}>
                        <Text
                          style={[
                            fonts.size_18,
                            {
                              color: colors.white,
                              marginBottom: "2%",
                              opacity: 0.8,
                            },
                          ]}
                        >
                          DOB
                        </Text>
                        <TextInput
                          style={[
                            styles.inputField,
                            layout.fullWidth,
                            layout.justifyCenter,
                            // Fonts.textCenter,
                            fonts.size_16,
                            {
                              color: colors.gray200,
                              textAlign: "left",
                              paddingLeft: "3%",
                            },
                          ]}
                          placeholder={profileData.dob}
                          placeholderTextColor={colors.gray400}
                          onChangeText={handleChange("dob")}
                          value={values.dob}
                        />
                      </View>

                      <View style={styles.inputContainer}>
                        <Text
                          style={[
                            fonts.size_18,
                            {
                              color: colors.white,
                              marginBottom: "2%",
                              opacity: 0.8,
                            },
                          ]}
                        >
                          Gender
                        </Text>
                        <View
                          style={[
                            layout.row,
                            layout.justifyBetween,
                            { marginTop: "2%" },
                          ]}
                        >
                          <TouchableOpacity
                            style={[
                              layout.justifyCenter,
                              layout.itemsCenter,
                              {
                                backgroundColor:
                                  profileData.gender === "Male"
                                    ? "#2F2B39"
                                    : colors.bottomTabBackground,
                                width: "45%",
                                paddingVertical: 12,
                                paddingHorizontal: 12,
                                borderRadius: 14,
                                borderWidth: 1,
                                borderColor:
                                  profileData.gender === "Male"
                                    ? colors.gray400
                                    : "transparent",
                              },
                            ]}
                            onPress={() => {}}
                          >
                            <Text
                              style={[
                                fonts.size_14,
                                fonts.bold,
                                layout.textCenter,
                                {
                                  color:
                                    profileData.gender === "Male"
                                      ? "#7AF4FC"
                                      : "#7A7A82",
                                },
                              ]}
                            >
                              Male
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              layout.justifyCenter,
                              layout.itemsCenter,
                              {
                                backgroundColor:
                                  profileData.gender !== "Male"
                                    ? "#2F2B39"
                                    : colors.bottomTabBackground,
                                width: "45%",
                                paddingHorizontal: 12,
                                borderRadius: 14,
                                borderWidth: 1,
                                borderColor:
                                  profileData.gender !== "Male"
                                    ? colors.gray400
                                    : "transparent",
                              },
                            ]}
                            onPress={() => {}}
                          >
                            <Text
                              style={[
                                fonts.size_14,
                                fonts.bold,
                                layout.textCenter,
                                {
                                  color:
                                    profileData.gender !== "Male"
                                      ? "#7AF4FC"
                                      : "#7A7A82",
                                },
                              ]}
                            >
                              Female
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={styles.inputContainer}>
                        <Text
                          style={[
                            fonts.size_18,
                            {
                              color: colors.white,
                              marginBottom: "2%",
                              opacity: 0.8,
                            },
                          ]}
                        >
                          Email
                        </Text>
                        <TextInput
                          style={[
                            styles.inputField,
                            layout.fullWidth,
                            layout.justifyCenter,
                            // Fonts.textCenter,
                            fonts.size_16,
                            {
                              color: colors.gray200,
                              textAlign: "left",
                              paddingLeft: "3%",
                              backgroundColor: colors.bottomTabBackground,
                            },
                          ]}
                          editable={false}
                          placeholder={profileData.email}
                          placeholderTextColor={colors.gray200}
                          onChangeText={handleChange("email")}
                          value={values.email}
                        />
                      </View>

                      <View style={styles.inputContainer}>
                        <Text
                          style={[
                            fonts.size_18,
                            {
                              color: colors.white,
                              marginBottom: "2%",
                              opacity: 0.8,
                            },
                          ]}
                        >
                          Mobile Number
                        </Text>
                        <TextInput
                          style={[
                            styles.inputField,
                            layout.fullWidth,
                            layout.justifyCenter,
                            // Fonts.textCenter,
                            fonts.size_16,
                            {
                              color: colors.gray200,
                              textAlign: "left",
                              paddingLeft: "3%",
                            },
                          ]}
                          keyboardType="phone-pad"
                          placeholder={profileData.mobile}
                          placeholderTextColor={colors.gray400}
                          onChangeText={handleChange("mobile")}
                          value={values.mobile}
                        />
                      </View>

                      <View style={styles.inputContainer}>
                        <Text
                          style={[
                            fonts.size_18,
                            {
                              color: colors.white,
                              marginBottom: "2%",
                              opacity: 0.8,
                            },
                          ]}
                        >
                          Emergency Contact Number
                        </Text>
                        <TextInput
                          style={[
                            styles.inputField,
                            layout.fullWidth,
                            layout.justifyCenter,
                            // Fonts.textCenter,
                            fonts.size_16,
                            {
                              color: colors.gray200,
                              textAlign: "left",
                              paddingLeft: "3%",
                            },
                          ]}
                          keyboardType="phone-pad"
                          placeholder={profileData.emergencyContact}
                          placeholderTextColor={colors.gray400}
                          onChangeText={handleChange("emergerncyContact")}
                          value={values.emergerncyContact}
                        />
                      </View>

                      <View style={styles.inputContainer}>
                        <Text
                          style={[
                            fonts.size_18,
                            {
                              color: colors.white,
                              marginBottom: "2%",
                              opacity: 0.8,
                            },
                          ]}
                        >
                          Address
                        </Text>
                        <TextInput
                          style={[
                            styles.inputField,
                            layout.fullWidth,
                            layout.justifyCenter,
                            // Fonts.textCenter,
                            fonts.size_16,
                            {
                              color: colors.gray200,
                              textAlign: "left",
                              paddingLeft: "3%",
                            },
                          ]}
                          placeholder={profileData.address}
                          placeholderTextColor={colors.gray400}
                          onChangeText={handleChange("address")}
                          value={values.address}
                        />
                      </View>
                    </ScrollView>
                    <TouchableOpacity
                      style={[
                        layout.justifyCenter,
                        layout.itemsCenter,
                        {
                          height: 48,
                          borderRadius: 12,
                          backgroundColor: colors.termsLinkColor,
                          position: "fixed",
                        },
                      ]}
                    >
                      <TouchableOpacity
                        style={[layout.justifyCenter]}
                        onPress={handleSubmit}
                      >
                        <View
                          style={[
                            layout.display,
                            layout.row,
                            layout.itemsCenter,
                          ]}
                        >
                          <Text
                            style={[
                              fonts.size_16,
                              fonts.bold,
                              { color: colors.loginBtnTextColor },
                            ]}
                          >
                            SAVE
                          </Text>
                          <ImageVariant
                            testID="brand-img"
                            style={{ width: 16, height: 9, left: 5 }}
                            source={RightArrow}
                            resizeMode="contain"
                          />
                        </View>
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>
                );
              }}
            </Formik>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EditPersonalDetailBottomSheet;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputField: {
    height: 48,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 12,
  },
  bottomSheetContent: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderTopWidth: 2,
    borderColor: "#8F8F94",
  },
});
