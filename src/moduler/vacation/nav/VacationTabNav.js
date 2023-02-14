import * as React from 'react';
import ListNavItems from "../../../components/UI/ListNavItems";
import Colors from "../../../constants/Colors";
import BackNav from "../../../navigations/BackNav";
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import { useContext } from 'react';
import { context } from '../../../context/AppContext';



function VacationTabNav(props) {
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission
  const create =  {
    title: "Add New Vacation",
    onPress: createVacation,
    icon: () => {
      return (
        <FontAwesome5
          name="Vacation-cog"
          size={30}
          color={Colors.primary}
        />
      );
    },
  }

  const createVacation = () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: "CreateVacationScreen",
        params:{
          edit_Vacation_id:false
        }
      }],
    });
  };
  const indexVacation = () => {
    props.navigation.navigate("IndexVacationScreen");
  };
  return (
    <BackNav navigation={props.navigation}>
      <ListNavItems
        screenData={[
          {
            title: "Add New Vacation",
            onPress: createVacation,
            icon: () => {
              return (
                <FontAwesome5
                  name="user-cog"
                  size={30}
                  color={Colors.primary}
                />
              );
            },
            show:permissions.includes("Vacation_Create")
          },

          {
            title: "Vacation List",
            onPress: indexVacation,
            icon: () => {
              return (
                <FontAwesome5
                  name="user-cog"
                  size={30}
                  color={Colors.primary}
                />
              );
            },
            show:permissions.includes("Vacation_Index")
          },
          
        ]}
      />
    </BackNav>
  );
}

export default VacationTabNav;
