import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text, Button, Image, TouchableOpacity } from "react-native";
import { SessionContext } from "../Context/Context";

export default function Navbar({navigation}) {


  return (
    <SessionContext.Consumer>
      {([session, setSession]) => {
        return (
          <View style={styles.main}>
            <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home", {
            screen: "HomeScreen"
          });
        }} >
          <Image
              source={require("../assets/to-do.png")}
              style={{ height: 75, width: 75}}
            />
      </TouchableOpacity>
      <TouchableOpacity
            onPress={() => {
              navigation.navigate("Signout", {
            screen: "SignoutScreen"
          });
        }} >
          <Image
              source={require("../assets/avatar.png")}
              style={{ height: 50, width: 50, marginRight: 10}}
            />
        </TouchableOpacity>
    </View>
        );
      }}
    </SessionContext.Consumer>
  );
}

const styles = StyleSheet.create({
    main: {
        padding: 20,
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 1,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center"
    }
});
