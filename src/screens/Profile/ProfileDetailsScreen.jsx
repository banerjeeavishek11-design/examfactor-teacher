import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { ImageVariant } from "@/components/atoms";
import LeftArrow from "@/theme/assets/images/leftarrow.png";
import Profile from "@/theme/assets/images/profile.png";
import EditPersonalDetailBottomSheet from "@/components/BottomSheet/Profile/EditPersonalDetailBottomSheet";
import ChangePasswordBottomSheet from "@/components/BottomSheet/Profile/ChangePasswordBottomSheet";
import { DrawerActions } from "@react-navigation/native";

const ProfileData = {
  fullName: "Vinay Dua",
  dob: "18",
  email: "vin****a@gmail.com",
  gender: "Male",
  city: "New Delhi",
  mobile: "9988776655",
  emergencyContact: "9*****32412",
  address: "axyz, Abc Street, new delhi, pin -700001 ",
};

const ProfileDetailsScreen = ({ navigation }) => {
  const [profileData, setProfileData] = useState(ProfileData);
  const [
    personalDetailBottomSheetVisible,
    setPersonalDetailBottomSheetVisible,
  ] = useState(false);
  const [changePasswordBottomSheetVisible,
    setChangePasswordBottomSheetVisible] = useState(false)
    
  const saveNewData = (newData)=>{
    setProfileData(prevData => ({
      ...prevData,
      ...newData
    }))
   }

  const openEditPersonalDetailModal = () => {
    setPersonalDetailBottomSheetVisible(true);
  };
  const closeEditPersonalDetailModal = () => {
    setPersonalDetailBottomSheetVisible(false);
  };

  const openChangePasswordModal = ()=>{
    setChangePasswordBottomSheetVisible(true)
  }

  const closeChangePasswordModal = ()=>{
    setChangePasswordBottomSheetVisible(false)
  }
  const { layout, fonts, colors } = useTheme();
  return (
    <SafeScreen>
      <View style={[layout.paddingForFullScreen, { flex: 1 }]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            navigation.dispatch(DrawerActions.openDrawer());
          }}
        >
          <View style={[layout.rowHCenter, layout.display]}>
            <ImageVariant
              testID="brand-img"
              style={{ width: 7, height: 11 }}
              source={LeftArrow}
              resizeMode="contain"
            />
            <Text
              style={[
                fonts.size_16,
                fonts.bold,
                { color: colors.backButtonColor, left: 5 },
              ]}
            >
              Profile Details
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            { marginTop: "10%" },
          ]}
        >
          <Image source={Profile} />
          <TouchableOpacity>
            <Text
              style={[
                fonts.size_12,
                { color: colors.termsLinkColor, marginTop: "2%" },
              ]}
            >
              Add Image
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            layout.rowHCenter,
            layout.justifyBetween,
            { marginTop: "10%" },
          ]}
        >
          <Text
            style={[
              fonts.size_14,
              fonts.bold,
              { color: colors.white, opacity: 0.4 },
            ]}
          >
            PERSONAL
          </Text>
          <TouchableOpacity onPress={openEditPersonalDetailModal}>
            <Text
              style={[
                fonts.size_14,
                fonts.bold,
                { color: colors.termsLinkColor },
              ]}
            >
              EDIT
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            layout.fullWidth,
            layout.paddingForCard,
            {
              backgroundColor: colors.cardBackgroundColor,
              borderRadius: 14,
              marginTop: "3%",
              paddingTop: 0,
            },
          ]}
        >
          <View>
            <View
              style={[
                layout.rowHCenter,
                layout.justifyBetween,
                styles.dataFeild,
                {borderBottomColor: colors.gray200}
              ]}
            >
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.4 },
                ]}
              >
                Full Name
              </Text>
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.6 },
                ]}
              >
                {profileData.fullName}
              </Text>
            </View>
            <View
              style={[
                layout.rowHCenter,
                layout.justifyBetween,
                styles.dataFeild,
                {borderBottomColor: colors.gray200}
              ]}
            >
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.4 },
                ]}
              >
                DOB
              </Text>
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.6 },
                ]}
              >
                {profileData.dob}
              </Text>
            </View>
            <View
              style={[
                layout.rowHCenter,
                layout.justifyBetween,
                styles.dataFeild,
                {borderBottomColor: colors.gray200}
              ]}
            >
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.4 },
                ]}
              >
                Gender
              </Text>
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.6 },
                ]}
              >
                {profileData.gender}
              </Text>
            </View>
            <View
              style={[
                layout.rowHCenter,
                layout.justifyBetween,
                styles.dataFeild,
                {borderBottomColor: colors.gray200}
              ]}
            >
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.4 },
                ]}
              >
                City
              </Text>
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.6 },
                ]}
              >
                {profileData.city}
              </Text>
            </View>
            <View
              style={[
                layout.rowHCenter,
                layout.justifyBetween,
                styles.dataFeild,
                {borderBottomColor: colors.gray200}
              ]}
            >
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.4 },
                ]}
              >
                Email Address
              </Text>
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.6 },
                ]}
              >
                {profileData.email}
              </Text>
            </View>
            <View
              style={[
                layout.rowHCenter,
                layout.justifyBetween,
                {
                  paddingTop: "5%",
                },
              ]}
            >
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.4 },
                ]}
              >
                Emergency Contact Number
              </Text>
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.6 },
                ]}
              >
                {profileData.emergencyContact}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            layout.fullWidth,
            layout.paddingForCard,
            layout.rowHCenter,
            layout.justifyBetween,
            {
              backgroundColor: colors.cardBackgroundColor,
              borderRadius: 14,
              height: 60,
              marginTop: "5%",
            },
          ]}
        >
          <Text
            style={[
              fonts.size_16,
              fonts.fontWeight_small,
              { color: colors.white, opacity: 0.4 },
            ]}
          >
            Phone Number
          </Text>
          <Text
            style={[
              fonts.size_16,
              fonts.fontWeight_small,
              { color: colors.white, opacity: 0.6 },
            ]}
          >
            {profileData.mobile}
          </Text>
        </View>
        <TouchableOpacity onPress={openChangePasswordModal}>
          <View
            style={[
              layout.rowHCenter,
              layout.justifyBetween,
              { marginTop: "5%" },
            ]}
          >
            <Text
              style={[
                fonts.size_14,
                fonts.bold,
                { color: colors.termsLinkColor },
              ]}
            >
              CHANGE PASSWORD
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <EditPersonalDetailBottomSheet
        closeModal={closeEditPersonalDetailModal}
        personalDetailBottomSheetVisible={personalDetailBottomSheetVisible}
        profileData = {profileData}
        saveNewData={saveNewData}
      />
      <ChangePasswordBottomSheet
      visible={changePasswordBottomSheetVisible}
      closeModal={closeChangePasswordModal}
      />
    </SafeScreen>
  );
};

export default ProfileDetailsScreen;

const styles = StyleSheet.create({
  dataFeild: {
    borderBottomWidth: 0.5,
    paddingVertical: "5%",
  },
});
