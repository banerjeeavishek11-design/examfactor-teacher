import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import ForgotSuccess from "@/theme/assets/images/forgotsuccess.png";
import rightArrow from "@/theme/assets/images/rightarrow.png";
import { ImageVariant } from "@/components/atoms";
import PrimaryGradient from "@/components/template/LinearGradient/PrimaryGradient";

const ForgotPasswordSuccessfulScreen = () => {
  const { colors, variant, changeTheme, layout, gutters, fonts, components, backgrounds } =
    useTheme();
  const navigation = useNavigation();
  return (
    <View style={[backgrounds.screenBackgroundColor, layout.paddingForFullScreen, layout.flex_1]}>
      <View style={[layout.itemsCenter, layout.flex_1, { justifyContent: 'flex-end' }]}>
        <ImageVariant
          testID="brand-img"
          style={{ width: 80, height: 80 }}
          source={ForgotSuccess}
          resizeMode="contain"
        />
        <View style={[layout.itemsCenter, { width: "60%", marginTop: "5%" }]}>
          <Text
            style={[
              fonts.size_16,
              fonts.bold,
              fonts.alignCenter,
              { color: colors.white },
            ]}
          >
            New Password has been sent successfully!
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("LoginScreen")}
          style={[layout.fullWidth]}
        >
          <PrimaryGradient styleProp={[styles.loginButton]}>
            <View style={[layout.display, layout.rowHCenter]}>
              <Text
                style={[
                  fonts.size_16,
                  fonts.bold,
                  { color: colors.loginBtnTextColor },
                ]}
              >
                Go to login
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
      </View>
    </View>
  );
};

export default ForgotPasswordSuccessfulScreen;

const styles = StyleSheet.create({
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
