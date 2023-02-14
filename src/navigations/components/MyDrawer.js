import * as React from 'react';
import {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CustomDrawer from './CustomDrawer';
import Colors from '../../constants/Colors';
import ClientNav from '../../moduler/client/navs/ClientNav';
import LogoutScreen from '../../moduler/auth/screens/LogoutScreen';
import UserNav from '../../moduler/user/nav/UserNav';
import CallNav from '../../moduler/call/nav/CallNav';
import PlanNav from '../../moduler/plan/nav/PlanNav';
import CreateAreaScreen from '../../moduler/area/screens/CreateAreaScreen';
import EditAreaScreen from '../../moduler/area/screens/EditAreaScreen';
import ViewAreaScreen from '../../moduler/area/screens/ViewAreaScreen';
import IndexAreaScreen from '../../moduler/area/screens/IndexAreaScreen';

import CreateLineScreen from '../../moduler/line/screens/CreateLineScreen';
import ViewLineScreen from '../../moduler/line/screens/ViewLineScreen';
import IndexLineScreen from '../../moduler/line/screens/IndexLineScreen';

import CreateProductScreen from '../../moduler/product/screens/CreateProductScreen';
import ViewProductScreen from '../../moduler/product/screens/ViewProductScreen';
import IndexProductScreen from '../../moduler/product/screens/IndexProductScreen';

import CreateSpecialistScreen from '../../moduler/specialist/screens/CreateSpecialistScreen';
import ViewSpecialistScreen from '../../moduler/specialist/screens/ViewSpecialistScreen';
import IndexSpecialistScreen from '../../moduler/specialist/screens/IndexSpecialistScreen';

import CreateVisitmessageScreen from '../../moduler/visitmessage/screens/CreateVisitmessageScreen';
import ViewVisitmessageScreen from '../../moduler/visitmessage/screens/ViewVisitmessageScreen';
import IndexVisitmessageScreen from '../../moduler/visitmessage/screens/IndexVisitmessageScreen';
import MapsqlScreen from '../../moduler/Mapsql/screens/MapsqlScreen';

import CreateMapsqlScreen from '../../moduler/Mapsql/screens/CreateMapsqlScreen';
import IndexMapsqlScreen from '../../moduler/Mapsql/screens/IndexMapsqlScreen';
import ViewMapsqlScreen from '../../moduler/Mapsql/screens/ViewMapsqlScreen';
import RegionScreen from '../../moduler/region/screens/RegionScreen';

import CreatePermissionScreen from '../../moduler/permission/screens/CreatePermissionScreen';
import IndexPermissionScreen from '../../moduler/permission/screens/IndexPermissionScreen';
import ViewPermissionScreen from '../../moduler/permission/screens/ViewPermissionScreen';

import CreateVacationScreen from '../../moduler/vacation/screens/CreateVacationScreen';
import IndexVacationScreen from '../../moduler/vacation/screens/IndexVacationScreen';
import ViewVacationScreen from '../../moduler/vacation/screens/ViewVacationScreen';

import CreateRoleScreen from '../../moduler/role/screens/CreateRoleScreen';
import IndexRoleScreen from '../../moduler/role/screens/IndexRoleScreen';
import ViewRoleScreen from '../../moduler/role/screens/ViewRoleScreen';
import ProfileNav from '../../moduler/auth/navs/ProfileNav';
import Notificationes from './../../moduler/notificationes/Notification';
// import { NotificationNav } from './../../moduler/notificationes/nav/NotifiNav';

const Drawer = createDrawerNavigator();

const MyDrawer = props => {
  // On Bottom tab pressed naviagte to intial screen
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('tabPress', e => {
      e.preventDefault();
      const routeName = props.route?.name;

      switch (routeName) {
        case 'ClientNav':
          props.navigation.reset({
            index: 0,
            routes: [
              {
                name: 'ClientNavScreen',
                params: {
                  title: 'ClientNavScreen',
                },
              },
            ],
          });
          // props.navigation.navigate("ClientNavScreen");
          break;
        case 'PlanNav':
          props.navigation.reset({
            index: 0,
            routes: [
              {
                name: 'PlanNavScreen',
                params: {
                  title: 'PlanNavScreen',
                },
              },
            ],
          });
          break;
        case 'UserNav':
          props.navigation.reset({
            index: 0,
            routes: [
              {
                name: 'UserNavScreen',
                params: {
                  title: 'UserNavScreen',
                },
              },
            ],
          });
          // props.navigation.navigate("UserNavScreen");
          break;
        case 'CallNav':
          props.navigation.reset({
            index: 0,
            routes: [
              {
                name: 'CallNavScreen',
                params: {
                  title: 'CallNavScreen',
                },
              },
            ],
          });
          // props.navigation.navigate("CallNavScreen");
          break;
        case 'UserNav':
          props.navigation.reset({
            index: 0,
            routes: [
              {
                name: 'UserNavScreen',
                params: {
                  title: 'UserNavScreen',
                },
              },
            ],
          });
          // props.navigation.navigate("UserNavScreen");
          break;
        case 'ProfileNav':
          props.navigation.reset({
            index: 0,
            routes: [
              {
                name: 'ProfileNavScreen',
                params: {
                  title: 'ProfileNavScreen',
                },
              },
            ],
          });
          // props.navigation.navigate("ProfileNavScreen");
          break;
      }
    });

    return unsubscribe;
  }, [props]);

  const screenName =
    props.route.name == 'MyDrawer'
      ? props.route.name
      : props.route.name + 'Screen';

  if (screenName == 'ProfileNav') {
    screenName = screenName + 'Screen';
  }

  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName={screenName}
      screenOptions={{
        headerShown: false,
        // headerShown: screenName.includes('Nav') ? false : true,
        drawerLabelStyle: {
          color: '#333',
          margin: 0,
          padding: 0,
          marginLeft: -25,
        },
        drawerActiveBackgroundColor: Colors.primary,
        drawerActiveTintColor: Colors.text,
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
          color: '#fff',
          fontFamily: 'Roboto-Bold',
        },
      }}>
      <Drawer.Screen
        name="ProfileNavScreen"
        component={ProfileNav}
        options={{title: 'Profile'}}
      />

      <Drawer.Screen
        name="ClientNavScreen"
        component={ClientNav}
        options={{title: 'Client'}}
      />

      <Drawer.Screen
        name="UserNavScreen"
        component={UserNav}
        options={{title: 'User'}}
      />

      <Drawer.Screen
        name="CallNavScreen"
        component={CallNav}
        options={{title: 'Call'}}
      />

      <Drawer.Screen
        name="PlanNavScreen"
        component={PlanNav}
        options={{title: 'Plan'}}
      />

      {/*=====================
      || Area Screens
      ========================*/}
      <Drawer.Screen
        name="CreateAreaScreen"
        component={CreateAreaScreen}
        options={{title: 'Create Area'}}
      />

      <Drawer.Screen
        name="EditAreaScreen"
        component={EditAreaScreen}
        options={{title: 'Edit Area'}}
      />

      <Drawer.Screen
        name="IndexAreaScreen"
        component={IndexAreaScreen}
        options={{title: 'List Areas'}}
      />

      <Drawer.Screen
        name="ViewAreaScreen"
        component={ViewAreaScreen}
        options={{title: 'View Area'}}
      />

      {/*=====================
      || Line Screens
      ========================*/}
      <Drawer.Screen
        name="CreateLineScreen"
        component={CreateLineScreen}
        options={{title: 'Create Line'}}
      />

      <Drawer.Screen
        name="IndexLineScreen"
        component={IndexLineScreen}
        options={{title: 'List Lines'}}
      />

      <Drawer.Screen
        name="ViewLineScreen"
        component={ViewLineScreen}
        options={{title: 'View Line'}}
      />

      {/*=====================
      || Product Screens
      ========================*/}
      <Drawer.Screen
        name="CreateProductScreen"
        component={CreateProductScreen}
        options={{title: 'Create Product'}}
      />

      <Drawer.Screen
        name="IndexProductScreen"
        component={IndexProductScreen}
        options={{title: 'List Products'}}
      />

      <Drawer.Screen
        name="ViewProductScreen"
        component={ViewProductScreen}
        options={{title: 'View Product'}}
      />

      {/*=====================
      || Specialist Screens
      ========================*/}
      <Drawer.Screen
        name="CreateSpecialistScreen"
        component={CreateSpecialistScreen}
        options={{title: 'Create Specialist'}}
      />

      <Drawer.Screen
        name="IndexSpecialistScreen"
        component={IndexSpecialistScreen}
        options={{title: 'List Specialists'}}
      />

      <Drawer.Screen
        name="ViewSpecialistScreen"
        component={ViewSpecialistScreen}
        options={{title: 'View Specialist'}}
      />

      {/*=====================
      || Visitmessage Screens
      ========================*/}
      <Drawer.Screen
        name="CreateVisitmessageScreen"
        component={CreateVisitmessageScreen}
        options={{title: 'Create Visitmessage'}}
      />

      <Drawer.Screen
        name="IndexVisitmessageScreen"
        component={IndexVisitmessageScreen}
        options={{title: 'List Visitmessages'}}
      />

      <Drawer.Screen
        name="ViewVisitmessageScreen"
        component={ViewVisitmessageScreen}
        options={{title: 'View Visitmessage'}}
      />

      {/*=====================
      || Mapsql Screens
      ========================*/}
      <Drawer.Screen
        name="MapsqlScreen"
        component={MapsqlScreen}
        options={{title: 'Mapsql'}}
      />

      <Drawer.Screen
        name="CreateMapsqlScreen"
        component={CreateMapsqlScreen}
        options={{title: 'Create Mapsql'}}
      />

      <Drawer.Screen
        name="IndexMapsqlScreen"
        component={IndexMapsqlScreen}
        options={{title: 'List Mapsqls'}}
      />

      <Drawer.Screen
        name="ViewMapsqlScreen"
        component={ViewMapsqlScreen}
        options={{title: 'View Mapsql'}}
      />

      {/*=====================
      || Role Screens
      ========================*/}
      <Drawer.Screen
        name="CreateRoleScreen"
        component={CreateRoleScreen}
        options={{title: 'Create Role'}}
      />

      <Drawer.Screen
        name="IndexRoleScreen"
        component={IndexRoleScreen}
        options={{title: 'List Roles'}}
      />

      <Drawer.Screen
        name="ViewRoleScreen"
        component={ViewRoleScreen}
        options={{title: 'View Role'}}
      />

      {/*=====================
      || Permission Screens
      ========================*/}
      <Drawer.Screen
        name="CreatePermissionScreen"
        component={CreatePermissionScreen}
        options={{title: 'Create Permission'}}
      />

      <Drawer.Screen
        name="IndexPermissionScreen"
        component={IndexPermissionScreen}
        options={{title: 'List Permissions'}}
      />

      <Drawer.Screen
        name="ViewPermissionScreen"
        component={ViewPermissionScreen}
        options={{title: 'View Permission'}}
      />
      
      {/*=====================
      || Vacation Screens
      ========================*/}
      <Drawer.Screen
        name="CreateVacationScreen"
        component={CreateVacationScreen}
        options={{title: 'Create Vacation'}}
      />

      <Drawer.Screen
        name="IndexVacationScreen"
        component={IndexVacationScreen}
        options={{title: 'List Vacations'}}
      />

      <Drawer.Screen
        name="ViewVacationScreen"
        component={ViewVacationScreen}
        options={{title: 'View Vacation'}}
      />

      {/*=====================
      || Region Screens
      ========================*/}
      <Drawer.Screen
        name="RegionScreen"
        component={RegionScreen}
        options={{title: 'Regions: Index/Add/Edit'}}
      />

      {/*====================================
      || Notification Screen
      ======================================*/}
      <Drawer.Screen
        name="notifications"
        component={Notificationes}
        options={{title: 'Notifications'}}
      />
      
      <Drawer.Screen name="LogoutScreen" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};
export default MyDrawer;
