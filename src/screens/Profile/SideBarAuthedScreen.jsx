import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/theme";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { SafeScreen } from "@/components/template";
import { ImageVariant } from "@/components/atoms";
import LeftArrow from "@/theme/assets/images/leftarrow.png";
import Arrow from "@/theme/assets/images/arrow.png";
import Rateus from "@/theme/assets/images/rateus.png";
import Support from "@/theme/assets/images/support.png";
import AppGuide from "@/theme/assets/images/appguide.png";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import User from "@/theme/assets/images/user.png";
import Teacher from "@/theme/assets/images/teacher.png";
import ClassTeacher from "@/theme/assets/images/classteacher.png";
import { Divider } from "react-native-paper";
import ChangeRoleBottomSheet from "@/components/BottomSheet/Profile/ChangeRoleBottomSheet";
import RateUsBottomSheet from "@/components/BottomSheet/Profile/RateUsBottomSheet";

const SideBarAuthedScreen = (props) => {
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
  const [changeRoleBottomSheetVisible, setChangeRoleBottomSheetVisible] =
    useState(false);
  const [rateUsModalVisible, setRateUsModalVisible] = useState(false);
  const [userRole, setUserRole] = useState("Teacher");

  const closeDrawer = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const openTermsAndCondition = () => {
    Linking.openURL("https://www.examfactor.com/terms-and-conditions/");
  };

  const openPrivacyPolicy = () => {
    Linking.openURL("https://www.examfactor.com/privacy-policy/");
  };

  const openRateUsModal = () => {
    setRateUsModalVisible(true);
  };

  const logOut = () => {
    navigation.navigate("LoginScreen")
  };

  return (
    <SafeScreen>
      <View style={[layout.paddingForFullScreen, { flex: 1 }]}>
        <TouchableOpacity onPress={closeDrawer}>
          <View style={[layout.rowHCenter, layout.display]}>
            <ImageVariant
              testID="brand-img"
              style={{ width: 7, height: 11 }}
              source={LeftArrow}
              resizeMode="contain"
            />
            <Text
              style={[
                fonts.size_16,
                fonts.bold,
                { color: colors.backButtonColor, left: 5 },
              ]}
            >
              Profile
            </Text>
          </View>
        </TouchableOpacity>
        <DrawerContentScrollView
          {...props}
          showsVerticalScrollIndicator={false}
        >
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
              onPress={() => navigation.navigate("ProfileDetailsScreen")}
            >
              <View style={[layout.display, layout.rowHCenter]}>
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
                    style={{ width: 23, height: 23, tintColor: colors.white }}
                    source={User}
                    resizeMode="contain"
                  />
                </View>
                <View
                  style={[
                    layout.display,
                    layout.rowHCenter,
                    layout.justifyBetween,
                    layout.flex_1,
                  ]}
                >
                  <View style={{ marginLeft: "6%", width: "70%" }}>
                    <Text
                      style={[
                        fonts.size_14,
                        fonts.bold,
                        { color: colors.white },
                      ]}
                    >
                      Viney Dua
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
                      vineydua_dav
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
            <View style={[layout.itemsCenter, { paddingHorizontal: "4%" }]}>
              <Divider
                style={{
                  marginTop: "0%",
                  width: "100%",
                  backgroundColor: colors.lineBackgroundColor,
                }}
              />
            </View>

            <View
              style={[
                layout.display,
                layout.rowHCenter,
                layout.justifyBetween,
                { marginTop: "2%", paddingHorizontal: "4%" },
              ]}
            >
              <View
                style={[
                  layout.display,
                  layout.rowHCenter,
                  layout.justifyBetween,
                  {
                    width: "40%",
                    height: 35,
                    backgroundColor: "green",
                    borderRadius: 4,
                    paddingHorizontal: "4%",
                  },
                ]}
              >
                <View style={{ width: "5%" }}>
                  {userRole === "Teacher" ? (
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
                  {userRole === "Teacher" ? (
                    <Text
                      style={[
                        fonts.size_14,
                        fonts.fontWeight_small,
                        { color: colors.white },
                      ]}
                    >
                      {userRole}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        fonts.size_13,
                        fonts.fontWeight_small,
                        { color: colors.white },
                      ]}
                    >
                      {userRole}
                    </Text>
                  )}
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setChangeRoleBottomSheetVisible(true)}
              >
                <Text
                  style={[
                    fonts.size_12,
                    fonts.fontWeignt_600,
                    {
                      color: colors.termsLinkColor,
                      textDecorationLine: "underline",
                    },
                  ]}
                >
                  Change Role
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text
            style={[
              fonts.size_14,
              fonts.bold,
              { color: colors.white, opacity: 0.4, marginTop: "10%" },
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
                marginTop: "3%",
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
                <View style={{ marginLeft: "6%" }}>
                  <Text
                    style={[fonts.size_14, fonts.bold, { color: colors.white }]}
                  >
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
                marginTop: "3%",
              },
            ]}
            onPress={() => navigation.navigate("SupportScreen")}
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
                <View style={{ marginLeft: "6%" }}>
                  <Text
                    style={[fonts.size_14, fonts.bold, { color: colors.white }]}
                  >
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
                marginTop: "3%",
              },
            ]}
            onPress={() => navigation.navigate("AppGuideScreen")}
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
                <View style={{ marginLeft: "6%" }}>
                  <Text
                    style={[fonts.size_14, fonts.bold, { color: colors.white }]}
                  >
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

          <View>
            <TouchableOpacity
              style={{ marginVertical: 40 }}
              onPress={() => logOut()}
            >
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
                    fonts.size_14,
                    fonts.bold,
                    fonts.alignCenter,
                    {
                      color: colors.termsLinkColor,
                      marginRight: "4%",
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
                    fonts.size_14,
                    fonts.bold,
                    fonts.alignCenter,
                    {
                      color: colors.termsLinkColor,
                      marginLeft: "4%",
                    },
                  ]}
                >
                  Privacy policy
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={[
                fonts.size_14,
                fonts.bold,
                fonts.alignCenter,
                {
                  color: colors.backButtonColor,
                  marginTop: "2%",
                },
              ]}
            >
              APP VERSION 123
            </Text>
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

const styles = StyleSheet.create({});
