/* eslint-disable indent */
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform,
  ActivityIndicator,
  Image,
  Linking,
} from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@/theme';
import Logo from '@/theme/assets/images/examfactorlogo.png';
import rightArrow from '@/theme/assets/images/rightarrow.png';
import { ImageVariant } from '@/components/atoms';
import { Controller, useForm } from 'react-hook-form';
import { useRoute, useNavigation } from '@react-navigation/native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import PrimaryGradient from '@/components/template/LinearGradient/PrimaryGradient';
import { MMKV } from 'react-native-mmkv';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { loginAction } from '@/store/redux-slice/LoginSlice';
import { showSelectedClasses } from '../../store/redux-slice/TeacherClassSlice';
import { loginByUsername } from '../../services/authService';
// import Base64 from 'react-native-base64';
import hidePasswordIcon from '../../theme/assets/images/hidePassword.png';
import showPasswordIcon from '../../theme/assets/images/showPassword.png';
import { jwtDecode } from 'jwt-decode';
import { getTeacherDetailsById } from '../../services/teacherService';
import SetNewPasswordBottomSheet from '../../components/BottomSheet/Login/SetNewPasswordBottomSheet';
import { notifyMessage } from '../../utils/error-toast-API';

const storage = new MMKV();
const LoginScreen = () => {
  const { colors, layout, fonts, backgrounds } = useTheme();
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);
  const navigation = useNavigation();
  const route = useRoute();
  const sessionExpire = route.params?.sessionExpire || null;
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();
  const [textInputValues, setTextInputValues] = useState({
    userName: '',
    password: '',
    referralCode: '',
    mobileNumber: '',
  });
  const [opensetNewPasswordBottomSheet, setOpensetNewPasswordBottomSheet] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showInvalidPassword, setShowInvalidPassword] = useState(false);

  const handleOutsideTap = () => {
    Keyboard.dismiss();
  };
  const handleUsernameLogin = (data) => {
    storage.set('oldPassword', data.password);
    setIsLoading(true);
    data['mode'] = 'USERNAME_PASSWORD';
    loginByUsername(data)
      .then((res) => {
        storage.set('username', data.userName);
        storage.set('access_token', res.data.access_token);
        storage.set('refresh_token', res.data.refresh_token);
        if (res.data?.temporary) {
          setOpensetNewPasswordBottomSheet(true);
          setShowInvalidPassword(false);
        } else {
          const decodedPayload = jwtDecode(res.data.access_token);
          getTeacheDetails(decodedPayload.preferred_username);
          setShowInvalidPassword(false);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR_BAD_REQUEST') {
          setShowInvalidPassword(true);
          setIsLoading(false);
        }
      });
  };
  const getTeacheDetails = (userName) => {
    // const accessToken = storage.getString('access_token');
    getTeacherDetailsById(userName)
      .then((res) => {
        storage.set('teacherDetails', JSON.stringify(res.data));
        dispatch(showSelectedClasses(res.data));
        navigation.reset({
          index: 0,
          routes: [{ name: 'AuthorizedStack' }],
        });
      })
      .catch((error) => {
        if (error?.response?.status === 400 || error.code === 'ERR-10') {
          notifyMessage('Something Went Wrong', error);
        }
      });
  };

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

  return (
    <View style={[backgrounds.screenBackgroundColor]}>
      <View
        style={[
          backgrounds.screenBackgroundColor,
          layout.paddingForFullScreen,
          isTablet
            ? {
                // eslint-disable-next-line prettier/prettier
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'flex-start',
                width: moderateScale(300),
              }
            : null,
        ]}
      >
        <TouchableWithoutFeedback onPress={handleOutsideTap}>
          <View style={[layout.justifyEnd, layout.fullHeight, { gap: 100 }]}>
            <View>
              <ImageVariant
                testID="brand-img"
                style={{
                  width: moderateScale(110),
                  height: moderateVerticalScale(112),
                }}
                source={Logo}
                resizeMode="contain"
              />
              <View style={{ width: '80%' }}>
                <Text style={[fonts.size_32, fonts.bold, styles.heading, { color: colors.white }]}>
                  ExamFactor
                </Text>
                {sessionExpire && (
                  <Text style={[fonts.fontWeight_small, fonts.size_12, { color: 'orange' }]}>
                    {sessionExpire}
                  </Text>
                )}
                <Text
                  style={[
                    fonts.size_16,
                    fonts.fontWeight_small,
                    { color: colors.subHeading, marginTop: isTablet ? moderateScale(5) : '2%' },
                  ]}
                >
                  Login with Username & Password
                </Text>
              </View>
              <View style={isTablet ? { marginTop: moderateScale(-5) } : null}>
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  enabled={true}
                >
                  <View style={{ marginTop: '3%' }}>
                    <Controller
                      name="userName"
                      control={control}
                      rules={{
                        required: 'This field is required',
                      }}
                      render={({ field: { onChange, onBlur } }) => (
                        <View
                          style={[
                            layout.display,
                            layout.row,
                            layout.itemsCenter,
                            styles.mobileNumberInput,
                            {
                              paddingHorizontal: 10,
                              borderColor: errors.userName ? '#FF575F' : 'rgba(255, 255, 255, 0.3)',
                            },
                          ]}
                        >
                          <TextInput
                            style={[
                              layout.fullWidth,
                              layout.justifyCenter,
                              fonts.size_16,
                              fonts.fontWeight_small,
                              {
                                color: colors.white,
                                textAlign: 'left',
                                paddingLeft: '0%',
                              },
                            ]}
                            placeholder="Username"
                            placeholderTextColor="#94939B"
                            onBlur={onBlur}
                            onChangeText={(value) => {
                              onChange(value);
                              setShowInvalidPassword(false);
                              setTextInputValues((prevState) => ({
                                ...prevState,
                                userName: value,
                              }));
                            }}
                            value={textInputValues.userName}
                          />
                        </View>
                      )}
                    />
                    {errors.userName && (
                      <Text
                        style={{
                          color: '#FF575F',
                        }}
                      >
                        {errors.userName.message || null}
                      </Text>
                    )}

                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: 'this field is required',
                        },
                      }}
                      render={({ field: { onChange, onBlur } }) => (
                        <View
                          style={[
                            layout.display,
                            layout.row,
                            layout.itemsCenter,
                            styles.mobileNumberInput,
                            {
                              paddingHorizontal: 10,
                              borderColor: errors.password ? '#FF575F' : 'rgba(255, 255, 255, 0.3)',
                            },
                          ]}
                        >
                          <TextInput
                            style={[
                              // layout.fullWidth,
                              layout.justifyCenter,
                              fonts.size_16,
                              fonts.fontWeight_small,
                              {
                                color: colors.white,
                                textAlign: 'left',
                                paddingLeft: '0%',
                                width: '92%',
                              },
                            ]}
                            placeholder="Password"
                            placeholderTextColor="#94939B"
                            secureTextEntry={!showPassword}
                            onBlur={onBlur}
                            onChangeText={(value) => {
                              onChange(value);
                              setShowInvalidPassword(false);
                              setTextInputValues((prevState) => ({
                                ...prevState,
                                password: value,
                              }));
                            }}
                            value={textInputValues.password}
                          />
                          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                              <Image
                                style={{ height: 16, width: 24, tintColor: '#94939B' }}
                                source={showPasswordIcon}
                              />
                            ) : (
                              <Image
                                style={{ height: 20, width: 25, tintColor: '#94939B' }}
                                source={hidePasswordIcon}
                              />
                            )}
                          </TouchableOpacity>
                        </View>
                      )}
                    />
                    {errors.password && (
                      <Text
                        style={{
                          color: '#FF575F',
                        }}
                      >
                        {errors.password.message || null}
                      </Text>
                    )}
                    {showInvalidPassword && (
                      <View>
                        <Text
                          style={{
                            color: '#FF575F',
                            marginTop: '2%',
                          }}
                        >
                          Invalid Username or Password
                        </Text>
                      </View>
                    )}
                  </View>
                </KeyboardAvoidingView>
              </View>
              <View style={{ marginTop: '4%' }}>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                  <Text
                    style={[
                      fonts.size_16,
                      fonts.fontWeight_small,
                      { color: colors.linearGradientColor },
                    ]}
                  >
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View style={[layout.row, styles.termsAndConditions]}>
                <Text
                  style={[
                    fonts.size_12,
                    fonts.fontWeight_small,
                    fonts.alignCenter,
                    {
                      color: colors.white,

                      marginRight: '2%',
                      opacity: 0.7,
                    },
                  ]}
                >
                  By logging in, you agree to
                </Text>
                <TouchableOpacity style={{ marginRight: '2%' }} onPress={openTermsAndCondition}>
                  <Text
                    style={[
                      fonts.size_12,
                      fonts.fontWeight_small,
                      { color: colors.linearGradientColor, opacity: 0.7 },
                    ]}
                  >
                    T&C
                  </Text>
                </TouchableOpacity>
                <Text
                  style={[
                    fonts.size_12,
                    fonts.fontWeight_small,
                    { color: colors.white, opacity: 0.7, marginRight: '2%' },
                  ]}
                >
                  and
                </Text>
                <TouchableOpacity onPress={openPrivacyPolicy}>
                  <Text
                    style={[
                      fonts.size_12,
                      fonts.fontWeight_small,
                      { color: colors.linearGradientColor, opacity: 0.7 },
                    ]}
                  >
                    Privacy policy
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onPress={handleSubmit(isLoading ? null : handleUsernameLogin)}
                disabled={
                  !isDirty ||
                  isLoading ||
                  !textInputValues.userName.trim() ||
                  !textInputValues.password.trim()
                }
              >
                <PrimaryGradient styleProp={[styles.loginButton, layout.justifyCenter]}>
                  {isLoading ? (
                    <ActivityIndicator size="large" color={colors.black} />
                  ) : (
                    <View style={[layout.display, layout.rowHCenter]}>
                      <Text
                        style={[
                          fonts.size_16,
                          fonts.bold,
                          {
                            color:
                              !isDirty ||
                              isLoading ||
                              !textInputValues.userName.trim() ||
                              !textInputValues.password.trim()
                                ? colors.gray300
                                : colors.loginBtnTextColor,
                          },
                        ]}
                      >
                        LOGIN
                      </Text>
                      <ImageVariant
                        testID="brand-img"
                        style={{
                          width: 16,
                          height: 9,
                          left: 5,
                          top: -2,
                          tintColor:
                            !isDirty ||
                            isLoading ||
                            !textInputValues.userName.trim() ||
                            !textInputValues.password.trim()
                              ? colors.gray300
                              : colors.loginBtnTextColor,
                        }}
                        source={rightArrow}
                        resizeMode="contain"
                      />
                      {/* <Image
                        style={{ width: 14, height: 9, left: 5, top: -2,tintColor: 'red'}}
                        source={rightArrow}
                      /> */}
                    </View>
                  )}
                </PrimaryGradient>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <SetNewPasswordBottomSheet
        setOpensetNewPasswordBottomSheet={setOpensetNewPasswordBottomSheet}
        opensetNewPasswordBottomSheet={opensetNewPasswordBottomSheet}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    marginTop: '2%',
  },
  mobileNumberInput: {
    width: '100%',
    height: 48,
    color: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginTop: 12,
  },
  termsAndConditions: {
    marginRight: '4%',
    width: '100%',
    height: 18,
    justifyContent: 'center',
  },
  loginButton: {
    height: 48,
    width: '100%',
    borderRadius: 9,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
});

export default LoginScreen;
