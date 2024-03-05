import type { StackScreenProps } from '@react-navigation/stack';

export type ApplicationStackParamList = {
	Startup: undefined;
	Example: undefined;
	LandingScreen:undefined;
	LoginScreen:undefined;
	AuthorizedStack:undefined;
	UnAuthorizedStack:undefined;
};

export type ApplicationScreenProps =
	StackScreenProps<ApplicationStackParamList>;
