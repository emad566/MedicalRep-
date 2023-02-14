import * as React from 'react';
import ListNavItems from "../../../components/UI/ListNavItems";
import Colors from "../../../constants/Colors";
import BackNav from "../../../navigations/BackNav";
// import { FontAwesome5 } from '@expo/vector-icons';
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import { useContext } from 'react';
import { context } from './../../../context/AppContext';

function PlanTabNav(props) {
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission

  const createPlan = () => {
    props.navigation.reset({
      index: 0,
      routes: [{ name: "CreatePlanScreen",
        params:{
          edit_id:false
        }
      }],
    });
  };
  const indexPlan = () => {
    props.navigation.navigate("IndexPlanScreen");
  };
  
  return (
    <BackNav navigation={props.navigation}>
      <ListNavItems
        screenData={[
          {
            title: "Add New Plan",
            onPress: createPlan,
            icon: () => {
              return (
                <FontAwesome5
                  name="calendar-plus"
                  size={30}
                  color={Colors.primary}
                />
              );
            },
            show:true
          },
          {
            title: "Today Plan",
            onPress: indexPlan,
            icon: () => {
              return (
                <FontAwesome5
                  name="calendar-alt"
                  size={30}
                  color={Colors.primary}
                />
              );
            },
            show:true
          },
        ]}
      />
    </BackNav>
  );
}

export default PlanTabNav;
