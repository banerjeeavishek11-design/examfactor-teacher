import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";
import { ImageVariant } from "@/components/atoms";
import Success from "@/theme/assets/images/forgotsuccess.png";
import { useRoute } from "@react-navigation/native";
import RightArrow from "@/theme/assets/images/rightarrow.png";

const NewPasswordStatusScreen = ({navigation}) => {
  const route = useRoute();
  const { layout, colors, fonts } = useTheme();
  return (
    <SafeScreen>
      <View style={[layout.flex_1, layout.justifyEnd, layout.itemsCenter,layout.paddingForFullScreen]}>
        <View style={[layout.itemsCenter, { width: "70%" }]}>
          <ImageVariant style={{marginBottom: "5%",width:80, height:80}} source={Success} />
          <Text
            style={[
              fonts.size_20,
              fonts.alignCenter,
              fonts.bold,
              { color: colors.white },
            ]}
          >
            New Password has been {route.params?.data} Successfully
          </Text>
        </View>
        <TouchableOpacity
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            {
              height: 48,
              borderRadius: 12,
              backgroundColor: colors.termsLinkColor,
              width: "100%",
              marginVertical: "8%",
            },
          ]}
          onPress={() => {
            navigation.navigate("ProfileDetailsScreen")
          }}
        >
          <View style={[layout.display, layout.row, layout.itemsCenter]}>
            <Text
              style={[
                fonts.size_16,
                fonts.bold,
                { color: colors.loginBtnTextColor },
              ]}
            >
              Go To Profile
            </Text>
            <ImageVariant
              testID="brand-img"
              style={{ width: 16, height: 9, left: 5 }}
              source={RightArrow}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
};

export default NewPasswordStatusScreen;

const styles = StyleSheet.create({});
