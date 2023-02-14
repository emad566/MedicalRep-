import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import ClientsAutoScreen from '../screens/ClientsAutoScreen';
import MyClientsScreen from '../screens/MyClientsScreen';
import UpdateMyClientsScreen from '../screens/UpdateMyClientsScreen';


const Stack = createNativeStackNavigator();


export const ProfileNav = (props) => {
    return (
        <Stack.Navigator initialRouteName="ProfileScreen">
          <Stack.Screen name='ProfileScreen' component={ProfileScreen} options={{ title:'Profiles' }}/>
          <Stack.Screen name='ClientsAutoScreen' component={ClientsAutoScreen} options={{ title:'My List' }}/>
          <Stack.Screen name='MyClientsScreen' component={MyClientsScreen} options={{ title:'MyClients' }}/>
          <Stack.Screen name='UpdateMyClientsScreen' component={UpdateMyClientsScreen} options={{ title:'UpdateMyClients' }}/>

        </Stack.Navigator>
    );
}

export default ProfileNav;