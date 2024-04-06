import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '@/theme';

const ActivateScreen = () => {
  const { colors, variant, changeTheme, layout, gutters, fonts, components, backgrounds } =
    useTheme();
  return (
    <View style={[backgrounds.screenBackgroundColor, layout.paddingForFullScreen, layout.flex_1]}>
      <Text>ActivateScreen</Text>
    </View>
  );
};

export default ActivateScreen;

const styles = StyleSheet.create({});
