import { Text, View, Dimensions } from 'react-native';
import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useTheme } from '@/theme';

const screenWidth = Dimensions.get('window').width;
const isTablet = screenWidth >= 600;

const SuffixText = () => {
  const { fonts, colors } = useTheme();
  return <Text style={[fonts.size_10, { color: colors.gray200 }]}>/ 100</Text>;
};

const Circularprogressbar = (props) => {
  const { progress } = props;

  return (
    <View>
      <CircularProgress
        value={progress}
        radius={isTablet ? 35 : 40}
        progressValueColor={'#ecf0f1'}
        activeStrokeColor={'#3DD598'}
        inActiveStrokeColor="#474752"
        inActiveStrokeOpacity={0.4}
        // inActiveStrokeWidth={20}
        valueSuffix={<SuffixText />}
        progressValueStyle={{ fontSize: 12 }}
        //   activeStrokeWidth={40}
      />
    </View>
  );
};

export default Circularprogressbar;
