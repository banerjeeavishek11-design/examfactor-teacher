import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { ImageVariant } from "@/components/atoms";
import LeftArrow from "@/theme/assets/images/leftarrow.png";
import Profile from "@/theme/assets/images/profile.png";
import EditPersonalDetailBottomSheet from "@/components/BottomSheet/EditPersonalDetailBottomSheet";

const ProfileData = [
  { key: "Full Name", value: "Vinay Dua" },
  { key: "DOB", value: "18" },
  { key: "City", value: "New Delhi" },
  { key: "Email Address", value: "vin****a@gmail.com" },
  { key: "Emergency Phone Number", value: "9*****32412" },
];

const ProfileDetailsScreen = ({navigation}) => {

  const [personalDetailBottomSheetVisible, setPersonalDetailBottomSheetVisible ] = useState(false)

  const openEditPersonalDetailModal = ()=>{
    setPersonalDetailBottomSheetVisible(true)
  }
  const closeEditPersonalDetailModal = ()=>{
    setPersonalDetailBottomSheetVisible(false)
  }

  const { layout, fonts, colors } = useTheme();
  return (
    <SafeScreen>
      <View style={[layout.paddingForFullScreen, { flex: 1 }]}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
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
          style={[layout.justifyCenter, layout.itemsCenter, { marginTop: '10%' }]}
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
              paddingTop: 0
            },
          ]}
        >
          {ProfileData.map((item, index) => (
            <View
              key={item}
              style={[
                layout.rowHCenter,
                layout.justifyBetween,
                index + 1 != ProfileData.length
                  ? {
                      borderBottomWidth: 0.5,
                      borderBottomColor: colors.gray200,
                      paddingVertical: "5%",
                    }
                  : {paddingTop: '5%'},
              ]}
            >
              <Text
                style={[fonts.size_16,fonts.fontWeight_small, { color: colors.white, opacity: 0.4 }]}
              >
                {item.key}
              </Text>
              <Text
                style={[fonts.size_16,fonts.fontWeight_small, { color: colors.white, opacity: 0.6 }]}
              >
                {item.value}
              </Text>
            </View>
          ))}
        </View>
        <View style={[
            layout.fullWidth,
            layout.paddingForCard,
            layout.rowHCenter,
            layout.justifyBetween,
            {
              backgroundColor: colors.cardBackgroundColor,
              borderRadius: 14,
              height: 72,
              marginTop: "5%",
            },
          ]}>
            <Text
                style={[fonts.size_16,fonts.fontWeight_small, { color: colors.white, opacity: 0.4 }]}
              >
                Phone Number
              </Text>
              <Text
                style={[fonts.size_16,fonts.fontWeight_small, { color: colors.white, opacity: 0.6 }]}
              >
                9876543210
              </Text>
          </View>
          <TouchableOpacity>
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
      <EditPersonalDetailBottomSheet closeModal={closeEditPersonalDetailModal} personalDetailBottomSheetVisible={personalDetailBottomSheetVisible} />
    </SafeScreen>
  );
};

export default ProfileDetailsScreen;

const styles = StyleSheet.create({});
