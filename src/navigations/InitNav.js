import * as React from 'react';
import { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyTabNav from "./components/MyTabNav";
import AuthNav from "../moduler/auth/navs/AuthNav";
import { NavigationContainer } from "@react-navigation/native";
import messaging from '@react-native-firebase/messaging';
import { context } from '../context/AppContext';

const Stack = createNativeStackNavigator();

export const InitNav = (props) => {
  const myContext = useContext(context)
  useEffect(()=>{

    messaging().onMessage(async remoteMessage=>{
      myContext.dipatchContextState({type:'unRead_notif_num'})
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      myContext.dipatchContextState({type:'unRead_notif_num'})
    });

    return ()=>{};
  }, []);
  

  return (
    <NavigationContainer initialRouteName="AuthNav">
      <Stack.Navigator>
        <Stack.Screen
          name="AuthNav"
          component={AuthNav}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MyTabNav"
          component={MyTabNav}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
