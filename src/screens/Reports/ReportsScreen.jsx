import React from 'react';
import { SafeScreen } from '@/components/template';
import ReportsTopTabNavigator from '@/navigators/ReportsTopTabNavigator';

const ReportsScreen = () => {
  return (
    <SafeScreen>
      <ReportsTopTabNavigator />
    </SafeScreen>
  );
};

export default ReportsScreen;
