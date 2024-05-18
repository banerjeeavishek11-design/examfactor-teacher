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
import { uploadPicture } from '../../services/teacherService';
import moment from 'moment';

const ProfileDetailsScreen = ({ navigation }) => {
  const route = useRoute();
  const { userDetails } = route.params;
  const [profileData, setProfileData] = useState(userDetails);
  const [personalDetailBottomSheetVisible, setPersonalDetailBottomSheetVisible] = useState(false);
  const [changePasswordBottomSheetVisible, setChangePasswordBottomSheetVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

  // const saveNewData = (newData) => {
  //   setProfileData((prevData) => ({
  //     ...prevData,
  //     ...newData,
  //   }));
  // };

  const chooseImage = () => {
    let options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchImageLibrary(options)
      .then((response) => {
        console.log(response);
        setSelectedImage(response.assets[0].uri);
        uploadPicture(response.assets[0].uri)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            err;
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
  const { layout, fonts, colors } = useTheme();
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
          {userDetails?.profileImageUrl ? (
            <Image
              style={[{ width: 42, height: 42, borderRadius: 100 }]}
              source={{ uri: userDetails?.profileImageUrl }}
              resizeMode="cover"
            />
          ) : (
            <Image
              style={{ width: 60, height: 60 }}
              source={!selectedImage ? Profile : selectedImage}
            />
          )}
          <TouchableOpacity onPress={chooseImage}>
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
                {userDetails?.firstName} {userDetails?.lastName}
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
                {moment(userDetails?.dob).format('DD/MM/YYYY') === 'Invalid date'
                  ? '-  '
                  : moment(userDetails?.dob).format('DD/MM/YYYY')}
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
                {userDetails?.gender}
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
                Email Address
              </Text>
              <Text
                style={[
                  fonts.size_16,
                  fonts.fontWeight_small,
                  { color: colors.white, opacity: 0.6 },
                ]}
              >
                {userDetails?.emailId.length < 25
                  ? userDetails?.emailId
                  : userDetails?.emailId.substring(0, 25) + '...'}
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
                {userDetails?.emergencyContactNumber || '-  '}
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
            {userDetails?.mobileNumber || '-  '}
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
        userDetails={userDetails}
        closeModal={closeEditPersonalDetailModal}
        personalDetailBottomSheetVisible={personalDetailBottomSheetVisible}
        profileData={profileData}
        setProfileData={setProfileData}
        // saveNewData={saveNewData}
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
