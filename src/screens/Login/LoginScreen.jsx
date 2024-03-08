import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@/theme';
import Logo from '@/theme/assets/images/examfactorlogo.png';
import rightArrow from '@/theme/assets/images/rightarrow.png';
import { ImageVariant } from '@/components/atoms';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

const screenWidth = Dimensions.get('window').width;
const isTablet = screenWidth >= 600;

const Login = () => {
  const {
    colors,
    variant,
    changeTheme,
    layout,
    gutters,
    fonts,
    components,
    backgrounds,
  } = useTheme();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [textInputValues, setTextInputValues] = useState({
    username: '',
    password: '',
    referralCode: '',
    mobileNumber: '',
  });

  const handleOutsideTap = () => {
    Keyboard.dismiss();
  };
  const handleUsernameLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'AuthorizedStack' }],
    });
  };

  return (
    <View style={[backgrounds.screenBackgroundColor]}>
      <View
        style={[
          backgrounds.screenBackgroundColor,
          layout.paddingForFullScreen,
          isTablet
            ? {
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'flex-start',
                width: moderateScale(300),
                // paddingBottom: verticalScale(40),
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
                  width: moderateScale(80),
                  height: moderateVerticalScale(80),
                }}
                source={Logo}
                resizeMode="contain"
              />
              <View style={{ width: '80%' }}>
                <Text
                  style={[
                    fonts.size_32,
                    fonts.bold,
                    styles.heading,
                    { color: colors.white },
                  ]}
                >
                  ExamFactor
                </Text>
                <Text
                  style={[
                    fonts.size_16,
                    fonts.fontWeight_small,
                    { color: colors.subHeading },
                    styles.subheading,
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
                      name="username"
                      control={control}
                      rules={{
                        required: 'This feild is required',
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <View
                          style={[
                            layout.display,
                            layout.row,
                            layout.itemsCenter,
                            styles.mobileNumberInput,
                            {
                              paddingHorizontal: 10,
                              borderColor: errors.username
                                ? '#FF575F'
                                : 'rgba(255, 255, 255, 0.3)',
                            },
                          ]}
                        >
                          <TextInput
                            style={[
                              layout.fullWidth,
                              layout.justifyCenter,
                              fonts.size_16,
                              {
                                color: colors.white,
                                textAlign: 'left',
                                paddingLeft: '0%',
                              },
                            ]}
                            placeholder="Username"
                            placeholderTextColor="#94939B"
                            onBlur={onBlur}
                            // onChangeText={(value) => {
                            //   onChange(value);
                            //   setTextInputValues((prevState) => ({
                            //     ...prevState,
                            //     username: value,
                            //   }));
                            // }}
                            // value={textInputValues.username}
                          />
                        </View>
                      )}
                    />
                    {/* {errors.username && (
                  <Text
                    style={{
                      color: "#FF575F",
                    }}
                  >
                    {errors.username.message || null}
                  </Text>
                )} */}

                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: 'this feild is required',
                        },
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <View
                          style={[
                            layout.display,
                            layout.row,
                            layout.itemsCenter,
                            styles.mobileNumberInput,
                            {
                              paddingHorizontal: 10,
                              borderColor: errors.username
                                ? '#FF575F'
                                : 'rgba(255, 255, 255, 0.3)',
                            },
                          ]}
                        >
                          <TextInput
                            style={[
                              layout.fullWidth,
                              layout.justifyCenter,
                              fonts.size_16,
                              {
                                color: colors.white,
                                textAlign: 'left',
                                paddingLeft: '0%',
                              },
                            ]}
                            placeholder="Password"
                            placeholderTextColor="#94939B"
                            secureTextEntry={true}
                            //   onBlur={onBlur}
                            //   onChangeText={(value) => {
                            //     onChange(value);
                            //     setTextInputValues((prevState) => ({
                            //       ...prevState,
                            //       password: value,
                            //     }));
                            //   }}
                            //   value={textInputValues.password}
                          />
                        </View>
                      )}
                    />
                    {/* {errors.password && (
                  <Text
                  style={{
                    color: "#FF575F",
                  }}
                >
                    This is required.
                  </Text>
                )} */}
                  </View>
                </KeyboardAvoidingView>
              </View>
              <View style={{ marginTop: '4%' }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPasswordScreen')}
                >
                  <Text
                    style={[
                      fonts.size_16,
                      fonts.fontWeight_small,
                      { color: colors.termsLinkColor },
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
                <TouchableOpacity
                  style={{ marginRight: '2%' }}
                  // onPress={openTermsAndCondition}
                >
                  <Text
                    style={[
                      fonts.size_12,
                      { color: colors.termsLinkColor, opacity: 0.7 },
                    ]}
                  >
                    T&C
                  </Text>
                </TouchableOpacity>
                <Text
                  style={[
                    fonts.size_12,
                    { color: colors.white, opacity: 0.7, marginRight: '2%' },
                  ]}
                >
                  and
                </Text>
                <TouchableOpacity
                // onPress={openPrivacyPolicy}
                >
                  <Text
                    style={[
                      fonts.size_12,
                      { color: colors.termsLinkColor, opacity: 0.7 },
                    ]}
                  >
                    Privacy policy
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                  marginTop: '5%',
                }}
              >
                <TouchableOpacity
                  onPress={handleUsernameLogin}
                  // disabled={isLoading}
                  style={[
                    styles.loginButton,
                    layout.justifyCenter,
                    {
                      height: 48,
                      borderRadius: 12,
                      backgroundColor: colors.termsLinkColor,
                    },
                    isTablet ? { width: moderateScale(220) } : null,
                  ]}
                >
                  {/* <PrimaryGradient
                    styleProp={[
                      styles.loginButton,
                      layout.justifyCenter,
                      { height: 48, borderRadius: 12 },
                    ]}
                  > */}
                  {/* {isLoading ? (
                      <ActivityIndicator size="large" color={Colors.black} />
                    ) : ( */}
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
                      LOGIN
                    </Text>
                    <ImageVariant
                      testID="brand-img"
                      style={{ width: 16, height: 9, left: 5 }}
                      source={rightArrow}
                      resizeMode="contain"
                    />
                  </View>
                  {/* )} */}
                  {/* </PrimaryGradient> */}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  heading: {
    marginTop: '2%',
  },
  subheading: {
    marginTop: isTablet ? moderateScale(5) : '2%',
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
    height: 32,
    width: '100%',
    borderRadius: 9,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
