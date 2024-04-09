import { Image, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import React from 'react';
import { useTheme } from '@/theme';
import { Header, SafeScreen } from '@/components/template';
import SchoolWorkTopTabNavigator from '@/navigators/SchoolWorkTopTabNavigator';
import GradientLeftArrow from '@/theme/assets/images/gradientlefttarrow.png';
import GradientRightArrow from '@/theme/assets/images/gradientrightarrow.png';

const screenWidth = Dimensions.get('window').width;
const isTablet = screenWidth >= 600;

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

          <Text
            style={[
              fonts.size_16,
              fonts.bold,
              { color: colors.white, marginRight: isTablet ? '8%' : null },
            ]}
          >
            C1: Motion
          </Text>
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
