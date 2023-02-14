import * as React from 'react'; 
// import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons  from 'react-native-vector-icons/SimpleLineIcons';
import ListNavItems from "../../../components/UI/ListNavItems";
import Colors from "../../../constants/Colors";
import BackNav from "../../../navigations/BackNav";
// import permissions from "../../../permissions";
import { context } from './../../../context/AppContext';
import { useContext } from 'react';

function CallTabNav(props) {
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission

  

  const Call_permission = {
        update: permissions.includes('Call_Show'),
        delete: permissions.includes('Call_Delete'),
        view: permissions.includes('Call_Edit'),
        reject: permissions.includes('Call_Reject'), 
        approve: permissions.includes('Call_approve') ,
      }

  const createCall = () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: "CreateCallScreen",
        params:{
          edit_id:false,
          permissions: Call_permission,          }
      }],
    });
  };

  const indexCall = () => {
    props.navigation.navigate("IndexCallScreen", {
      isToday:false,
      permissions: Call_permission,  
    });
  };

  const indexCallToday = () => {
    props.navigation.navigate("IndexCallScreen", {
      isToday:true,
      permissions: Call_permission,
    });
  };

  return (
    <BackNav navigation={props.navigation}>
      <ListNavItems
        screenData={[
          {
            title: "Add New Call",
            onPress: createCall,
            icon: () => {
              return (
                <SimpleLineIcons
                  name="call-out"
                  size={30}
                  color={Colors.primary}
                />
              );
            },
            show:permissions.includes('Call_Create')
          },
          {
            title: "Called List",
            onPress: indexCall,
            icon: () => {
              return (
                <MaterialIcons
                  name="format-list-bulleted"
                  size={30}
                  color={Colors.primary}
                />
              );
            },
            show:permissions.includes('Call_Index')
          },
          {
            title: "Today Calls",
            onPress: indexCallToday,
            icon: () => {
              return (
                <MaterialIcons
                  name="sync"
                  size={30}
                  color={Colors.primary}
                />
              );
            },
            show:permissions.includes('Call_Index')
          },
        ]}
      />
    </BackNav>
  );
}

export default CallTabNav;
