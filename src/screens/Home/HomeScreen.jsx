import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useTheme } from "@/theme";
import { Concentrix, Header, SafeScreen } from "@/components/template";
import Arrow from "@/theme/assets/images/arrow.png";
import { ImageVariant } from "@/components/atoms";
import { Divider } from "react-native-paper";
import DownArrow from "@/theme/assets/images/Downarrow.png";

const HomeScreen = () => {
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
  return (
    <SafeScreen>
      <View style={[{ backgroundColor: colors.headerBackgroundColor }]}>
        <Header />
      </View>
      <ScrollView
        contentContainerStyle={[
          layout.paddingForFullScreen,
          { paddingTop: "2%" },
        ]}
      >
        <View
          style={[layout.display, layout.rowHCenter, layout.justifyBetween]}
        >
          <Text
            style={[
              fonts.size_14,
              fonts.bold,
              { color: colors.white, opacity: 0.4 },
            ]}
          >
            CLASS PREPAREDNESS
          </Text>
          <TouchableOpacity style={[layout.display, layout.rowHCenter]}>
            <Text
              style={[
                fonts.size_14,
                fonts.bold,
                { color: colors.termsLinkColor },
              ]}
            >
              SEE DETAILS
            </Text>
            <ImageVariant
              testID="brand-img"
              style={{
                width: 11,
                height: 11,
                left: 2,
                tintColor: colors.termsLinkColor,
              }}
              source={Arrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            layout.fullWidth,
            layout.paddingForCard,
            {
              backgroundColor: colors.cardBackgroundColor,
              height: "auto",
              borderRadius: 12,
              marginTop: "4%",
            },
          ]}
        >
          <Text
            style={[
              fonts.size_20,
              fonts.fontWeight_small,
              { color: colors.white, textAlign: "center", marginTop: "3%" },
            ]}
          >
            Physics
          </Text>

          <View style={{ marginTop: "1%", alignItems: "center" }}>
            <Concentrix scorePercentage={20} />
          </View>
          <View style={{ alignItems: "center", marginTop: "-20%" }}>
            <Divider
              style={{
                width: "100%",
                backgroundColor: "#474752",
              }}
            />
          </View>
          <Text
            style={[
              fonts.size_14,
              fonts.fontWeignt_600,
              { color: colors.white, opacity: 0.3, top: 10 },
            ]}
          >
            PRACTICE
          </Text>
          <View
            style={[
              layout.display,
              layout.rowHCenter,
              layout.justifyBetween,
              { marginTop: "5%" },
            ]}
          >
            <Text
              style={[
                fonts.size_12,
                fonts.fontWeight_small,
                { color: colors.white },
              ]}
            >
              Home work
            </Text>
            <Text
              style={[
                fonts.size_12,
                fonts.fontWeight_small,
                { color: colors.white },
              ]}
            >
              0% Complete
            </Text>
          </View>
          <View
            style={[
              layout.display,
              layout.rowHCenter,
              layout.justifyBetween,
              { marginTop: "5%" },
            ]}
          >
            <Text
              style={[
                fonts.size_12,
                fonts.fontWeight_small,
                { color: colors.white },
              ]}
            >
              Diagnostic
            </Text>
            <Text
              style={[
                fonts.size_12,
                fonts.fontWeight_small,
                { color: colors.white },
              ]}
            >
              0% Complete
            </Text>
          </View>
        </View>
        <View
          style={[
            layout.fullWidth,
            layout.paddingForCard,
            {
              backgroundColor: colors.cardBackgroundColor,
              height: 350,
              borderRadius: 12,
              marginTop: "4%",
            },
          ]}
        ></View>
        <View
          style={[
            layout.display,
            layout.rowHCenter,
            layout.justifyBetween,
            { marginTop: "10%" },
          ]}
        >
          <Text
            style={[
              fonts.size_14,
              fonts.bold,
              { color: colors.white, opacity: 0.4 },
            ]}
          >
            STUDENT PROGRESS
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            layout.display,
            layout.rowHCenter,
            { marginRight: 5, marginTop: "3%" },
          ]}
        >
          <TouchableOpacity
            style={[
              layout.justifyCenter,
              layout.display,
              layout.rowHCenter,
              layout.justifyBetween,
              {
                backgroundColor: colors.bottomTabBackground,
                width: 72,
                height: 28,
                borderRadius: 4,
                paddingHorizontal: 6,
                marginRight: 5,
              },
            ]}
          >
            <Text
              style={[
                fonts.size_12,
                fonts.fontWeight_small,
                { color: colors.white, opacity: 0.3, textAlign: "center" },
              ]}
            >
              Sort By
            </Text>
            <ImageVariant
              testID="brand-img"
              style={{
                width: 7,
                height: 10,
                tintColor: colors.white,
                opacity: 0.4,
              }}
              source={DownArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              layout.justifyCenter,
              layout.display,
              layout.rowHCenter,
              layout.justifyBetween,
              {
                backgroundColor: colors.bottomTabBackground,
                width: 169,
                height: 28,
                borderRadius: 4,
                paddingHorizontal: 6,
                marginRight: 5,
              },
            ]}
          >
            <Text
              style={[
                fonts.size_12,
                fonts.fontWeight_small,
                { color: colors.white, opacity: 0.3, textAlign: "center" },
              ]}
            >
              Not Practiced in 7 Days
            </Text>
            <ImageVariant
              testID="brand-img"
              style={{
                width: 7,
                height: 10,
                tintColor: colors.white,
                opacity: 0.4,
              }}
              source={DownArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              layout.justifyCenter,
              layout.display,
              layout.rowHCenter,
              layout.justifyBetween,
              {
                backgroundColor: colors.bottomTabBackground,
                width: 149,
                height: 28,
                borderRadius: 4,
                paddingHorizontal: 6,
              },
            ]}
          >
            <Text
              style={[
                fonts.size_12,
                fonts.fontWeight_small,
                { color: colors.white, opacity: 0.3, textAlign: "center" },
              ]}
            >
              Achievable Score 90+
            </Text>
            <ImageVariant
              testID="brand-img"
              style={{
                width: 7,
                height: 10,
                tintColor: colors.white,
                opacity: 0.4,
              }}
              source={DownArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </ScrollView>

        <View
          style={[
            layout.fullWidth,
            {
              backgroundColor: colors.cardBackgroundColor,
              height: 200,
              marginTop: "3%",
              borderRadius: 13,
              justifyContent: "center",
            },
          ]}
        >
          <Text
            style={[
              fonts.size_20,
              fonts.fontWeignt_600,
              { color: colors.white, textAlign: "center" },
            ]}
          >
            Students data not available
          </Text>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
