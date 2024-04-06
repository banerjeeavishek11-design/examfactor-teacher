import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ProgressBar } from 'react-native-paper';

const Progressbar = (props) => {
  const { progress, color } = props;
  return (
    <View>
      <ProgressBar
        progress={progress}
        color={color}
        style={{
          width: '100%',
          height: 4,
          borderRadius: 5,
          backgroundColor: '#474752',
        }}
      />
    </View>
  );
};

export default Progressbar;

const styles = StyleSheet.create({});
