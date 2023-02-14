import * as React from 'react';
// import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons  from 'react-native-vector-icons/SimpleLineIcons';
import ListNavItems from "../../../components/UI/ListNavItems";
import Colors from "../../../constants/Colors";
import BackNav from "../../../navigations/BackNav";
// import permissions from './../../../permissions';
import { context } from './../../../context/AppContext';
import { useContext } from 'react';

function ClientTabNav(props) {
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission
  const createClient = () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: "CreateClientScreen",
        params:{
          edit_id:false
        }
      }],
    });

    props.navigation.navigate("CreateClientScreen", {
      edit_id:false
    });
  };
  
  const indexClient = () => {
 

    props.navigation.navigate("IndexClientScreen");
    props.navigation.reset({
      index: 0,
      routes: [{ name: "IndexClientScreen" }]
    });
  
  };
  
  return (
    <BackNav navigation={props.navigation}>
      <ListNavItems
        screenData={[
          {
            title: "Add New Client",
            onPress: createClient,
            icon: () => {
              return (
                <SimpleLineIcons
                  name="user-follow"
                  size={30}
                  color={Colors.primary}
                />
              );
            },
            show:permissions.includes("Client_Create")
          },
          {
            title: "Client List",
            onPress: indexClient,
            icon: () => {
              return (
                <MaterialCommunityIcons
                  name="account-group-outline"
                  size={30}
                  color={Colors.primary}
                />
              );
            },
            show:permissions.includes("Client_Index"),
          },
          
        ]}
      />
    </BackNav>
  );
}

export default ClientTabNav;
