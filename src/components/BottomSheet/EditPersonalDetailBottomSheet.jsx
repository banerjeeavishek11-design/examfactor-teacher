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
import RightArrow from '@/theme/assets/images/rightarrow.png'
import { Formik } from "formik";
import { ImageVariant } from "../atoms";

const EditPersonalDetailBottomSheet = ({
  personalDetailBottomSheetVisible,
  closeModal,
  profileData,
  saveNewData
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
              backgroundColor:"#1C1827",
              height: "90%",
            },
          ]}
        >
          <TouchableOpacity
            onPress={closeModal}
            style={{ position: "absolute", top: -35, left: "98%" }}
          >
            {/* <AntDesign name="close" size={24} color="gray" /> */}
            <Text style={[fonts.size_18, { color: "white" }]}>X</Text>
          </TouchableOpacity>
          <Text
            style={[fonts.size_18, fonts.bold, { color: "white" }]}
          >
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
                closeModal()
              }}
            >
              {({ handleChange, handleSubmit, values }) => {
                return (
                  <View style={{ marginTop: "8%" }}>
                    <ScrollView style={{height: "90%"}}>
                    <View style={styles.inputContainer}>
                      <Text style={[fonts.size_18,{color: colors.white, marginBottom: '2%', opacity: 0.8}]}>Full Name</Text>
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
                            backgroundColor: "#22222F"
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
                      <Text style={[fonts.size_18,{color: colors.white, marginBottom: '2%', opacity: 0.8}]}>DOB</Text>
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

                    <View  style={styles.inputContainer}>
                    <Text style={[fonts.size_18,{color: colors.white, marginBottom: '2%', opacity: 0.8}]}>Gender</Text>
                        <View style={[layout.row, layout.justifyBetween,{marginTop: "2%"}]}>
                        <TouchableOpacity
                            style={{
                              backgroundColor: profileData.gender === "Male" ? "#2F2B39" : "#22222F",
                              width: "45%",
                              paddingVertical: 12,
                              paddingHorizontal: 12,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 14,
                              borderWidth: 1,
                              borderColor: profileData.gender === "Male"
                                ? colors.gray400
                                : "transparent",
                            }}
                            onPress={() => {}}
                          >
                            <Text
                              style={[
                                fonts.size_14,
                                fonts.bold,
                                layout.textCenter,
                                {
                                  color: profileData.gender === "Male"
                                    ? "#7AF4FC"
                                    : "#7A7A82",
                                },
                              ]}
                            >
                              Male
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              backgroundColor: profileData.gender !== "Male" ? "#2F2B39" : "#22222F",
                              width: "45%",
                              paddingHorizontal: 12,
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: 14,
                              borderWidth: 1,
                              borderColor: profileData.gender !== "Male"
                              ? colors.gray400
                              : "transparent",
                            }}
                            onPress={() => {}}
                          >
                            <Text
                              style={[
                                fonts.size_14,
                                fonts.bold,
                                layout.textCenter,
                                {
                                  color: profileData.gender !== "Male"
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
                      <Text style={[fonts.size_18,{color: colors.white, marginBottom: '2%', opacity: 0.8}]}>Email</Text>
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
                            backgroundColor: "#22222F"
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
                      <Text style={[fonts.size_18,{color: colors.white, marginBottom: '2%', opacity: 0.8}]}>Mobile Number</Text>
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
                      <Text style={[fonts.size_18,{color: colors.white, marginBottom: '2%', opacity: 0.8}]}>Emergency Contact Number</Text>
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
                      <Text style={[fonts.size_18,{color: colors.white, marginBottom: '2%', opacity: 0.8}]}>Address</Text>
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
                  styles.buttonContainer,
                  {
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: colors.termsLinkColor,
                    position: 'fixed'
                  },
                ]}
                
              >
                <TouchableOpacity
                  style={[styles.submitButton, layout.justifyCenter]}
                  onPress={handleSubmit}
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
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: "5%",
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

  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    color: "white",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 16,
  },
  inputField: {
    height: 48,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 12,
  },
  errorText: {
    color: "red",
  },
  genderContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  genderOption: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectedGenderOption: {
    backgroundColor: "blue",
  },
  selectedGenderText: {
    color: "white",
  },
  submitButton: {
    height: 32,
    width: 311,
    borderRadius: 9,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#22222D",
    fontWeight: "bold",
  },
  footerContainer: {
    justifyContent: "flex-end",
  },
  previousAndNextBtn: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: "4%",
    backgroundColor: "#22222F",
  },
  selectedOptionText: {
    color: "blue",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheetContent: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderTopWidth: 2,
    borderColor: "#8F8F94",
  },

});
