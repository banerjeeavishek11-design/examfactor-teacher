import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@/theme";
import { SafeScreen } from "@/components/template";
import { Searchbar } from "react-native-paper";
import Search from "@/theme/assets/images/search.png";

const ClassWorkTab = () => {
  const { layout, fonts, colors } = useTheme();
  return (
    <SafeScreen>
      <View style={[layout.paddingForFullScreen]}>
        <Searchbar
          placeholder="Search Chapter"
          placeholderTextColor="rgba(275, 275, 275, 0.5)"
          iconColor="rgba(275, 275, 275, 0.5)"
          inputStyle={[
            fonts.size_14,
            fonts.fontWeignt_600,
            { color: colors.white, right: 10 },
          ]}
          icon={() => (
            <Image
              source={Search}
              resizeMode="contain"
              style={{ width: 14, height: 14 }}
            />
          )}
          // onChangeText={onSearchChapters}
          style={{
            backgroundColor: "#09070E",
            borderColor: "rgba(275, 275, 275, 0.5)",
            borderWidth: 1,
            borderRadius: 8,
          }}
          clearButtonMode="while-editing"
          selectionColor={colors.buttonTextColor}
        />
        <Text
          style={[
            fonts.size_13,
            fonts.fontWeight_small,
            { color: colors.gray200, marginTop: "4%", marginBottom: "2%" },
          ]}
        >
          Use toggle to activate the homework
        </Text>
      </View>
    </SafeScreen>
  );
};

export default ClassWorkTab;

const styles = StyleSheet.create({});
