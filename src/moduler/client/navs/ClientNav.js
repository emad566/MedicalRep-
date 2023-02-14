import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClientTabNav from './ClientTabNav';
import CreateClientScreen from '../screens/CreateClientScreen';
import IndexClientScreen from '../screens/IndexClientScreen';
import ViewClientScreen from '../screens/ViewClientScreen';

const Stack = createNativeStackNavigator();


export const ClientNav = (props) => {
    return (
        <Stack.Navigator initialRouteName="ClientTabNav">
          <Stack.Screen name='ClientTabNav' component={ClientTabNav} options={{ title:'Clients' }}/>
          <Stack.Screen name='IndexClientScreen' component={IndexClientScreen} options={{ title:'Clients List' }}/>
          <Stack.Screen name='CreateClientScreen' component={CreateClientScreen} options={{ title:'Client Add' }}/>
          <Stack.Screen name='ViewClientScreen' component={ViewClientScreen} options={{ title:'Client View ' }}/>
        </Stack.Navigator>
    );
}

export default ClientNav;