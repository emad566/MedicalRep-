import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserTabNav from './UserTabNav';
import CreateUserScreen from '../screens/CreateUserScreen';
import IndexUserScreen from '../screens/IndexUserScreen';
import ViewUserScreen from '../screens/ViewUserScreen';

const Stack = createNativeStackNavigator();


export const UserNav = (props) => {
    return (
        <Stack.Navigator initialRouteName="UserTabNav">
          <Stack.Screen name='UserTabNav'   component={UserTabNav} options={{ title:'Users' }}/>
          <Stack.Screen name='IndexUserScreen' component={IndexUserScreen} options={{ title:'Users List' }}/>
          <Stack.Screen name='CreateUserScreen' component={CreateUserScreen} options={{ title:'User Add' }}/>
          <Stack.Screen name='ViewUserScreen' component={ViewUserScreen} options={{ title:'User View ' }}/>
        </Stack.Navigator>
    );
}

export default UserNav;