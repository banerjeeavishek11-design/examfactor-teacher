import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import ForgotSuccess from "@/theme/assets/images/forgotsuccess.png";
import rightArrow from "@/theme/assets/images/rightarrow.png";
import { ImageVariant } from "@/components/atoms";

const ForgotPasswordSuccessfulScreen = () => {
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
  return (
    <View
      style={[
        backgrounds.screenBackgroundColor,
        layout.paddingForFullScreen,
        layout.flex_1,
      ]}
    >
      <View
        style={[
          layout.itemsCenter,
          layout.flex_1,
          { justifyContent: "flex-end" },
        ]}
      >
        <ImageVariant
          testID="brand-img"
          style={{ width: 80, height: 80 }}
          source={ForgotSuccess}
          resizeMode="contain"
        />
        <View style={[layout.itemsCenter, { width: "50%",marginTop:'5%' }]}>
          <Text
            style={[
              fonts.size_16,
              fonts.bold,
              fonts.alignCenter,
              { color: colors.white,},
            ]}
          >
            New Password has been sent successfully!
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            marginTop: "10%",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("LoginScreen")}
            // disabled={isLoading}
            style={[
              styles.loginButton,
              layout.justifyCenter,
              {
                height: 48,
                borderRadius: 12,
                backgroundColor: colors.termsLinkColor,
              },
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
            <View style={[layout.display, layout.row, layout.itemsCenter]}>
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
            {/* )} */}
            {/* </PrimaryGradient> */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordSuccessfulScreen;

const styles = StyleSheet.create({
  loginButton: {
    height: 32,
    width: 311,
    borderRadius: 9,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
