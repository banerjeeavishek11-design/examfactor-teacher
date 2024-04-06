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
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/theme";
import Logo from "@/theme/assets/images/examfactorlogo.png";
import rightArrow from "@/theme/assets/images/rightarrow.png";
import { ImageVariant } from "@/components/atoms";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import {
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import PrimaryGradient from "@/components/template/LinearGradient/PrimaryGradient";
import { MMKV, useMMKVString } from "react-native-mmkv";
import { useDispatch } from "react-redux";
import { loginAction } from "@/store/redux-slice/LoginSlice";

const screenWidth = Dimensions.get("window").width;
const isTablet = screenWidth >= 600;
const storage = new MMKV();


const LoginScreen = () => {
  
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
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [textInputValues, setTextInputValues] = useState({
    username: "",
    password: "",
    referralCode: "",
    mobileNumber: "",
  });

  const handleOutsideTap = () => {
    Keyboard.dismiss();
  };

  const handleUsernameLogin = (data) => {
    storage.set("username", data.username);
    dispatch(loginAction(data));
    navigation.reset({
      index: 0,
      routes: [{ name: "AuthorizedStack" }],
    });
  };

  const openTermsAndCondition = ()=>{
    Linking.openURL('https://www.examfactor.com/terms-and-conditions/')
  }

  const openPrivacyPolicy = ()=>{
    Linking.openURL('https://www.examfactor.com/privacy-policy/')
  }

  return (
    <View style={[backgrounds.screenBackgroundColor]}>
      <View
        style={[
          backgrounds.screenBackgroundColor,
          layout.paddingForFullScreen,
          isTablet
            ? {
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "flex-start",
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
                  width: moderateScale(110),
                  height: moderateVerticalScale(112),
                }}
                source={Logo}
                resizeMode="contain"
              />
              <View style={{ width: "80%" }}>
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
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  enabled={true}
                >
                  <View style={{ marginTop: "3%" }}>
                    <Controller
                      name="username"
                      control={control}
                      rules={{
                        required: "This field is required",
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
                                ? "#FF575F"
                                : "rgba(255, 255, 255, 0.3)",
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
                                textAlign: "left",
                                paddingLeft: "0%",
                              },
                            ]}
                            placeholder="Username"
                            placeholderTextColor="#94939B"
                            onBlur={onBlur}
                            onChangeText={(value) => {
                              onChange(value);
                              setTextInputValues((prevState) => ({
                                ...prevState,
                                username: value,
                              }));
                            }}
                            value={textInputValues.username}
                          />
                        </View>
                      )}
                    />
                    {errors.username && (
                      <Text
                        style={{
                          color: "#FF575F",
                        }}
                      >
                        {errors.username.message || null}
                      </Text>
                    )}

                    <Controller
                      name="password"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "this field is required",
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
                                ? "#FF575F"
                                : "rgba(255, 255, 255, 0.3)",
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
                                textAlign: "left",
                                paddingLeft: "0%",
                              },
                            ]}
                            placeholder="Password"
                            placeholderTextColor="#94939B"
                            secureTextEntry={true}
                            onBlur={onBlur}
                            onChangeText={(value) => {
                              onChange(value);
                              setTextInputValues((prevState) => ({
                                ...prevState,
                                password: value,
                              }));
                            }}
                            value={textInputValues.password}
                          />
                        </View>
                      )}
                    />
                    {errors.password && (
                      <Text
                        style={{
                          color: "#FF575F",
                        }}
                      >
                        {errors.password.message || null}
                      </Text>
                    )}
                  </View>
                </KeyboardAvoidingView>
              </View>
              <View style={{ marginTop: "4%" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ForgotPasswordScreen")}
                >
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

                      marginRight: "2%",
                      opacity: 0.7,
                    },
                  ]}
                >
                  By logging in, you agree to
                </Text>
                <TouchableOpacity
                  style={{ marginRight: "2%" }}
                  onPress={openTermsAndCondition}
                >
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
                    { color: colors.white, opacity: 0.7, marginRight: "2%" },
                  ]}
                >
                  and
                </Text>
                <TouchableOpacity
                onPress={openPrivacyPolicy}
                >
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
                onPress={handleSubmit(handleUsernameLogin)}
                // disabled={isLoading}
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
                      LOGIN
                    </Text>
                    <ImageVariant
                      testID="brand-img"
                      style={{ width: 16, height: 9, left: 5, top: -2 }}
                      source={rightArrow}
                      resizeMode="contain"
                    />
                  </View>
                </PrimaryGradient>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  heading: {
    marginTop: "2%",
  },
  subheading: {
    marginTop: isTablet ? moderateScale(5) : "2%",
  },
  mobileNumberInput: {
    width: "100%",
    height: 48,
    color: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginTop: 12,
  },
  termsAndConditions: {
    marginRight: "4%",
    width: "100%",
    height: 18,
    justifyContent: "center",
  },
  loginButton: {
    height: 48,
    width: "100%",
    borderRadius: 9,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
  },
});
