import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/template';
import { ImageVariant } from '@/components/atoms';
import Success from '@/theme/assets/images/forgotsuccess.png';
import { useRoute } from '@react-navigation/native';
import RightArrow from '@/theme/assets/images/rightarrow.png';
import PrimaryGradient from '@/components/template/LinearGradient/PrimaryGradient';

const NewPasswordStatusScreen = ({ navigation }) => {
  const route = useRoute();
  const { layout, colors, fonts } = useTheme();
  return (
    <SafeScreen>
      <View
        style={[layout.flex_1, layout.justifyEnd, layout.itemsCenter, layout.paddingForFullScreen]}
      >
        <View style={[layout.itemsCenter, { width: '70%' }]}>
          <ImageVariant style={{ marginBottom: '5%', width: 80, height: 80 }} source={Success} />
          <Text style={[fonts.size_20, fonts.alignCenter, fonts.bold, { color: colors.white }]}>
            New Password has been {route.params?.data} Successfully
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LoginScreen', {
              userDetails: route.params?.userDetails,
            });
          }}
          style={layout.fullWidth}
        >
          <PrimaryGradient styleProp={[styles.loginButton, layout.justifyCenter]}>
            <View style={[layout.display, layout.rowHCenter]}>
              <Text style={[fonts.size_16, fonts.bold, { color: colors.loginBtnTextColor }]}>
                Go To Profile Page
              </Text>
              <ImageVariant
                testID="brand-img"
                style={{ width: 16, height: 9, left: 5 }}
                source={RightArrow}
                resizeMode="contain"
              />
            </View>
          </PrimaryGradient>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
};

export default NewPasswordStatusScreen;

const styles = StyleSheet.create({
  loginButton: {
    height: 48,
    width: '100%',
    borderRadius: 9,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
});
