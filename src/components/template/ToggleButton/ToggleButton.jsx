import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeScreen } from '@/components/template';

const ToggleButton = ({ chapterId, topicId, onToggleClick, isEnabled, topics }) => {
  const handleToggleClick = () => {
    onToggleClick(chapterId, topicId, topics);
  };

  return (
    <SafeScreen>
      <TouchableOpacity
        onPress={() => {
          handleToggleClick();
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
    height: 25,
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
    width: 16,
    height: 16,
    borderRadius: 13,
    backgroundColor: '#fff',
  },
  activeToggle: {
    transform: [{ translateX: 12 }],
  },
  inactiveToggle: {
    transform: [{ translateX: 2 }],
  },
});
