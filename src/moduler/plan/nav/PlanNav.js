import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlanTabNav from './PlanTabNav';
import CreatePlanScreen from '../screens/CreatePlanScreen';
import IndexPlanScreen from '../screens/IndexPlanScreen';
import ViewPlanScreen from '../screens/ViewPlanScreen';
import CreateCallScreen from './../../call/screens/CreateCallScreen';

const Stack = createNativeStackNavigator();


export const PlanNav = (props) => {
    return (
        <Stack.Navigator initialRouteName="PlanTabNav">
          <Stack.Screen name='PlanTabNav' component={PlanTabNav} options={{ title:'Plans' }}/>
          {/* <Stack.Screen name='IndexPlanScreen' component={IndexPlanScreen} options={{ title:'Plans List' }}/> */}
          <Stack.Screen name='IndexPlanScreen' component={IndexPlanScreen} options={{ title:'Today Plan' }}/>
          <Stack.Screen name='CreatePlanScreen' component={CreatePlanScreen} options={{ title:'Plan Add' }}/>
          <Stack.Screen name='ViewPlanScreen' component={ViewPlanScreen} options={{ title:'Plan View ' }}/>
          <Stack.Screen name='CreateCallScreen' component={CreateCallScreen} options={{ title:'Call Add ' }}/>
        </Stack.Navigator>
    );
}

export default PlanNav;