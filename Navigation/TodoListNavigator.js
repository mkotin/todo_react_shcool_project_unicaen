import {React, useEffect} from "react";
import SignInScreen from "../Screen/SignInScreen";
import HomeScreen from "../Screen/HomeScreen";
import SignUp from "../Components/SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoListsScreen from "../Screen/TodoListsScreen";
import TasksScreen from "../Screen/TasksScreen";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
const Stack = createNativeStackNavigator();

export default function TodoListNavigator() {

  return (
    <Stack.Navigator initialRoute="Todolist">
      <Stack.Screen
        name="Todolist"
        component={TodoListsScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>

      <Stack.Screen
        name="TasksScreen"
        component={TasksScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
