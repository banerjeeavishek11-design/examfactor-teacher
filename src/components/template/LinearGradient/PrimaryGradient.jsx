import { useTheme } from '@/theme';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const PrimaryGradient = ({ styleProp, children }) => {
  const { colors } = useTheme();
  if (styleProp && styleProp.length) {
    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 0.0 }}
        colors={[colors.linearGradientColor, colors.termsLinkColor]}
        style={[...styleProp]}
      >
        {children}
      </LinearGradient>
    );
  } else {
    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 0.0 }}
        colors={[colors.linearGradientColor, colors.termsLinkColor]}
      >
        {children}
      </LinearGradient>
    );
  }
};

export default PrimaryGradient;
