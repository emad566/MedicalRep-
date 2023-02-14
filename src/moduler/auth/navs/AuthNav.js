import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import CreateCallScreen from '../../call/screens/CreateCallScreen';
const Stack = createNativeStackNavigator();

const AuthNav = (props) => {
    return (
        <Stack.Navigator >
          {/* <Stack.Screen  name='CreateCallScreen' component={CreateCallScreen} /> */}
          <Stack.Screen  name='LoginScreen' component={LoginScreen} options={{ headerShown:false }} />
          <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown:false }} />
        </Stack.Navigator>
    );
}

export default AuthNav;

