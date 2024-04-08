import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type MainParamsList = {
  Home: undefined;
};

export type ApplicationStackParamList = {
  Startup: undefined;
  Main: NavigatorScreenParams<MainParamsList>;
  UnauthorizedStack: NavigatorScreenParams<MainParamsList>;
  Login: NavigatorScreenParams<MainParamsList>;
  Category: NavigatorScreenParams<MainParamsList>;
  AuthorizecStack: NavigatorScreenParams<MainParamsList>;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
