import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LandingScreen from "./screens/LandingScreen";
import SpentCategoryScreen from "./screens/SpentCategoryScreen";
import IncomeCategoryScreen from "./screens/IncomeCategoryScreen";
import HomeScreen from "./screens/HomeScreen";
import ActivityRegisterScreen from "./screens/ActivityRegisterScreen";
import AccountsScreen from "./screens/AccountsScreen";
import CreateAlertScreen from "./screens/CreateAlertScreen";
import AlertsScreen from "./screens/AlertsScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { iconsNavigationBar } from "./utils/constants";
import CreateAccountScreen from "./screens/CreateAccountScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ActivityRegister"
        component={ActivityRegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AlertsScreen"
        component={AlertsScreen}
        options={{ headerShown: true, title: "Alertas" }}
      />
      <Stack.Screen
        name="CreateAlertScreen"
        component={CreateAlertScreen}
        options={{ headerShown: true, title: "Crear Alerta" }}
      />
    </Stack.Navigator>
  );
}

function CategoriesStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="SpentCategoriesScreen">
      <Stack.Screen
        name="SpentCategoriesScreen"
        component={SpentCategoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IncomeCategoriesScreen"
        component={IncomeCategoryScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AccountsStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="AccountsScreen">
      <Stack.Screen
        name="AccountsScreen"
        component={AccountsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateAccountsScreen"
        component={CreateAccountScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
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
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingScreen">
        <Stack.Screen
          name="LandingScreen"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainApp"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
