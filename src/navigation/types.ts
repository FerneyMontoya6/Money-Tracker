import { NavigatorScreenParams } from "@react-navigation/native";

export type HomeStackParamList = {
  HomeScreen: undefined;
  ActivityRegister: undefined;
  AlertsScreen: undefined;
  CreateAlertScreen: undefined;
};

export type CategoriesStackParamList = {
  LandingScreen: undefined;
  SpentCategoriesScreen: undefined;
  IncomeCategoriesScreen: undefined;
};

export type AccountsStackParamList = {
  AccountsScreen: undefined;
  CreateAccountsScreen: undefined;
};

export type RootTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  CategoriesTab: NavigatorScreenParams<CategoriesStackParamList>;
  AccountsTab: NavigatorScreenParams<AccountsStackParamList>;
};
