import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { ImageVariant } from '@/components/atoms';
import LeftArrow from '@/theme/assets/images/leftarrow.png';
import Profile from '@/theme/assets/images/profile.png';
import EditPersonalDetailBottomSheet from '@/components/BottomSheet/Profile/EditPersonalDetailBottomSheet';
import ChangePasswordBottomSheet from '@/components/BottomSheet/Profile/ChangePasswordBottomSheet';
import { useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { getUserDetailsByUserId, uploadPicture } from '../../services/teacherService';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import RNFS from 'react-native-fs';
import { MMKV } from 'react-native-mmkv';
import { notifyMessage } from '../../utils/error-toast-API';

const storage = new MMKV();
const ProfileDetailsScreen = ({ navigation }) => {
  const route = useRoute();
  const { userDetails } = route.params;
  const teacherId = storage.getString('username');
  const { layout, fonts, colors } = useTheme();
  const [profileData, setProfileData] = useState(userDetails);
  const [personalDetailBottomSheetVisible, setPersonalDetailBottomSheetVisible] = useState(false);
  const [changePasswordBottomSheetVisible, setChangePasswordBottomSheetVisible] = useState(false);
  const [selectedImage] = useState();

  const openEditPersonalDetailModal = () => {
    setPersonalDetailBottomSheetVisible(true);
  };
  const closeEditPersonalDetailModal = () => {
    setPersonalDetailBottomSheetVisible(false);
  };

  const openChangePasswordModal = () => {
    setChangePasswordBottomSheetVisible(true);
  };

  const closeChangePasswordModal = () => {
    setChangePasswordBottomSheetVisible(false);
  };

  const maskEmail = (email) => {
    // Split the email address into local and domain parts
    const [localPart, domainPart] = email.split('@');

    // Keep the first and last characters of the local part
    const maskedLocalPart =
      localPart.length > 2
        ? localPart[0] + '*'.repeat(localPart.length - 2) + localPart.slice(-1)
        : localPart;

    // Combine the masked local part and the domain part
    return `${maskedLocalPart}@${domainPart}`;
  };

  const encryptNumber = (phoneNumber) => {
    // Check if the phone number is valid and has more than one digit
    if (phoneNumber && phoneNumber.length > 2) {
      const firstDigit = phoneNumber.charAt(0);
      const encryptedDigits = '*'.repeat(phoneNumber.length - 3);
      const lastTwoDigits = phoneNumber.slice(-2);
      return `${firstDigit}${encryptedDigits}${lastTwoDigits}`;
    }
    return phoneNumber; // Return original number if it's not valid or has only one digit
  };

  const chooseImage = async () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };
    const response = await launchImageLibrary(options);
    if (response && response.assets && response.assets.length > 0) {
      await upload(response.assets[0].uri, response.assets[0].fileName, response.assets[0].type);
    }
  };
  const MAX_UPLOAD_SIZE = 200 * 1024 * 1024;
  const upload = async (imageUri, fileName, imageType) => {
    try {
      const doesExit = await RNFS.exists(imageUri);
      if (doesExit) {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        if (blob.size > MAX_UPLOAD_SIZE) {
          Toast.show({
            type: 'error',
            text1: 'File Size Exceeded',
            text2: 'The selected file exceeds the maximum allowed size of 2 MB',
            position: 'bottom',
          });
          return;
        }
        const formData = new FormData();
        formData.append('file', {
          uri: imageUri,
          name: fileName,
          type: imageType,
        });
        await uploadPicture(formData);
        getUserDetailsByUserId(teacherId)
          .then((res) => {
            setProfileData(res.data);
          })
          .catch(() => {});
      } else {
        Toast.show({
          type: 'error',
          text1: 'File Does not exists',
          position: 'bottom',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Server error',
        position: 'bottom',
      });
    }
  };

  return (
    <SafeScreen>
      <View style={[layout.paddingForFullScreen, { flex: 1 }]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            // navigation.dispatch(DrawerActions.openDrawer());
          }}
        >
          <View style={[layout.rowHCenter, layout.display]}>
            <ImageVariant
              testID="brand-img"
              style={{ width: 7, height: 11 }}
              source={LeftArrow}
              resizeMode="contain"
            />
            <Text style={[fonts.size_16, fonts.bold, { color: colors.backButtonColor, left: 5 }]}>
              Profile Details
            </Text>
          </View>
        </TouchableOpacity>
        <View style={[layout.justifyCenter, layout.itemsCenter, { marginTop: '10%' }]}>
          {profileData?.profileImageUrl ? (
            <Image
              style={[{ width: 42, height: 42, borderRadius: 100 }]}
              source={{ uri: profileData?.profileImageUrl }}
              resizeMode="cover"
            />
          ) : (
            <Image
              style={{ width: 60, height: 60 }}
              source={!selectedImage ? Profile : selectedImage}
            />
          )}
          <TouchableOpacity
            onPress={() => {
              chooseImage().catch(notifyMessage);
            }}
          >
            <Text
              style={[
                fonts.size_12,
                fonts.fontWeight_small,
                { color: colors.termsLinkColor, marginTop: '2%' },
              ]}
            >
              Add Image
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[layout.rowHCenter, layout.justifyBetween, { marginTop: '10%' }]}>
          <Text style={[fonts.size_14, fonts.bold, { color: colors.white, opacity: 0.4 }]}>
            PERSONAL
          </Text>
          <TouchableOpacity onPress={openEditPersonalDetailModal}>
            <Text style={[fonts.size_14, fonts.bold, { color: colors.termsLinkColor }]}>EDIT</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            layout.fullWidth,
            layout.paddingForCard,
            {
              backgroundColor: colors.cardBackgroundColor,
              borderRadius: 14,
              marginTop: '3%',
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
                { borderBottomColor: colors.gray200 },
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
                {profileData?.firstName} {profileData?.middleName} {profileData?.lastName}
              </Text>
            </View>
            <View
              style={[
                layout.rowHCenter,
                layout.justifyBetween,
                styles.dataFeild,
                { borderBottomColor: colors.gray200 },
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
                {moment(profileData?.dob).format('DD/MM/YYYY') === 'Invalid date'
                  ? '-'
                  : moment(profileData?.dob).format('DD/MM/YYYY')}
              </Text>
            </View>
            <View
              style={[
                layout.rowHCenter,
                layout.justifyBetween,
                styles.dataFeild,
                { borderBottomColor: colors.gray200 },
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
                {profileData?.gender}
              </Text>
            </View>

            <View
              style={[
                layout.rowHCenter,
                layout.justifyBetween,
                styles.dataFeild,
                { borderBottomColor: colors.gray200 },
              ]}
            >
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.4, width: '40%' },
                ]}
              >
                Email Address
              </Text>
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.6, width: '60%', textAlign: 'right' },
                ]}
              >
                {profileData?.emailId ? maskEmail(profileData.emailId) : '--'}
              </Text>
            </View>
            <View
              style={[
                layout.rowHCenter,
                layout.justifyBetween,
                {
                  paddingTop: '5%',
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
                {encryptNumber(profileData?.emergencyContactNumber) || '--'}
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
              marginTop: '5%',
            },
          ]}
        >
          <Text
            style={[fonts.size_16, fonts.fontWeight_small, { color: colors.white, opacity: 0.4 }]}
          >
            Phone Number
          </Text>
          <Text
            style={[fonts.size_16, fonts.fontWeight_small, { color: colors.white, opacity: 0.6 }]}
          >
            {profileData?.mobileNumber || '-'}
          </Text>
        </View>
        <TouchableOpacity onPress={openChangePasswordModal}>
          <View style={[layout.rowHCenter, layout.justifyBetween, { marginTop: '5%' }]}>
            <Text style={[fonts.size_14, fonts.bold, { color: colors.termsLinkColor }]}>
              CHANGE PASSWORD
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <EditPersonalDetailBottomSheet
        closeModal={closeEditPersonalDetailModal}
        personalDetailBottomSheetVisible={personalDetailBottomSheetVisible}
        profileData={profileData}
        setProfileData={setProfileData}
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
    paddingVertical: '5%',
  },
});
