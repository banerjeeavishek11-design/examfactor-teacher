import React, { useEffect } from 'react';
import { SafeScreen } from '@/components/template';
import ReportsTopTabNavigator from '@/navigators/ReportsTopTabNavigator';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

const ReportsScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'InsightsTab' }],
        })
      );
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeScreen>
      <ReportsTopTabNavigator />
    </SafeScreen>
  );
};

export default ReportsScreen;
