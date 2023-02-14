
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const RoutToLogin = (err, props) => {
    if(err.type == "server" && err.error.message == "Unauthenticated."){
        AsyncStorage.setItem("userToken", "");
        props.navigation.navigate("LoginScreen", {checkVersion:true});
    }
}


export default RoutToLogin;