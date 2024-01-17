import React, { useEffect, useState, useContext } from "react";


import { View, Text, ImageBackground, StyleSheet, Image, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <View style={styles.card}>
            <Image
                  source={require("../assets/to-do.png")}
                  style={{ height: 160, width: 160}}
            />
          <Text style={styles.header}>
            Bienvenue dans l'appli TODO
          </Text>
          <Button  onPress={() => {
              navigation.navigate("Todolists", {
                screen: "Todolist",
              });
            }}  title="Continuer" />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "35%",
    height: "50%",
    backgroundColor: "white",
    paddingVertical: 30,
    paddingHorizontal: 30,
    textAlign: "center",
    borderRadius: 10,
    alignItems: "center",
  },

  header: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 30,
  },

 
});
