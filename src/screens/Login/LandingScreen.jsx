import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useTheme } from '@/theme';
import { ImageVariant } from '@/components/atoms';
import Logo from '@/theme/assets/images/examfactorlogo.png';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const LandingScreen = ({ navigation }) => {
  const { colors, variant, changeTheme, layout, gutters, fonts, components, backgrounds } =
    useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 1000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[backgrounds.screenBackgroundColor, layout.flex_1]}>
      <View style={[layout.itemsCenter, layout.justifyCenter, { flex: 1, flexDirection: 'row' }]}>
        <ImageVariant
          testID="brand-img"
          style={{ width: moderateScale(170), height: moderateVerticalScale(170) }}
          source={Logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({});
