import * as React from "react";
import  { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Colors from "../constants/Colors";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Ionicons  from 'react-native-vector-icons/Ionicons';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
// import { Appbar, Badge } from "react-native-paper";
import IconBadge from "../components/UI/IconBadge";
import { context } from "../context/AppContext";
import { useContext } from "react";
import { api } from "../store/actions/action";
import { useDispatch } from "react-redux";

const BackNav = (props) => {
  const myContext = useContext(context);
  const contextState = myContext.contextState;
  const dispatch = useDispatch()
  const userToken = myContext.userToken

  useEffect(()=>{
    const getData = async ()=>{
      if(myContext.contextState.unRead_notif_num === ''){
        
        const response = await fetch(
          "https://mrep.marvel-inter.com/api/notifsnum",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: userToken,
            },
          }
        );
  
        const respData = await response.json();
        if (respData.status == 1) {
          myContext.dipatchContextState({type:'reset_notif_num', value: respData.data.unRead_notif_num})
        }
      }
    }
    getData()
    return ()=>{}
  }, [userToken]);

  const NotificationOnPress = async () => {
    // Reset Notification Counter to Zero 0
    myContext.dipatchContextState({type:'reset_notif_num', value: 0});
    // await dispatch(
    //   api("notifseen", "POST", false, myContext.userToken, "notifseen")
    // );
    props.navigation.navigate("notifications");
  } 

  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      headerLeft: () => {
        if(props.noBackBtn) {
          return <></>
        }
        return (
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ flexDirection: "row", marginLeft: 20, marginRight: 40 }}
          >
            <Ionicons
              name="arrow-back"
              size={30}
              color="white"
              onPress={props.navigation.goBack}
            />
          </TouchableOpacity>
        );
      },

      headerRight: () => {
        return (
          <View style={{ flexDirection: "row" ,  alignItems: "center", alignContent: "center", justifyContent: "center" }}>
            {props.HeaderButton}

            <IconBadge value={contextState.unRead_notif_num} onPress={() => { NotificationOnPress() }} icon={() => {return <MaterialIcons name="notifications-none" size={24} color="#fff" /> }}  />

            <TouchableOpacity style={{ flexDirection: "row", marginRight: 10, alignItems: "center", alignContent: "center", justifyContent: "center" }}>
              <Ionicons
                name="ios-menu-sharp"
                size={24}
                color="white"
                onPress={props.navigation.toggleDrawer}
              />
            </TouchableOpacity>
          </View>
        );
      },
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#fff",
        fontFamily: "Roboto-Bold",
      },
      headerStyle: {
        backgroundColor: Colors.primary,
      },
    });
    if (props.title) {

      props.navigation.setOptions({ title: props.title.slice(0, 15) + "..." });
    }
    return () => { }
  }, [props]);

  return props.children;
};

const styles = StyleSheet.create({});

export default BackNav;
