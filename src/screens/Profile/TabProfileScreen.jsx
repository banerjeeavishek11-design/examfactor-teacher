import { Image, Linking, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import { SafeScreen } from '@/components/template';
import { ImageVariant } from '@/components/atoms';
import LeftArrow from '@/theme/assets/images/leftarrow.png';
import { useSelector } from 'react-redux';
import Arrow from '@/theme/assets/images/arrow.png';
import Rateus from '@/theme/assets/images/rateus.png';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import moment from 'moment';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import User from '@/theme/assets/images/user.png';
import Teacher from '@/theme/assets/images/teacher.png';
import ClassTeacher from '@/theme/assets/images/classteacher.png';
import { Divider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import ChangeRoleBottomSheet from '@/components/BottomSheet/Profile/ChangeRoleBottomSheet';
import RateUsBottomSheet from '@/components/BottomSheet/Profile/RateUsBottomSheet';
import EditPersonalDetailBottomSheet from '@/components/BottomSheet/Profile/EditPersonalDetailBottomSheet';
import ChangePasswordBottomSheet from '@/components/BottomSheet/Profile/ChangePasswordBottomSheet';
import { MMKV } from 'react-native-mmkv';
import { useFocusEffect } from '@react-navigation/native';
import appVersion from '../../../package.json';
import { getUserDetailsByUserId, uploadPicture } from '../../services/teacherService';
import { notifyMessage } from '../../utils/error-toast-API';

const TabProfileScreen = (props) => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const storage = new MMKV();
  const userName = storage.getString('username');
  //   const [profileData, setProfileData] = useState(userDetails);
  const [changeRoleBottomSheetVisible, setChangeRoleBottomSheetVisible] = useState(false);
  const [rateUsModalVisible, setRateUsModalVisible] = useState(false);
  const [userRole, setUserRole] = useState('TEACHER');
  const [personalDetailBottomSheetVisible, setPersonalDetailBottomSheetVisible] = useState(false);
  const [changePasswordBottomSheetVisible, setChangePasswordBottomSheetVisible] = useState(false);
  const [userDetails, setUserDetails] = useState();

  const initialUserRole = useSelector((state) => state.login.userRole);

  useEffect(() => {
    setUserRole(initialUserRole);
  }, [initialUserRole]);

  useFocusEffect(
    React.useCallback(() => {
      getTeacheDetails();
    }, [])
  );

  const openTermsAndCondition = () => {
    Linking.openURL('https://www.examfactor.com/terms-and-conditions/')
      .then(() => {})
      .catch(() => {});
  };

  const openPrivacyPolicy = () => {
    Linking.openURL('https://www.examfactor.com/privacy-policy/')
      .then(() => {})
      .catch(() => {});
  };

  const openRateUsModal = () => {
    setRateUsModalVisible(true);
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

  const logOut = () => {
    storage.clearAll();
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  const getTeacheDetails = () => {
    getUserDetailsByUserId(userName)
      .then((res) => {
        setUserDetails(res.data);
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('Something Went Wrong fetching teacher details', error);
        }
      });
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
        getUserDetailsByUserId(userName)
          .then((res) => {
            userDetails(res.data);
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={[layout.rowHCenter, layout.display]}>
            <ImageVariant
              testID="brand-img"
              style={{ width: 7, height: 11 }}
              source={LeftArrow}
              resizeMode="contain"
            />
            <Text style={[fonts.size_16, fonts.bold, { color: colors.backButtonColor, left: 5 }]}>
              Profile
            </Text>
          </View>
        </TouchableOpacity>
        <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
          <View style={[layout.justifyEnd, layout.fullHeight, { gap: 120 }]}>
            <View>
              <View
                style={[
                  layout.fullWidth,
                  layout.paddingForCard,
                  {
                    backgroundColor: colors.cardBackgroundColor,
                    height: 'auto',
                    borderRadius: 14,
                    top: 15,
                  },
                ]}
              >
                <View style={[layout.display, layout.rowHCenter]}>
                  <View style={[layout.itemsCenter, { gap: 5 }]}>
                    {userDetails?.profileImageUrl ? (
                      <Image
                        style={[{ width: 80, height: 80, borderRadius: 100 }]}
                        source={{ uri: userDetails?.profileImageUrl }}
                        resizeMode="cover"
                      />
                    ) : (
                      <View
                        style={[
                          layout.justifyCenter,
                          layout.itemsCenter,
                          {
                            height: 75,
                            width: 75,
                            borderRadius: 100,
                            opacity: 0.5,
                            backgroundColor: colors.white,
                          },
                        ]}
                      >
                        <ImageVariant
                          testID="brand-img"
                          style={{
                            width: 23,
                            height: 23,
                            tintColor: colors.white,
                          }}
                          source={User}
                          resizeMode="contain"
                        />
                      </View>
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
                  <View
                    style={[
                      layout.display,
                      layout.rowHCenter,
                      layout.justifyBetween,
                      layout.flex_1,
                    ]}
                  >
                    <View style={{ marginLeft: '3%', width: '70%' }}>
                      <Text style={[fonts.size_20, fonts.bold, { color: colors.white }]}>
                        {userDetails?.firstName || ''} {userDetails?.middleName || ''}{' '}
                        {userDetails?.lastName || ''}
                      </Text>

                      <Text
                        numberOfLines={1}
                        style={[
                          fonts.size_18,
                          fonts.fontWeight_small,
                          { color: colors.backButtonColor },
                        ]}
                      >
                        {/* {isPhoneNumber(studentId) ? "+91" : ""} {studentId} */}
                        {userDetails?.emailId || userName}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={[layout.itemsCenter]}>
                  <Divider
                    style={{
                      marginTop: '2%',
                      width: '100%',
                      backgroundColor: colors.lineBackgroundColor,
                    }}
                  />
                </View>
                <View
                  style={[
                    layout.display,
                    layout.rowHCenter,
                    // layout.justifyBetween,
                    { marginTop: '2%', gap: 10 },
                  ]}
                >
                  <View
                    style={[
                      layout.display,
                      layout.rowHCenter,
                      layout.justifyBetween,
                      {
                        width: userRole === 'TEACHER' ? '13%' : '17%',
                        height: 35,
                        backgroundColor: 'green',
                        borderRadius: 4,
                        paddingHorizontal: '2%',
                      },
                    ]}
                  >
                    <View style={{ width: '5%' }}>
                      {userRole === 'TEACHER' ? (
                        <Image
                          style={{ width: 20, height: 25 }}
                          source={Teacher}
                          resizeMode="contain"
                        />
                      ) : (
                        <Image
                          style={{ width: 20, height: 25 }}
                          source={ClassTeacher}
                          resizeMode="contain"
                        />
                      )}
                    </View>
                    <View>
                      {userRole === 'TEACHER' ? (
                        <Text
                          style={[fonts.size_14, fonts.fontWeight_small, { color: colors.white }]}
                        >
                          {userRole}
                        </Text>
                      ) : (
                        <Text
                          style={[fonts.size_13, fonts.fontWeight_small, { color: colors.white }]}
                        >
                          CLASS TEACHER
                        </Text>
                      )}
                    </View>
                  </View>
                  {userDetails?.teacherRole === 'TEACHER' ? null : (
                    <TouchableOpacity onPress={() => setChangeRoleBottomSheetVisible(true)}>
                      <Text
                        style={[
                          fonts.size_12,
                          fonts.fontWeignt_600,
                          {
                            color: colors.termsLinkColor,
                            textDecorationLine: 'underline',
                          },
                        ]}
                      >
                        Change Role
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View
                  style={[
                    layout.rowHCenter,
                    layout.justifyBetween,
                    { marginTop: '2.5%', width: '99%' },
                  ]}
                >
                  <Text style={[fonts.size_16, fonts.bold, { color: colors.white, opacity: 0.4 }]}>
                    PERSONAL
                  </Text>
                  <TouchableOpacity onPress={openEditPersonalDetailModal}>
                    <Text style={[fonts.size_16, fonts.bold, { color: colors.termsLinkColor }]}>
                      EDIT DETAILS
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    layout.fullWidth,
                    layout.paddingForCard,
                    {
                      backgroundColor: '#2C2C39',
                      borderRadius: 14,
                      marginTop: '1%',
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
                        {userDetails?.firstName} {userDetails?.middleName} {userDetails?.lastName}
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
                          ? '-'
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
                        {userDetails?.emailId ? maskEmail(userDetails.emailId) : '--'}
                      </Text>
                    </View>
                    <View
                      style={[
                        layout.rowHCenter,
                        layout.justifyBetween,
                        {
                          paddingTop: '2%',
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
                        {encryptNumber(userDetails?.emergencyContactNumber) || '--'}
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
                      backgroundColor: '#2C2C39',
                      borderRadius: 14,
                      marginTop: '3%',
                      paddingVertical: '2%',
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
                    {userDetails?.mobileNumber || '-'}
                  </Text>
                </View>
                <TouchableOpacity onPress={openChangePasswordModal}>
                  <View style={[layout.rowHCenter, layout.justifyBetween, { marginTop: '2%' }]}>
                    <Text style={[fonts.size_14, fonts.bold, { color: colors.termsLinkColor }]}>
                      CHANGE PASSWORD
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[
                  layout.fullWidth,
                  layout.paddingForCard,
                  layout.rowHCenter,
                  layout.justifyBetween,
                  {
                    backgroundColor: colors.cardBackgroundColor,
                    borderRadius: 14,
                    marginTop: '3%',
                    paddingVertical: '2%',
                  },
                ]}
                //   onPress={() => navigation.navigate("SupportScreen")}
                onPress={openRateUsModal}
              >
                <View style={[layout.rowHCenter, layout.display]}>
                  <ImageVariant
                    testID="brand-img"
                    style={{ width: 26, height: 26 }}
                    source={Rateus}
                    resizeMode="contain"
                  />
                  <View
                    style={[
                      layout.display,
                      layout.rowHCenter,
                      layout.justifyBetween,
                      layout.flex_1,
                    ]}
                  >
                    <View style={{ marginLeft: '6%' }}>
                      <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
                        Rate us
                      </Text>
                      <Text
                        style={[
                          fonts.size_12,
                          fonts.fontWeight_small,
                          { color: colors.backButtonColor },
                        ]}
                      >
                        Help us with your feedback
                      </Text>
                    </View>
                    <ImageVariant
                      testID="brand-img"
                      style={{ width: 15, height: 13 }}
                      source={Arrow}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={[
                  layout.fullWidth,
                  layout.paddingForCard,
                  {
                    backgroundColor: colors.cardBackgroundColor,
                    borderRadius: 14,
                    height: 72,
                    marginTop: '3%',
                  },
                ]}
                onPress={() => navigation.navigate('SupportScreen')}
              >
                <View style={[layout.rowHCenter, layout.display]}>
                  <ImageVariant
                    testID="brand-img"
                    style={{ width: 26, height: 26 }}
                    source={Support}
                    resizeMode="contain"
                  />
                  <View
                    style={[
                      layout.display,
                      layout.rowHCenter,
                      layout.justifyBetween,
                      layout.flex_1,
                    ]}
                  >
                    <View style={{ marginLeft: '6%' }}>
                      <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
                        Support
                      </Text>
                      <Text
                        style={[
                          fonts.size_12,
                          fonts.fontWeight_small,
                          { color: colors.backButtonColor },
                        ]}
                      >
                        FAQs and contact us
                      </Text>
                    </View>
                    <ImageVariant
                      testID="brand-img"
                      style={{ width: 15, height: 13 }}
                      source={Arrow}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity> */}
              {/* <TouchableOpacity
                style={[
                  layout.fullWidth,
                  layout.paddingForCard,
                  {
                    backgroundColor: colors.cardBackgroundColor,
                    borderRadius: 14,
                    height: 72,
                    marginTop: '3%',
                  },
                ]}
                onPress={() => navigation.navigate('AppGuideScreen')}
              >
                <View style={[layout.rowHCenter, layout.display]}>
                  <ImageVariant
                    testID="brand-img"
                    style={{ width: 26, height: 26 }}
                    source={AppGuide}
                    resizeMode="contain"
                  />
                  <View
                    style={[
                      layout.display,
                      layout.rowHCenter,
                      layout.justifyBetween,
                      layout.flex_1,
                    ]}
                  >
                    <View style={{ marginLeft: '6%' }}>
                      <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
                        App guide
                      </Text>
                      <Text
                        style={[
                          fonts.size_12,
                          fonts.fontWeight_small,
                          { color: colors.backButtonColor },
                        ]}
                      >
                        Your guide through the app
                      </Text>
                    </View>
                    <ImageVariant
                      testID="brand-img"
                      style={{ width: 15, height: 13 }}
                      source={Arrow}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </TouchableOpacity> */}
            </View>

            <View style={{ marginTop: '-5%' }}>
              <TouchableOpacity style={{ marginVertical: 40 }} onPress={() => logOut()}>
                <Text
                  style={[
                    fonts.size_14,
                    fonts.bold,
                    fonts.alignCenter,
                    { color: colors.termsLinkColor },
                  ]}
                >
                  LOGOUT
                </Text>
              </TouchableOpacity>

              <View style={[layout.rowHCenter, layout.justifyCenter]}>
                <TouchableOpacity
                  onPress={openTermsAndCondition}
                  style={[layout.rowHCenter, layout.justifyCenter]}
                >
                  <Text
                    style={[
                      fonts.size_12,
                      fonts.fontWeight_small,
                      fonts.alignCenter,
                      {
                        color: colors.termsLinkColor,
                        marginRight: '4%',
                      },
                    ]}
                  >
                    Terms of use
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={openPrivacyPolicy}
                  style={[layout.rowHCenter, layout.justifyCenter]}
                >
                  <Text
                    style={[
                      fonts.size_12,
                      fonts.fontWeight_small,
                      fonts.alignCenter,
                      {
                        color: colors.termsLinkColor,
                        marginLeft: '4%',
                      },
                    ]}
                  >
                    Privacy policy
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={[
                  fonts.size_12,
                  fonts.fontWeight_small,
                  fonts.alignCenter,
                  {
                    color: colors.backButtonColor,
                    marginTop: '2%',
                  },
                ]}
              >
                APP VERSION {appVersion.version}
              </Text>
            </View>
          </View>
          <ChangeRoleBottomSheet
            changeRoleBottomSheetVisible={changeRoleBottomSheetVisible}
            setChangeRoleBottomSheetVisible={setChangeRoleBottomSheetVisible}
            setUserRole={setUserRole}
          />
          <RateUsBottomSheet
            setRateUsModalVisible={setRateUsModalVisible}
            visible={rateUsModalVisible}
          />
          <EditPersonalDetailBottomSheet
            closeModal={closeEditPersonalDetailModal}
            personalDetailBottomSheetVisible={personalDetailBottomSheetVisible}
            profileData={userDetails}
            setProfileData={setUserDetails}
          />
          <ChangePasswordBottomSheet
            visible={changePasswordBottomSheetVisible}
            closeModal={closeChangePasswordModal}
          />
        </DrawerContentScrollView>
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  dataFeild: {
    borderBottomWidth: 0.4,
    paddingVertical: '2%',
  },
});

export default TabProfileScreen;
