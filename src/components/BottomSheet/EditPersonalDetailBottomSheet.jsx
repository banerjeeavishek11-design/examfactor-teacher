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
  Image,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/theme";
import rightArrow from "@/theme/assets/images/rightarrow.png";
import { Formik } from "formik";
import { ImageVariant } from "../atoms";
import Cross from "@/theme/assets/images/cross.png";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";
import Calender from "@/theme/assets/images/calendar.png";
import PrimaryGradient from "../template/LinearGradient/PrimaryGradient";

const EditPersonalDetailBottomSheet = ({
  personalDetailBottomSheetVisible,
  closeModal,
  profileData,
  saveNewData,
}) => {
  const { fonts, colors, layout } = useTheme();
  const [openCalender, setOpenCalender] = useState(false);
  const [selectedDob, setSelectedDob] = useState("");

  const handleOutsideTap = () => {
    Keyboard.dismiss();
  };

  console.log("Recied prof data in child::", profileData);

  console.log("SELECTED DATE::", selectedDob);

  return (
    <Modal
      visible={personalDetailBottomSheetVisible}
      animationType="slide"
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={handleOutsideTap}>
        <View style={[styles.modalContainer,{marginBottom:'8%'}]}>
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
                dob: profileData.dob,
                mobile: profileData.mobile,
                emergencyContact: profileData.emergencyContact,
                address: "",
              }}
              onSubmit={(values, actions) => {
                saveNewData(values);
                console.log("OnSUBMIT values::", values);
                actions.setSubmitting(false);
                closeModal();
              }}
            >
              {({ handleChange, handleSubmit, values, setFieldValue }) => {
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
                          value={profileData.fullName}
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
                        <View
                          style={[
                            layout.row,
                            layout.itemsCenter,
                            layout.justifyBetween,
                            styles.inputField,
                          ]}
                        >
                          <TextInput
                            style={[
                              layout.justifyCenter,
                              fonts.size_16,
                              {
                                color: colors.gray200,
                                textAlign: "left",
                                paddingLeft: "3%",
                                width: "90%",
                              },
                            ]}
                            editable={false}
                            placeholder={profileData.dob}
                            placeholderTextColor={colors.gray400}
                            value={selectedDob}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              setOpenCalender(true);
                            }}
                          >
                            <Image
                              source={Calender}
                              style={{
                                width: 20,
                                height: 20,
                                marginLeft: "5%",
                              }}
                            />
                          </TouchableOpacity>
                          <DateTimePicker
                            mode="date"
                            onConfirm={(date) => {
                              setSelectedDob(moment(date).format("DD-MM-YYYY"));
                              setOpenCalender(false);
                            }}
                            isVisible={openCalender}
                            onCancel={() => {
                              setOpenCalender(false);
                            }}
                          />
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
                          value={profileData.email}
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
                          onChangeText={handleChange("emergencyContact")}
                          value={values.emergencyContact}
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
                      onPress={() => {
                        setFieldValue("dob", selectedDob);
                        handleSubmit();
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
                            Save
                          </Text>
                          <ImageVariant
                            testID="brand-img"
                            style={{ width: 16, height: 9, left: 5 }}
                            source={rightArrow}
                            resizeMode="contain"
                          />
                        </View>
                      </PrimaryGradient>
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
  loginButton: {
    height: 48,
    width: "100%",
    borderRadius: 9,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
