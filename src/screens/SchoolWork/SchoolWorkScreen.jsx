import React from 'react';
import { SafeScreen } from '@/components/template';
import SchoolWorkTopTabNavigator from '@/navigators/SchoolWorkTopTabNavigator';

const SchoolWorkScreen = () => {
  return (
    <SafeScreen>
      <SchoolWorkTopTabNavigator />
    </SafeScreen>
  );
};

export default SchoolWorkScreen;
