import React, { useRef, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { setNavigationReference } from '../utils/axios.config';

import { Example, Startup } from '@/screens';
import { useTheme } from '@/theme';

import UnAuthorizedStack from './UnAuthorizedStack';
import AuthorizedStack from './AuthorizedStack';

const Stack = createStackNavigator();

function ApplicationNavigator() {
  const { variant, navigationTheme } = useTheme();
  const navigationRef = useRef();

  useEffect(() => {
    setNavigationReference(navigationRef.current);
  }, []);

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Startup" component={Startup} />
        <Stack.Screen name="Example" component={Example} />
        <Stack.Screen name="UnAuthorizedStack" component={UnAuthorizedStack} />
        <Stack.Screen name="AuthorizedStack" component={AuthorizedStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
