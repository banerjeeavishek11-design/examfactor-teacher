import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useTheme } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { ImageVariant } from "@/components/atoms";
import Logo from "@/theme/assets/images/examfactorlogo.png";
import rightArrow from "@/theme/assets/images/rightarrow.png";
import { Controller, useForm } from "react-hook-form";
import PrimaryGradient from "@/components/template/LinearGradient/PrimaryGradient";

const ForgotPasswordScreen = () => {
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
  return (
    <View
      style={[backgrounds.screenBackgroundColor, layout.paddingForFullScreen]}
    >
      {/* <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={{ color: "white" }}>Back</Text>
      </TouchableOpacity> */}
      <View
        style={[
          layout.justifyEnd,
          layout.fullHeight,
          { borderColor: "red", borderWidth: 1 },
        ]}
      >
        <View style={{ borderColor: "red", borderWidth: 1, marginBottom: "5%" }}>
          <ImageVariant
            testID="brand-img"
            style={{ width: 110, height: 112 }}
            source={Logo}
            resizeMode="contain"
          />
        </View>
        <View style={{ width: "40%", marginBottom: "5%" }}>
          <Text style={[fonts.size_16, fonts.bold, { color: "white" }]}>
            Forgot password? Login through OTP
          </Text>
        </View>
        <View style={{ marginBottom: "2%" }}>
          <Text
            style={[fonts.size_16, fonts.small, { color: colors.subHeading }]}
          >
            Please enter your email address to get the one time password
          </Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          enabled={true}
        >
          <View style={{ marginBottom: "10%" }}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "This feild is required",
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
                      {
                        color: colors.white,
                        textAlign: "left",
                        paddingLeft: "0%",
                      },
                    ]}
                    placeholder="Email "
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
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ForgotPasswordSuccessfulScreen")
            }
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
                  GET OTP
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
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  mobileNumberInput: {
    width: "100%",
    height: 48,
    color: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginTop: 12,
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
