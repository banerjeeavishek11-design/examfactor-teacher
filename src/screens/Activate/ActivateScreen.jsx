import React from 'react';
import { SafeScreen } from '@/components/template';
import ActivateTopTabNavigator from '@/navigators/ActivateTopTabNavigator';

const ActivateScreen = () => {
  return (
    <SafeScreen>
      <ActivateTopTabNavigator />
    </SafeScreen>
  );
};

export default ActivateScreen;
