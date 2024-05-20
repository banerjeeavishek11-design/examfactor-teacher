import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import { SafeScreen } from '@/components/template';
import { ImageVariant } from '@/components/atoms';
import LeftArrow from '@/theme/assets/images/leftarrow.png';
import { useSelector } from 'react-redux';
import Arrow from '@/theme/assets/images/arrow.png';
import Rateus from '@/theme/assets/images/rateus.png';
import Support from '@/theme/assets/images/support.png';
import AppGuide from '@/theme/assets/images/appguide.png';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import User from '@/theme/assets/images/user.png';
import Teacher from '@/theme/assets/images/teacher.png';
import ClassTeacher from '@/theme/assets/images/classteacher.png';
import { Divider } from 'react-native-paper';
import ChangeRoleBottomSheet from '@/components/BottomSheet/Profile/ChangeRoleBottomSheet';
import RateUsBottomSheet from '@/components/BottomSheet/Profile/RateUsBottomSheet';
import { MMKV } from 'react-native-mmkv';
import { useFocusEffect } from '@react-navigation/native';
import appVersion from '../../../package.json';
import { getUserDetailsByUserId } from '../../services/teacherService';
import { notifyMessage } from '../../utils/error-toast-API';
// import { logOutService } from '../../services/authService';

const SideBarAuthedScreen = (props) => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const storage = new MMKV();
  const userName = storage.getString('username');
  const [changeRoleBottomSheetVisible, setChangeRoleBottomSheetVisible] = useState(false);
  const [rateUsModalVisible, setRateUsModalVisible] = useState(false);
  const [userRole, setUserRole] = useState('TEACHER');
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
                  {
                    backgroundColor: colors.cardBackgroundColor,
                    height: 122,
                    borderRadius: 14,
                    top: 15,
                  },
                ]}
              >
                <TouchableOpacity
                  style={[
                    layout.fullWidth,
                    layout.paddingForCard,
                    {
                      backgroundColor: colors.cardBackgroundColor,
                      borderRadius: 14,
                      height: 75,
                    },
                  ]}
                  onPress={() =>
                    navigation.navigate('ProfileDetailsScreen', {
                      userDetails: userDetails,
                    })
                  }
                >
                  <View style={[layout.display, layout.rowHCenter]}>
                    {userDetails?.profileImageUrl ? (
                      <Image
                        style={[{ width: 42, height: 42, borderRadius: 100 }]}
                        source={{ uri: userDetails?.profileImageUrl }}
                        resizeMode="cover"
                      />
                    ) : (
                      <View
                        style={[
                          layout.justifyCenter,
                          layout.itemsCenter,
                          {
                            height: 42,
                            width: 42,
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

                    <View
                      style={[
                        layout.display,
                        layout.rowHCenter,
                        layout.justifyBetween,
                        layout.flex_1,
                      ]}
                    >
                      <View style={{ marginLeft: '6%', width: '70%' }}>
                        <Text style={[fonts.size_14, fonts.bold, { color: colors.white }]}>
                          {userDetails?.firstName || ''} {userDetails?.middleName || ''}{' '}
                          {userDetails?.lastName || ''}
                        </Text>

                        <Text
                          numberOfLines={1}
                          style={[
                            fonts.size_14,
                            fonts.fontWeight_small,
                            { color: colors.backButtonColor },
                          ]}
                        >
                          {/* {isPhoneNumber(studentId) ? "+91" : ""} {studentId} */}
                          {userDetails?.emailId || userName}
                        </Text>
                      </View>
                      <ImageVariant
                        testID="brand-img"
                        style={{ width: 7, height: 11 }}
                        source={Arrow}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={[layout.itemsCenter, { paddingHorizontal: '4%' }]}>
                  <Divider
                    style={{
                      marginTop: '0%',
                      width: '100%',
                      backgroundColor: colors.lineBackgroundColor,
                    }}
                  />
                </View>

                <View
                  style={[
                    layout.display,
                    layout.rowHCenter,
                    layout.justifyBetween,
                    { marginTop: '2%', paddingHorizontal: '4%' },
                  ]}
                >
                  <View
                    style={[
                      layout.display,
                      layout.rowHCenter,
                      layout.justifyBetween,
                      {
                        width: userRole === 'TEACHER' ? '35%' : '50%',
                        height: 35,
                        backgroundColor: 'green',
                        borderRadius: 4,
                        paddingHorizontal: '4%',
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
              </View>
              <Text
                style={[
                  fonts.size_14,
                  fonts.bold,
                  { color: colors.white, opacity: 0.4, marginTop: '10%' },
                ]}
              >
                HELP & SUPPORT
              </Text>
              <TouchableOpacity
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
              <TouchableOpacity
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
              </TouchableOpacity>
              <TouchableOpacity
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
              </TouchableOpacity>
            </View>

            <View>
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
        </DrawerContentScrollView>
      </View>
    </SafeScreen>
  );
};

export default SideBarAuthedScreen;
