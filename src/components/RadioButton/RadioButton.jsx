import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from '@/theme';

const RadioButton = ({ isActive }) => {
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
    <View style={[styles.outerStyle]}>
      <View
        style={[
          styles.innerStyle,
          {
            backgroundColor: isActive ? colors.white : 'transparent',
          },
        ]}
      ></View>
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  outerStyle: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerStyle: {
    width: 8,
    height: 8,
    borderRadius: 100,
  },
});
