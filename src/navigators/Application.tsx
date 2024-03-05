import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import {Example, LandingScreen, LoginScreen, Startup } from '@/screens';
import { useTheme } from '@/theme';

import type { ApplicationStackParamList } from '@/types/navigation';
import UnAuthorizedStack from './UnAuthorizedStack';
import AuthorizedStack from './AuthorizedStack';



const Stack = createStackNavigator<ApplicationStackParamList>();

	interface Styles {
		container: StyleProp<ViewStyle>;
	  }

function ApplicationNavigator() {
	const { variant, navigationTheme,layout,backgrounds } = useTheme();



	return (
		<NavigationContainer theme={navigationTheme}>
			 {/* <View style={styles.container}> */}
			<Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Startup" component={Startup} />
				<Stack.Screen name="Example" component={Example} />
				<Stack.Screen name="LandingScreen" component={LandingScreen} />
				<Stack.Screen name="LoginScreen" component={LoginScreen} />
				<Stack.Screen name="AuthorizedStack" component={AuthorizedStack} />
				<Stack.Screen name="UnAuthorizedStack" component={UnAuthorizedStack} />
			</Stack.Navigator>
			{/* </View> */}
		</NavigationContainer>
	);
}

const styles: Styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: "#09070E",
	},
  });

export default ApplicationNavigator;
