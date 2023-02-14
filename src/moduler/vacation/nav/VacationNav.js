import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VacationTabNav from './VacationTabNav';
import CreateVacationScreen from '../screens/CreateVacationScreen';
import IndexVacationScreen from '../screens/IndexVacationScreen';
import ViewVacationScreen from '../screens/ViewVacationScreen';

const Stack = createNativeStackNavigator();


export const VacationNav = (props) => {
    return (
        <Stack.Navigator initialRouteName="VacationTabNav">
          <Stack.Screen name='VacationTabNav'   component={VacationTabNav} options={{ title:'Vacations' }}/>
          <Stack.Screen name='IndexVacationScreen' component={IndexVacationScreen} options={{ title:'Vacations List' }}/>
          <Stack.Screen name='CreateVacationScreen' component={CreateVacationScreen} options={{ title:'Vacation Add' }}/>
          <Stack.Screen name='ViewVacationScreen' component={ViewVacationScreen} options={{ title:'Vacation View ' }}/>
        </Stack.Navigator>
    );
}

export default VacationNav;