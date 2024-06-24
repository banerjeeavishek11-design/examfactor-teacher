import { View, Dimensions, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useTheme } from '@/theme';
import { ImageVariant } from '@/components/atoms';
import Logo from '@/theme/assets/images/examfactorlogo.png';
import tabLogo from '../../theme/assets/images/tabStartupLogo.png';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import appVersion from '../../../package.json';
import env from '../../../env.current.json';

const screenWidth = Dimensions.get('window').width;
const isTablet = screenWidth >= 600;

const LandingScreen = ({ navigation }) => {
  const { layout, backgrounds, fonts } = useTheme();

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
          <View style={[layout.itemsCenter]}>
            <ImageVariant
              testID="brand-img"
              style={{ width: moderateScale(220), height: moderateVerticalScale(200) }}
              source={tabLogo}
              resizeMode="contain"
            />
            {/* <Text
              style={[fonts.size_20, fonts.fontWeight_small, { color: 'white', marginTop: '-25%' }]}
            >
              Teacher
            </Text> */}
            <View style={[layout.itemsCenter, { position: 'absolute', bottom: '-25%' }]}>
              <Text style={[fonts.size_12, fonts.fontWeight_small, { color: 'white' }]}>
                {appVersion.version} ({env.current})
              </Text>
            </View>
          </View>
        ) : (
          <View style={layout.itemsCenter}>
            <ImageVariant
              testID="brand-img"
              style={{ width: moderateScale(100), height: moderateVerticalScale(100) }}
              source={Logo}
              resizeMode="contain"
            />
            <Text style={[fonts.size_24, fonts.bold, { color: 'white' }]}>ExamFactor</Text>
            <Text
              style={[fonts.size_16, fonts.fontWeight_small, { color: 'white', marginTop: '-5%' }]}
            >
              Teacher
            </Text>
            <View style={[layout.itemsCenter, { position: 'absolute', bottom: '-35%' }]}>
              <Text style={[fonts.size_12, fonts.fontWeight_small, { color: 'white' }]}>
                {appVersion.version} {env.current === 'prod' ? null : '(' + env.current + ')'}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default LandingScreen;
