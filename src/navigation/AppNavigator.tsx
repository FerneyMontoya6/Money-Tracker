import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  RootTabParamList,
  HomeStackParamList,
  CategoriesStackParamList,
  AccountsStackParamList,
} from "./types";
import LandingScreen from "../screens/LandingScreen";
import SpentCategoryScreen from "../screens/SpentCategoryScreen";
import IncomeCategoryScreen from "../screens/IncomeCategoryScreen";
import HomeScreen from "../screens/HomeScreen";
import ActivityRegisterScreen from "../screens/ActivityRegisterScreen";
import AccountsScreen from "../screens/AccountsScreen";
import CreateAlertScreen from "../screens/CreateAlertScreen";
import AlertsScreen from "../screens/AlertsScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import { iconsNavigationBar } from "../utils/constants";

const Tab = createBottomTabNavigator<RootTabParamList>();

function HomeStackNavigator() {
  const HomeStack = createStackNavigator<HomeStackParamList>();
  return (
    <HomeStack.Navigator initialRouteName="HomeScreen">
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ActivityRegister"
        component={ActivityRegisterScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="AlertsScreen"
        component={AlertsScreen}
        options={{ headerShown: true, title: "Alertas" }}
      />
      <HomeStack.Screen
        name="CreateAlertScreen"
        component={CreateAlertScreen}
        options={{ headerShown: true, title: "Crear Alerta" }}
      />
    </HomeStack.Navigator>
  );
}

function CategoriesStackNavigator() {
  const CategoriesStack = createStackNavigator<CategoriesStackParamList>();
  return (
    <CategoriesStack.Navigator initialRouteName="LandingScreen">
      <CategoriesStack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{ headerShown: false }}
      />
      <CategoriesStack.Screen
        name="SpentCategoriesScreen"
        component={SpentCategoryScreen}
        options={{ headerShown: false }}
      />
      <CategoriesStack.Screen
        name="IncomeCategoriesScreen"
        component={IncomeCategoryScreen}
        options={{ headerShown: false }}
      />
    </CategoriesStack.Navigator>
  );
}

function AccountsStackNavigator() {
  const AccountsStack = createStackNavigator<AccountsStackParamList>();
  return (
    <AccountsStack.Navigator initialRouteName="AccountsScreen">
      <AccountsStack.Screen
        name="AccountsScreen"
        component={AccountsScreen}
        options={{ headerShown: false }}
      />
      <AccountsStack.Screen
        name="CreateAccountsScreen"
        component={CreateAccountScreen}
        options={{ headerShown: false }}
      />
    </AccountsStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const iconName = iconsNavigationBar[route.name];
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopColor: "#ccc",
          },
        })}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStackNavigator}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="CategoriesTab"
          component={CategoriesStackNavigator}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="AccountsTab"
          component={AccountsStackNavigator}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
