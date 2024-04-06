import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/template';
import { ImageVariant } from '@/components/atoms';
import LeftArrow from '@/theme/assets/images/leftarrow.png';

const SubjectDetailsScreen = () => {
  const { colors, variant, changeTheme, layout, gutters, fonts, components, backgrounds } =
    useTheme();
  const navigation = useNavigation();
  return (
    <SafeScreen>
      <View
        style={[
          layout.fullWidth,
          {
            height: 167,
            backgroundColor: colors.headerBackgroundColor,
            paddingLeft: '4%',
            paddingTop: '4%',
          },
        ]}
      >
        <View style={[layout.display, layout.rowHCenter]}>
          <ImageVariant
            testID="brand-img"
            style={{ width: 10, height: 11, tintColor: colors.backButtonColor }}
            source={LeftArrow}
            resizeMode="contain"
          />
          <Text style={[fonts.size_16, fonts.bold, { color: colors.backButtonColor, left: 5 }]}>
            Physics
          </Text>
        </View>
      </View>
    </SafeScreen>
  );
};

export default SubjectDetailsScreen;

const styles = StyleSheet.create({});
