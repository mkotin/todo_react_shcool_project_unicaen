import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text, Button, Image } from "react-native";
import { SessionContext } from "../Context/Context";
import { signIn } from "../utils/api";
import { TouchableOpacity } from "react-native-web";
import { Link } from "@react-navigation/native";

export default function SignIn({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function onSignIn(setSession) {
    signIn(username, password)
      .then((token) => {
        let val = {
          token,
          username,
        };
        console.log(val);
        setSession(val);
        setErrorMessage("");
      })
      .catch((err) => setErrorMessage(err.message));
  }

  return (
    <SessionContext.Consumer>
      {([session, setSession]) => {
        return (
          <View style={styles.main}>
            <View style={styles.card}>
            <Image
              source={require("../assets/to-do.png")}
              style={{ height: 75, width: 75}}
            />
              <Text style={styles.header}> Se connecter </Text>
              <Text style={styles.label}> Utilisateur</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={(value) => {
                setUsername(value);
              }}
            />

            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
              style={styles.input}
              value={password}
              secureTextEntry={true}
              onChangeText={(value) => {
                setPassword(value);
              }}
            />
            {errorMessage ? (
              <Text style={styles.error}> {errorMessage}</Text>
            ) : null}
            <View style={styles.btnSubmit}>
              <Button onPress={() => onSignIn(setSession)} title="Se connecter" />
              <Text style={styles.label}>
                {" "}
                Vous ne possedez pas encore de compte ?
                <Link style={{ color: "blue" }} to={{ screen: "SignUp" }}>
                  {" "}
                  Inscrivez-vous
                </Link>
              </Text>
            </View>
            </View>
          </View>
        );
      }}
    </SessionContext.Consumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },


  main: {
    alignItems: "center",
    justifyContent: "center",
    flex:1,
    backgroundColor: "#F2F2F2"
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 10
  },
  label: {
    marginVertical: 10,
  },
  btnSubmit: {
    marginTop: 10,
  },
  error: {
    color: "red",
    marginVertical: 10,
  },

  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:70,
    marginBottom:20,
    marginLeft: 40,
    marginRight: 40,
    justifyContent:"center",
    padding:20
  },

  card: {
    width: "30%",
    height: "50%",
    backgroundColor: "white",
    paddingVertical: 30,
    paddingHorizontal: 30,
    textAlign: "center",
    borderRadius: 10,
  },

  header: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 15,
  },

  title: {
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 25,
  },


});
