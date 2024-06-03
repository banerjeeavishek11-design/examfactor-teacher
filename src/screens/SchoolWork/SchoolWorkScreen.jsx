import React, { useEffect } from 'react';
import { SafeScreen } from '@/components/template';
import SchoolWorkTopTabNavigator from '@/navigators/SchoolWorkTopTabNavigator';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

const SchoolWorkScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'HomeWorkTab' }],
        })
      );
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeScreen>
      <SchoolWorkTopTabNavigator />
    </SafeScreen>
  );
};

export default SchoolWorkScreen;
