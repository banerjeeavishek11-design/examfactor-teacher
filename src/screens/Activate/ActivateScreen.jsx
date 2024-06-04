import React, { useEffect } from 'react';
import { SafeScreen } from '@/components/template';
import ActivateTopTabNavigator from '@/navigators/ActivateTopTabNavigator';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

const ActivateScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'ActivateHomeWorkTab' }],
        })
      );
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeScreen>
      <ActivateTopTabNavigator />
    </SafeScreen>
  );
};

export default ActivateScreen;
