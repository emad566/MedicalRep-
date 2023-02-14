import * as React from 'react';
// import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import ListNavItems from "../../../components/UI/ListNavItems";
import Colors from "../../../constants/Colors";
import BackNav from "../../../navigations/BackNav";
// import { FontAwesome5 } from '@expo/vector-icons';
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons  from 'react-native-vector-icons/SimpleLineIcons';
// import permissions from './../../../permissions';
import { useContext } from 'react';
import { context } from './../../../context/AppContext';



function UserTabNav(props) {
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission
  const create =  {
    title: "Add New User",
    onPress: createUser,
    icon: () => {
      return (
        <FontAwesome5
          name="user-cog"
          size={30}
          color={Colors.primary}
        />
      );
    },
  }
  // const createUsers = permissions.users.createUsers ? create  :null

  const createUser = () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: "CreateUserScreen",
        params:{
          edit_user_id:false
        }
      }],
    });
  };
  const indexUser = () => {
    props.navigation.navigate("IndexUserScreen");
  };
  return (
    <BackNav navigation={props.navigation}>
      <ListNavItems
        screenData={[
          {
            title: "Add New User",
            onPress: createUser,
            icon: () => {
              return (
                <FontAwesome5
                  name="user-cog"
                  size={30}
                  color={Colors.primary}
                />
              );
            },
            show:permissions.includes("User_Create")
          },

          {
            title: "User List",
            onPress: indexUser,
            icon: () => {
              return (
                <FontAwesome5
                  name="users-cog"
                  size={30}
                  color={Colors.primary}
                />
              );
            },
            show:permissions.includes("User_Index")
          },
          
        ]}
      />
    </BackNav>
  );
}

export default UserTabNav;
