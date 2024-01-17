import React, {useContext } from "react";
import { View, Text, ImageBackground, StyleSheet, Image, Button, TouchableOpacity } from "react-native";
import { SessionContext} from "../Context/Context";
import Navbar from "../Components/Navbar";


export default function SignoutScreen({navigation}){

    const [session, setSession] = useContext(SessionContext);

    function disconnect(){
        setSession(null);
        navigation.push("signin");
    }
    
    return (
        <SessionContext.Consumer>
      {([session, setSession]) => {
        return (
         <ImageBackground
      source={require("../assets/bg.jpg")}
      style={{ width: "100%", height: "100%" }}>
        <Navbar navigation={navigation}/>
      <View style={styles.container}>
        <View style={styles.card}>
            <Image
                  source={require("../assets/avatar.png")}
                  style={{ height: 160, width: 160}}
            />
          <Text style={styles.header}>
            {session.username}
          </Text>
          <View style={styles.btnContainer}>
            <Button title="Déconnexion" onPress={disconnect} />
            <TouchableOpacity style={styles.blackBtn} onPress={() =>navigation.goBack()}>
                <Text style={{color: "white", fontSize: 14, fontWeight: 600}} >Retour</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </ImageBackground>
        );
      }}
    </SessionContext.Consumer>
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
      fontWeight: "400",
      marginVertical: 30,
    },

    btnContainer: {
        flexDirection: "row",
    },

    blackBtn: {
        backgroundColor: "#0070D0",
        marginLeft: 10,
        alignItems: 'center',
        padding: 10,
        borderRadius: 2,
    }
  
   
  });