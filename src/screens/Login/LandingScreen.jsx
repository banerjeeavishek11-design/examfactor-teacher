import { View, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import { useTheme } from '@/theme';
import { ImageVariant } from '@/components/atoms';
import Logo from '@/theme/assets/images/examfactorlogo.png';
import tabLogo from '../../theme/assets/images/tabStartupLogo.png';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const screenWidth = Dimensions.get('window').width;
const isTablet = screenWidth >= 600;

const LandingScreen = ({ navigation }) => {
  const { layout, backgrounds } = useTheme();

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
          <View style={[layout.row, layout.itemsCenter]}>
            <ImageVariant
              testID="brand-img"
              style={{ width: moderateScale(220), height: moderateVerticalScale(200) }}
              source={tabLogo}
              resizeMode="contain"
            />
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
