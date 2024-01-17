import React from "react";
import SignInScreen from "../Screen/SignInScreen";
import HomeScreen from "../Screen/HomeScreen";
import SignUp from "../Components/SignUp";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SessionContext } from "../Context/Context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignoutScreen from "../Screen/SignoutScreen";
import TodoListsScreen from "../Screen/TodoListsScreen";
import TodoListNavigator from "./TodoListNavigator";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <SessionContext.Consumer>
      {([session, setSession]) => {
        return (
          <NavigationContainer>
            {session == null ? (
              <Tab.Navigator>
                <Tab.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false, tabBarStyle: { display: 'none' } }}></Tab.Screen>
                <Tab.Screen name="SignUp" component={SignUp} options={{ headerShown: false, tabBarStyle: { display: 'none' } }}></Tab.Screen>
              </Tab.Navigator>
            ) : (
              <Tab.Navigator initialRoute="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, tabBarStyle: { display: 'none' } }}  ></Stack.Screen>
                <Stack.Screen
                  name="Todolists"
                  component={TodoListNavigator}
                  options={{ headerShown: false, tabBarStyle: { display: 'none' } }}
                ></Stack.Screen>
                <Stack.Screen
                  name="Signout"
                  component={SignoutScreen} options={{ headerShown: false, tabBarStyle: { display: 'none' } }}
                ></Stack.Screen>
              </Tab.Navigator>
            )}
          </NavigationContainer>
        );
      }}
    </SessionContext.Consumer>
  );
}
