import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeScreen } from '@/components/template';

const ToggleButton = ({
  setActivateConfirmationModalVisible,
  activeToggleData,
  chapterInfo,
  setActivatedData,
}) => {
  const [isEnabled, setIsEnabled] = useState();

  useEffect(() => {
    setIsEnabled(activeToggleData);
  }, [activeToggleData]);

  const toggleSwitch = () => {
    setActivateConfirmationModalVisible(true);
    setActivatedData(chapterInfo);
  };

  return (
    <SafeScreen>
      <TouchableOpacity
        onPress={() => {
          toggleSwitch();
        }}
      >
        <View
          style={[styles.container, isEnabled ? styles.activeContainer : styles.inactiveContainer]}
        >
          <View style={[styles.toggle, isEnabled ? styles.activeToggle : styles.inactiveToggle]} />
        </View>
      </TouchableOpacity>
    </SafeScreen>
  );
};

export default ToggleButton;

const styles = StyleSheet.create({
  container: {
    width: 34,
    height: 23,
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    padding: 2,
  },
  activeContainer: {
    backgroundColor: '#3DD598',
  },
  inactiveContainer: {
    backgroundColor: '#96A7AF',
  },
  toggle: {
    width: 20,
    height: 20,
    borderRadius: 13,
    backgroundColor: '#fff',
  },
  activeToggle: {
    transform: [{ translateX: 15 }],
  },
  inactiveToggle: {
    transform: [{ translateX: 2 }],
  },
});
