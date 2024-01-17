import React, { useEffect, useState, useContext } from "react";
import { TouchableOpacity } from "react-native-web";

import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  Button,
  FlatList,
  ScrollView,
  Dimensions
} from "react-native";
import TodoItem from "../Components/TodoItem";
import { SessionContext } from "../Context/Context";
import { deleteTodoList, getTodoLists, getTodos, deleteTodo, updateTodo, createTodo } from "../utils/api";
import Navbar from "../Components/Navbar";
import { ArrowLeftCircle, Trash2, Trash } from "react-native-feather";
import TodoListsScreen from "./TodoListsScreen";
import * as Progress from 'react-native-progress';

export default function TasksScreen({ route, navigation }) {
  const [session, setSession] = useContext(SessionContext);

  const { id, title, username, onDeleteTodoList } = route.params;
  const [todoData, setTodoData] = useState([]);
  const [tmpAllTodoData, settmpAllTodoData] = useState(todoData);
  const [todoItem, setTodoItem] = useState("");
  const [error, setError] = useState("");
  const [countPercent, setCountPercent] = useState(0);
  const [count, setCount] = useState(0);
  const [countCompleted, setCountCompleted] = useState(0);

  useEffect(() => {
    retrieveTodos();
  }, []);


  //Mettre à jour le nombre de tâches réalisées
  useEffect(() => {
    setCountCompleted(todoData.filter((todo) => todo.done).length);
}, [todoData]);


 

  function onCreateTodo() {
    if (todoItem.length == 0) {
      setError("Veuillez mettre un titre valide!");
    } else {
      createTodo(todoItem, id, session.token)
        .then((todoItem) => {
          const newTodoItems = [...todoData, todoItem];
                    setTodoData(newTodoItems);
                    setCountPercent((newTodoItems.filter((item) => item.done).length / newTodoItems.length) * 100);
                    
          retrieveTodos();
          setTodoItem("");
          setError("");
        })
        .catch((err) => console.log(err.message));
    }
  }

  function onUpdateTodoItem(id, state, content) {
    updateTodo(id, state, session.token, content)
      .then((res) => {
        retrieveTodos();
      })
      .catch((err) => console.log(err.message));
  }

  function onDeleteTodo(id) {
    deleteTodo(id, session.token)
      .then((res) => {

        const newTodoItems = todoData.filter((item) => item.id !== id);
                setTodoData(newTodoItems);
                setCountPercent((newTodoItems.filter((item) => item.done).length / newTodoItems.length) * 100);

        retrieveTodos();
        setTodoItem("");
      })
      .catch((err) => console.log(err.message));
  }

  function retrieveTodos() {
    getTodos(id, session.token)
        .then((res) => {
            setTodoData(res);
            settmpAllTodoData(res);
            const completedTasks = res.filter((item) => item.done).length;
            setCount(res.length)
            setCountCompleted(completedTasks);
            setCountPercent((completedTasks / res.length) * 100);
        })
        .catch((err) => console.log(err.message));
}


  function onCheckNone() {
    let cpy = [...todoData];
    cpy.forEach((item) => {
      onUpdateTodoItem(item.id, false, item.content);
    });
  }

  function onCheckAll() {
    let cpy = [...todoData];
    cpy.forEach((item) => {
      onUpdateTodoItem(item.id, true, item.content);
    });
  }

  function showOngoing() {
    let cpy = [...tmpAllTodoData];
    cpy = cpy.filter((item) => !item.done);
    setTodoData(cpy);
  }

  function showChecked() {
    let cpy = [...tmpAllTodoData];
    cpy = cpy.filter((item) => item.done);

    setTodoData(cpy);
  }

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <Navbar navigation={navigation}/>
      <View style={styles.container}>

        <ScrollView style={styles.card}>
          <View style={styles.head}>
            <TouchableOpacity
            onPress={() => {
              navigation.navigate("Todolists", {
                screen: "Todolist",
              });
            }}>
              <ArrowLeftCircle stroke="black" fill="#fff" width={32} height={32} />
            </TouchableOpacity>
            <Text style={styles.header}>{title}</Text>
            <TouchableOpacity
              onPress={() => {onDeleteTodoList(id);  navigation.navigate("Todolists", {
                screen: "Todolist",
              });}}>
              <Trash2 stroke="red" fill="#fff" width={25} height={25} />
            </TouchableOpacity>
          </View>
          <View>
          <View style={styles.progress}>
            <View style={{ ...styles.bar, width: `${countPercent}%` }}>
              <Text style={styles.percent}>{Math.round(countPercent)}%</Text>
          </View>
          </View>
          </View>
        
            {/* <View style={styles.progressBar}>
                <View style={[styles.progressBarStyle, { width: `${countPercent}%`}]}>
                    <Text style={styles.progressBarText}>
                        {`${countPercent}% `}
                    </Text>
                </View>
            </View> */}
        <View styles={styles.itemList}>
          <View style={styles.actionOptionsContainer}>
            
            <View style={styles.actionContainer}>
              <View style={styles.btnOption}>
                  <Button title="Tout cocher" onPress={onCheckAll} />
              </View>
              <View style={styles.btnOption}>
                  <Button title="Tout décocher" onPress={onCheckNone} />
              </View>
              <View style={styles.btnOption}>
                <Button title={"Afficher tout(" + count + ")"} onPress={retrieveTodos} />
              </View>
              <View style={styles.btnOption}>
                <Button title={"Afficher non fait(" + (count-countCompleted) + ")"} onPress={showOngoing} />
              </View>
              <View style={styles.btnOption}>
                <Button title={"Afficher fait(" + countCompleted + ")"} onPress={showChecked} />
              </View>
            </View>

          </View>

          <View style={styles.addItemContainer}>
            <TextInput
                style={styles.input}
                value={todoItem}
                placeholder = "Ajouter une nouvelle tâche" 
                onChangeText={(value) => {
                  setTodoItem(value);
                }}
              />
            <View style={styles.btnAdd}>
                  <Button title="Ajouter" onPress={onCreateTodo} />
            </View>
            <Text style={{ color: "red", marginVertical: 10 }}>{error}</Text>
          </View>

          <View style={styles.listContainer}>
            {todoData != [] ? (
              <FlatList
                data={todoData}
                renderItem={({ item }) => (
                  <TodoItem
                    item={item}
                    onDeleteTodo={onDeleteTodo}
                    onUpdateTodoItem={onUpdateTodoItem}
                    retrieveTodos={retrieveTodos}
                    navigation={navigation}
                  />
                )}
              />
            ) : (
              <Text style={styles.description}>Liste de tâches vide</Text>
            )}
          </View>
          
        </View>
        
        </ScrollView>
      </View>
    </ImageBackground>
      
  );
}

