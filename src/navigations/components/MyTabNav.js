import  * as React from 'react';
import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import MyDrawer from "./MyDrawer";
// import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import FontAwesome5  from "react-native-vector-icons/FontAwesome5";
import Ionicons  from "react-native-vector-icons/Ionicons";

import Colors from "../../constants/Colors";
// import permissions from './../../permissions';
import { context } from './../../context/AppContext';



const Tab = createBottomTabNavigator();

const MyTabNav = (props) => {
  
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      // activeColor={Colors.text}
      activeColor={"white"}
      inactiveColor="white"
      barStyle={{ backgroundColor: Colors.primary }}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "CallNav") {
            iconName = focused ? "ios-call-outline" : "ios-call-outline";
            return <Ionicons name={iconName} size={26} color={color} />;
          } else if (route.name === "ClientNav") {
            iconName = focused ? "user-md" : "user-md";
          } else if (route.name === "UserNav") {
            iconName = focused ? "user-tie" : "user-tie";
          } else if (route.name === "PlanNav") {
            iconName = focused ? "calendar-check" : "calendar-check";
          } else if (route.name === "ProfileNav") {
            iconName = focused ? "house-user" : "house-user";
          }

          // You can return any component that you like here!
          return <FontAwesome5 name={iconName} size={26} color={color} />;
        },
        // tabBarActiveTintColor: Colors.text,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarLabelStyle: { fontSize: 14 },
        tabBarStyle: {
          height: 60,
          paddingTop: 5,
          margin: 2,
          backgroundColor: Colors.primary,
          // unmountOnBlur: true
        },
      })}
    >
      <Tab.Screen
        name="ProfileNav"
        component={MyDrawer}
        options={{ title: "Profile" }}
      />

      {permissions.includes("User") && <Tab.Screen
        name="UserNav"
        component={MyDrawer}
        options={{ title: "Users" }}
        // users={permissions.users}
      /> }
      
      
      {permissions.includes("Client") &&<Tab.Screen
        name="ClientNav"
        component={MyDrawer}
        options={{ title: "Clients" }}
      />}

      {permissions.includes("Call") && <Tab.Screen
        name="CallNav"
        component={MyDrawer}
        options={{ title: "Calls" }}
      />}

     {permissions.includes("Plan") && <Tab.Screen
        name="PlanNav"
        component={MyDrawer}
        options={{ title: "Plans" }}
      />}
    </Tab.Navigator>
  );
};

export default MyTabNav;
