import * as React from 'react';
import { useContext, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import MenuItems from "./MenuItems";
import MenuItem from "./MenuItem";
import Colors from "../../constants/Colors";
import { context } from "../../context/AppContext";
// import permissions from './../../permissions';

const profileImg = require("../../assets/images/loginbg.jpeg");

const CustomDrawer = (props, { navigation }) => {
  const [menueParent, setMenueParent] = useState("");
  const [menueChild, setMenueChild] = useState("");
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission
  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: Colors.primary }}
      >
        <View style={styles.profileContainer}>
          <Image source={{ uri: (myContext.profile_path !== undefined && myContext.profile_path  ) ? myContext.profile_path : profileImg }} style={styles.profileImg} />
          <Text style={styles.userName}>{myContext?.Auth_Data?.user_role}</Text>
        </View>

        <View style={styles.menuCollaps}>
          {/* <MenuItem
            menueChild={menueChild}
            setMenueChild={setMenueChild}
            navigation={props.navigation}
            screen="ViewAreaScreen"
            title="Area"
            icon="chart-pie"
          /> */}

         {permissions.includes("Area") && <MenuItems
            menueParent={menueParent}
            setMenueParent={setMenueParent}
            name="Area"
            title="Areas"
            icon="map-marked-alt"
          >
            {permissions.includes("Area_Create") && <MenuItem
              menueChild={menueChild}
              setMenueChild={setMenueChild}
              navigation={props.navigation}
              screen="CreateAreaScreen"
              title="Create Area"
              icon="map-marked-alt"
            />}
            
           {permissions.includes("Area_Index") &&  <MenuItem
              menueChild={menueChild}
              setMenueChild={setMenueChild}
              navigation={props.navigation}
              screen="IndexAreaScreen"
              title="List Areas"
              icon="map-marked-alt"
            />}
          </MenuItems>}
          
          {permissions.includes("Line") && <MenuItems
            menueParent={menueParent}
            setMenueParent={setMenueParent}
            name="Line"
            title="Lines"
            icon="grip-lines"
          >
            {permissions.includes("Line_Create") && <MenuItem
              menueChild={menueChild}
              setMenueChild={setMenueChild}
              navigation={props.navigation}
              screen="CreateLineScreen"
              title="Create Line"
              icon="grip-lines"
            />}
            
           {permissions.includes("Line_Index") &&  <MenuItem
              menueChild={menueChild}
              setMenueChild={setMenueChild}
              navigation={props.navigation}
              screen="IndexLineScreen"
              title="List Lines"
              icon="grip-lines"
            />}
          </MenuItems>
          }
          
         {permissions.includes("Product") && <MenuItems
            menueParent={menueParent}
            setMenueParent={setMenueParent}
            name="Product"
            title="Products"
            icon="capsules"
          >
            {permissions.includes("Product_Create") && <MenuItem
              menueChild={menueChild}
              setMenueChild={setMenueChild}
              navigation={props.navigation}
              screen="CreateProductScreen"
              title="Create Product"
              icon="capsules"
            />}
            
           {permissions.includes("Product_Index") &&  <MenuItem
              menueChild={menueChild}
              setMenueChild={setMenueChild}
              navigation={props.navigation}
              screen="IndexProductScreen"
              title="List Products"
              icon="capsules"
            />}
          </MenuItems>}
          
          {permissions.includes("Specialist") && <MenuItems
            menueParent={menueParent}
            setMenueParent={setMenueParent}
            name="Specialist"
            title="Specialists"
            icon="codepen"
          >
            {permissions.includes("Specialist_Create") && <MenuItem
              menueChild={menueChild}
              setMenueChild={setMenueChild}
              navigation={props.navigation}
              screen="CreateSpecialistScreen"
              title="Create Specialist"
              icon="codepen"
            />}
            
            {permissions.includes("Specialist_Index") && <MenuItem
              menueChild={menueChild}
              setMenueChild={setMenueChild}
              navigation={props.navigation}
              screen="IndexSpecialistScreen"
              title="List Specialists"
              icon="codepen"
            />}
          </MenuItems>}
          

          {permissions.includes("Role") && <MenuItems
            menueParent={menueParent}
            setMenueParent={setMenueParent}
            name="Role"
            title="Role"
            icon="briefcase"
          >
            {permissions.includes("Role_Create") && <MenuItem
              menueChild={menueChild}
              setMenueChild={setMenueChild}
              navigation={props.navigation}
              screen="CreateRoleScreen"
              title="Create Role"
              icon="briefcase"
            />}
            
           {permissions.includes("Role_Index") &&  <MenuItem
              menueChild={menueChild}
              setMenueChild={setMenueChild}
              navigation={props.navigation}
              screen="IndexRoleScreen"
              title="List Role"
              icon="briefcase"
            />}
          </MenuItems>}
          
          {permissions.includes("Permission") && <MenuItems
            menueParent={menueParent}
            setMenueParent={setMenueParent}
            name="Permission"
            title="Permission"
            icon="key"
          >
           {permissions.includes("Permission_Create") &&  <MenuItem
              menueChild={menueChild}
              setMenueChild={setMenueChild}
              navigation={props.navigation}
              screen="CreatePermissionScreen"
              title="Create Permission"
              icon="key"
            />}
            
           {permissions.includes("Permission_Index") &&  <MenuItem
              menueChild={menueChild}
              setMenueChild={setMenueChild}
              navigation={props.navigation}
              screen="IndexPermissionScreen"
              title="List Permission"
              icon="key"
            />}
          </MenuItems>}
          
          {permissions.includes("Vacation") && <MenuItems
            menueParent={menueParent}
            setMenueParent={setMenueParent}
            name="Vacation"
            title="Vacation"
            icon="plane"
          >
           {permissions.includes("Vacation_Create") &&  <MenuItem
              menueChild={menueChild}
              setMenueChild={setMenueChild}
              navigation={props.navigation}
              screen="CreateVacationScreen"
              title="Create Vacation"
              icon="key"
            />}
            
           {permissions.includes("Vacation_Index") &&  <MenuItem
              menueChild={menueChild}
              setMenueChild={setMenueChild}
              navigation={props.navigation}
              screen="IndexVacationScreen"
              title="List Vacation"
              icon="key"
            />}
          </MenuItems>}
          
          {permissions.includes("Region") && <MenuItems
            menueParent={menueParent}
            setMenueParent={setMenueParent}
            name="Regions"
            title="Region"
            icon="map-signs"
          >
            <MenuItem
              menueChild={menueChild}
              setMenueChild={setMenueChild}
              navigation={props.navigation}
              screen="RegionScreen"
              title="Regions"
              icon="map-signs"
            />
            
          </MenuItems>}
          
          <MenuItem
            screen="LogoutScreen"
            title="Log out"
            icon="sign-out-alt"
            menueChild={menueChild}
            setMenueChild={setMenueChild}
            navigation={props.navigation}
          />
        </View>

        {/* <View style={styles.DrawerItemList}>
            <DrawerItemList {...props} />
        </View> */}
      </DrawerContentScrollView>
      <View>
        <Text>2.0.2BetaCli</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuCollaps: {
    flex: 1,
    
    backgroundColor: "#fff",
    borderTopWidth:5,
    borderColor:"white",
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  DrawerItemList: {
    backgroundColor: "white",
  },
});

export default CustomDrawer;
