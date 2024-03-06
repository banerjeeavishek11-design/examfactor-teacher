import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Logo from "@/theme/assets/images/examfactorlogo.png";
import DownArrow from "@/theme/assets/images/Downarrow.png";
import User from "@/theme/assets/images/user.png";
import { useTheme } from "@/theme";
import { ImageVariant } from "@/components/atoms";


const Header = ({ goToCoinScreen, openCategoryBottomSheet, refresh }) => {
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

  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={[layout.paddingForFullScreen]}>
      <View
        style={[
          layout.rowHCenter,
          //   layout.justifyBetween,
          layout.justifyBetween,
          layout.display,
          { width: "100%" },
        ]}
      >
        <View>
          <TouchableOpacity>
            <View style={[layout.rowHCenter]}>
              <Text
                style={[
                  fonts.size_18,
                  fonts.fontWeight_extraSmall,
                  {
                    color: colors.white,
                    maxWidth: 200,
                    minWidth: 100,
                  },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Class 10-B
              </Text>

              <ImageVariant
                testID="brand-img"
                style={{ width: 10, height: 7 }}
                source={DownArrow}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
              onPress={()=>handleOpenDrawer()}
            style={[layout.rowHCenter, layout.justifyBetween, { width: "10%" }]}
          >
            <ImageVariant
              testID="brand-img"
              style={{ width: 23, height: 23 }}
              source={User}
              resizeMode="contain"
            />
            <ImageVariant
              testID="brand-img"
              style={{ width: 10, height: 12, left: 5 }}
              source={DownArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  button: {
    height: 42,
    borderRadius: 12,
    backgroundColor: "#22222F",
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 6,
    borderWidth: 1,
    borderColor: "#22222F",
  },
  activeButton: {
    borderColor: "#27D4FA",
  },
  buttonText: {
    color: "#94939B",
  },
  activeButtonText: {
    color: "#27D4FA",
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    width: 38,
    height: 38,
    marginTop: "-10%",
    marginRight: "5%",
  },
  badge: {
    backgroundColor: "#E53777",
    borderRadius: 12,
    minWidth: 20,
    paddingVertical: 2,
    paddingHorizontal: 6,
    justifyContent: "center",
    alignItems: "center",
    top: "5%",
    zIndex: 5,
    position: "relative",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },
});
