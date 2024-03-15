import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import LeftArrow from "@/theme/assets/images/leftarrow.png";
import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";
import { useNavigation, useRoute } from "@react-navigation/native";

const SolutionScreen = () => {
  // const route = useRoute()
  // const {topic, question} = route.params
  const navigation = useNavigation();
  const { fonts, colors, layout } = useTheme();
  return (
    <SafeScreen>
      <View style={[layout.paddingForFullScreen]}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View style={[layout.rowHCenter, layout.display]}>
              <Image
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
                Back
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={[
            fonts.size_16,
            fonts.fontWeight_small,
            { color: colors.white, marginTop: "4%" },
          ]}
        >
          Question
        </Text>
      </View>
    </SafeScreen>
  );
};

export default SolutionScreen;

const styles = StyleSheet.create({});
