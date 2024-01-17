import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation/Navigation';
import { SessionContext, TodoListsContext } from './Context/Context';
import { StrictMode, useState } from 'react';


export default function App() {
  const [session, setSession] = useState(null);
  const [todoLists, setTodoLists] = useState(null);
  console.log('token',session);
  return (
    <StrictMode>
      <SessionContext.Provider value={[session, setSession]}>
        <TodoListsContext.Provider value={[todoLists, setTodoLists]}>
         <Navigation />
        </TodoListsContext.Provider>
      </SessionContext.Provider>
    </StrictMode>
  );
}



/*
  session :{
    token : String,
    username :  String
  }
*/