const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "vertical"
  },

  head: {
    flexDirection: "row",
    alignItems: "center"
  },

  descriptionContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  description: {
    fontSize: 20,
  },

  addItemContainer: {
    marginTop: 50,
    flexDirection: "row",
    display: "flex",
  },

  input: {
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginRight: 5,
    flex: 1
  },

  optionContainer: {
    flexDirection: "row",
    flex: 0.2
  },

  actionContainer: {
    flexDirection: "row",
  },

  btnOption: {
    marginHorizontal: 5,
  },

  btnAdd: {
    marginHorizontal: 5,
    marginTop: 2.5
  },

  buttons1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
        width: "60%",
    },

    buttons2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
        width: "60%",
    },
    card: {
      width: "50%",
      minHeight: screenHeight * 0.8,
      backgroundColor: "white",
      paddingVertical: 30,
      paddingHorizontal: 30,
      textAlign: "center",
      borderRadius: 10,
      marginTop: 60,
      marginBottom: 60
    },

    header: {
      fontSize: 30,
      fontWeight: "600",
      marginVertical: 15,
      marginLeft:20,
      marginRight: 10
    },

    actionOptionsContainer: {
      flexDirection: "row",
      marginTop: 25,
    },

    itemList: {
      display: "flex",
    justifyContent: "center",
    alignItems: "center",
      borderWidth: 1000,
      borderColor: "red"
    },
    progress: {
      marginTop: 20,
      marginBottom: 20,
      width: '90%',
      height: 30,
      overflow: 'hidden',
      backgroundColor: '#e5e5e5',
      borderRadius: 6,
    },
    bar: {
      position: 'relative',
      height: '100%',
      backgroundColor: 'cornflowerblue',
    },
    percent: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
      margin: 0,
      fontFamily: 'tahoma,arial,helvetica',
      fontSize: 12,
      color: 'white',
    },

});
