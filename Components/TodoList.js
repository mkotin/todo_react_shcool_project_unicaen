import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";

import { ArrowLeftCircle, Trash2, Trash } from "react-native-feather";

export default function TodoList(props) {
  const { title, username, id } = props.todoList;

  return (
    <TouchableOpacity

        onPress={() => {
          props.navigationProp.navigate("Todolists", {
            screen: "TasksScreen",
            params: {
              id,
              title,
              username,
              onDeleteTodoList: props.onDeleteTodoList
            },
          });
        }}
      >
        <View style={styles.card}>
         <Image
              source={require("../assets/clipboard.png")}
              style={{ height: 50, width: 50}}
          />
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.header}>{title}</Text>
        </View>

      </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  card: {
    width: 350,
    height: 150,
    backgroundColor: "white",
    paddingVertical: 30,
    paddingHorizontal: 30,
    textAlign: "center",
    borderRadius: 10,
    margin: 20,
    flexDirection: "row", 
    alignItems: "center"
  },

  header: {
    fontSize: 30,
    fontWeight: "600",
    marginTop:15,
    marginLeft: 12,
    textTransform: "uppercase"
  },
});
