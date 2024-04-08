import { View } from 'react-native';
import React from 'react';
import { useTheme } from '@/theme';
import { Header, SafeScreen } from '@/components/template';
import ActivateTopTabNavigator from '@/navigators/ActivateTopTabNavigator';

const ActivateScreen = () => {
  const { colors } = useTheme();
  return (
    <SafeScreen>
      <View style={[{ backgroundColor: colors.headerBackgroundColor, height: 120 }]}>
        <Header />
      </View>
      <ActivateTopTabNavigator />
    </SafeScreen>
  );
};

export default ActivateScreen;
