import * as React from 'react';
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Text } from "react-native-paper";
import * as authActions from "../store/actions/AuthAction";
import BackNav from "../../../navigations/BackNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RoutToLogin from "../../../components/UI/RoutToLogin";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import Colors from '../../../constants/Colors';
import { StyleSheet, View } from 'react-native';

const LogoutScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  React.useEffect(()=>{
    const getData =async () => {
      let userToken = await AsyncStorage.getItem("userToken");
      if (userToken && userToken != undefined) {
        userToken = userToken.replace(/"/g, "");
        const response = await fetch(
          "https://mrep.marvel-inter.com/api/users/logout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        const respData = await response.json();
      } 
      await AsyncStorage.removeItem("userToken");
      let fcmtoken = await AsyncStorage.getItem('fcmtoken');
      AsyncStorage.clear();
      await AsyncStorage.setItem('fcmtoken', fcmtoken);
      dispatch({ type: authActions.LOGIN, userToken: "" });
      props.navigation.reset({
        index:0,
        routes:[
          {
            name:"AuthNav"
          }
        ]
      })
      // navigation.dispatch(StackActions.popToTop());
    }
    getData()

    RoutToLogin({type:'server', 'error':{message: "Unauthenticated."}}, props)
    return ()=>{}
  }, [dispatch]);


  return (
    // <BackNav navigation={props.navigation}>
      <View style={styles.screen}>
        <ActivityIndicator animating={true} color={"#666"} />
        <Text style={{ color: "#888" }}>Logging Out...</Text>
      </View>
    // </BackNav>
  );
};
const styles = StyleSheet.create({
  screen:{
    flex:1 , 
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center"
  }
})

export default LogoutScreen;
