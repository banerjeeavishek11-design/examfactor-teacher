import { Text, View } from 'react-native';
import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useTheme } from '@/theme';
import { useSelector } from 'react-redux';

const SuffixText = ({ total }) => {
  const { fonts, colors } = useTheme();
  return <Text style={[fonts.size_10, { color: colors.gray200 }]}>/ {total ? total : '0'}</Text>;
};

const Circularprogressbar = (props) => {
  const { progress, total } = props;
  const isTablet = useSelector((state) => state.screenDimensions.isTablet);

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
        valueSuffix={<SuffixText total={total} />}
        progressValueStyle={{ fontSize: 12 }}
        //   activeStrokeWidth={40}
      />
    </View>
  );
};

export default Circularprogressbar;
