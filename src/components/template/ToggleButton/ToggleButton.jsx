import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeScreen } from "@/components/template";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@/theme";

const ToggleButton = ({ setActivateConfirmationModalVisible }) => {
  const { colors, layout, fonts } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    if (!isEnabled) {
      setActivateConfirmationModalVisible(true);
    }
    setIsEnabled(!isEnabled);
  };

  return (
    <SafeScreen>
      <TouchableOpacity
        style={{ backgroundColor: colors.cardBackgroundColor }}
        onPress={() => {
          toggleSwitch();
        }}
      >
        <View
          style={[
            styles.container,
            isEnabled ? styles.activeContainer : styles.inactiveContainer,
          ]}
        >
          <View
            style={[
              styles.toggle,
              isEnabled ? styles.activeToggle : styles.inactiveToggle,
            ]}
          />
        </View>
      </TouchableOpacity>
    </SafeScreen>
  );
};

export default ToggleButton;

const styles = StyleSheet.create({
  container: {
    width: 42,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignSelf: "flex-end",
    padding: 2,
  },
  activeContainer: {
    backgroundColor: "green",
  },
  inactiveContainer: {
    backgroundColor: "#96A7AF",
  },
  toggle: {
    width: 20,
    height: 20,
    borderRadius: 13,
    backgroundColor: "#fff",
  },
  activeToggle: {
    transform: [{ translateX: 15 }],
  },
  inactiveToggle: {
    transform: [{ translateX: 2 }],
  },
});
