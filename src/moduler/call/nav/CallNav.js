import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CallTabNav from './CallTabNav';
import CreateCallScreen from '../screens/CreateCallScreen';
import IndexCallScreen from '../screens/IndexCallScreen';
import ViewCallScreen from '../screens/ViewCallScreen';
import { create } from '../../../store/actions/action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();


export const CallNav = (props) => {
    return (
        <Stack.Navigator initialRouteName="CallTabNav">
          <Stack.Screen name='CallTabNav' component={CallTabNav} options={{ title:'Calls' }}/>
          <Stack.Screen name='IndexCallScreen' component={IndexCallScreen} options={{ title:'Calls List' }}/>
          <Stack.Screen name='CreateCallScreen'  component={CreateCallScreen} options={{ title:'Call Add' }}/>
          <Stack.Screen name='ViewCallScreen' component={ViewCallScreen} options={{ title:'Call View ' }}/>
        </Stack.Navigator>
    );
}

export default CallNav;