import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTheme } from '@/theme';
import { Header, SafeScreen } from '@/components/template';
import SchoolWorkTopTabNavigator from '@/navigators/SchoolWorkTopTabNavigator';
import GradientLeftArrow from '@/theme/assets/images/gradientlefttarrow.png';
import GradientRightArrow from '@/theme/assets/images/gradientrightarrow.png';

const SchoolWorkScreen = () => {
  const { colors, layout, fonts } = useTheme();
  return (
    <SafeScreen>
      <View style={[{ backgroundColor: colors.headerBackgroundColor, height: 150 }]}>
        <Header />
        <View
          style={[
            layout.display,
            layout.rowHCenter,
            layout.justifyBetween,
            { paddingLeft: '4%', paddingRight: '4%' },
          ]}
        >
          <TouchableOpacity>
            <Image
              source={GradientLeftArrow}
              resizeMode="contain"
              style={{ width: 16, height: 9 }}
            />
          </TouchableOpacity>

          <Text style={[fonts.size_16, fonts.bold, { color: colors.white }]}>C1: Motion</Text>
          <TouchableOpacity>
            <Image
              source={GradientRightArrow}
              resizeMode="contain"
              style={{ width: 16, height: 9 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <SchoolWorkTopTabNavigator />
    </SafeScreen>
  );
};

export default SchoolWorkScreen;
