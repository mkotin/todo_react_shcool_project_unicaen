import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  StyleSheet,
  FlatList,
} from "react-native";
import { getTodoLists, deleteTodoList, createTodoList } from "../utils/api";
import { SessionContext, TodoListsContext } from "../Context/Context";
import TodoList from "../Components/TodoList";
import { Button } from "react-native";
import Navbar from "../Components/Navbar";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

export default function TodoListsScreen({ navigation, route }) {
  const [session, setSession] = useContext(SessionContext);
  const [todoLists, setTodoLists] = useContext(TodoListsContext);
  const [list, setList] = useState([]);
  const [todoList, setTodoList] = useState("");
  const [error, setError] = useState("");

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      // Mettre ici le code de rafraîchissement du composant
      console.log('TodoListsScreen est maintenant en focus et doit être rafraîchi');
    }
  }, [isFocused]);

  useEffect(() => {
    retrieveTodoList();
  }, []);

  

  function retrieveTodoList() {
    getTodoLists(session.username, session.token)
      .then((res) => {
        setTodoLists(res);
        setList(res);
      })
      .catch((err) => console.log(err.message));
  }

  function onDeleteTodoList(id) {
    //delete the item and update the list
    deleteTodoList(id, session.token)
      .then((res) => {
        retrieveTodoList();
      })
      .catch((err) => console.log(err.message));
  }

  function onCreateTodoList() {
    if (todoList.length == 0) {
      setError("Veuillez mettre un titre valide!");
    } else {
      setError("");
      createTodoList(session.username, todoList, session.token)
        .then((res) => {
          retrieveTodoList();
          setTodoList("");
          setError("");
        })
        .catch((err) => console.log(err.message));
    }
  }

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <Navbar navigation={navigation}/>
      <View style={styles.container}>
        <View style={styles.addItemContainer}>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              value={todoList}
              placeholder="Entrer une nouvelle liste"
              onChangeText={(value) => {
                setTodoList(value);
              }}
            />
            <Button title="AJOUTER" style={styles.buttonAdd} onPress={onCreateTodoList} />
          </View>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>

        <View style={styles.descriptionContainer}>
          {list != [] ? (
            <FlatList
              style={{ paddingLeft: 10 }}
              data={todoLists}
              horizontal={true}
              contentContainerStyle={styles.listContents}
              renderItem={({ item }) => (
                <TodoList
                  todoList={item}
                  onDeleteTodoList={onDeleteTodoList}
                  navigationProp={navigation}
                />
              )}
            />
          ) : (
            <Text style={styles.description}>Liste de tâches vide</Text>
          )}
        </View>
      </View>
    </ImageBackground>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },

  descriptionContainer: {
    display: "flex",
  },

  description: {
    fontSize: 20,
  },

  addItemContainer: {
    padding: 30,
    width: "100%",


  },

  inputGroup: {
    width: "100%",
    flexDirection: "row",

  },

  input: {
    flex:0.8,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "white",
    marginRight: 5
    
  },


  listContents: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },

  buttonAdd: {
  }
});
