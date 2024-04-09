import { Text, View, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import { useTheme } from '@/theme';
import { ImageVariant } from '@/components/atoms';
import Logo from '@/theme/assets/images/examfactorlogo.png';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const screenWidth = Dimensions.get('window').width;
const isTablet = screenWidth >= 600;

const LandingScreen = ({ navigation }) => {
  const { colors, layout, fonts, backgrounds } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 1000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[backgrounds.screenBackgroundColor, layout.flex_1]}>
      <View style={[layout.itemsCenter, layout.justifyCenter, { flex: 1, flexDirection: 'row' }]}>
        {isTablet ? (
          <View style={[layout.row]}>
            <ImageVariant
              testID="brand-img"
              style={{ width: moderateScale(200), height: moderateVerticalScale(200) }}
              source={Logo}
              resizeMode="contain"
            />
            <Text style={[fonts.size_16, { color: colors.white }]}>ExamFactor</Text>
          </View>
        ) : (
          <ImageVariant
            testID="brand-img"
            style={{ width: moderateScale(170), height: moderateVerticalScale(170) }}
            source={Logo}
            resizeMode="contain"
          />
        )}
      </View>
    </View>
  );
};

export default LandingScreen;
