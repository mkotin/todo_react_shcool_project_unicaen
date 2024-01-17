import React from "react";
import { View, StyleSheet } from "react-native";
import SignUp from "../Components/SignUp";

export default function SignInScreen(){

    return (
        <View style={styles.main}>
            <SignUp/>
        </View>

    );
    
}

const styles = StyleSheet.create({
    main: {
      flex: 1,
    }
  });
  