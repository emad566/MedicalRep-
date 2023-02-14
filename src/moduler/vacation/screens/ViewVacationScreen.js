import * as React from 'react';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import  { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import BackNav from "../../../navigations/BackNav";
import PrintValue from "../../../components/PrintValue";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card } from "react-native-paper";
import NoData from "../../../components/UI/NoData";
import { ScrollView } from "react-native-gesture-handler";
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import Colors from "../../../constants/Colors";
import Loading from "../../../components/UI/Loading";
import { api, view } from "../../../store/actions/action";
import { context } from "../../../context/AppContext";
import ListItem from "../../../components/UI/ListItem";
import HeaderButton from "../../../components/UI/HeaderButton";
import { CommonActions } from "@react-navigation/native";
import RoutToLogin from "../../../components/UI/RoutToLogin";

const ViewVacationScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const myContext = useContext(context);
  const permissions = myContext.Auth_permission;

  const Vacation_Permissions = {
    view: permissions.includes('Vacation_Show'),  
    delete: permissions.includes('Vacation_Delete'), 
    update: permissions.includes('Vacation_Edit') ,
    accept: permissions.includes('Vacation_Accept'),
    reject: permissions.includes('Vacation_Reject'), 
    pending: permissions.includes('Vacation_Pending') 
  }

  let view_id = useSelector((state) => state.reducer.STORE_ID["vacations"]);
  if (props.route.params.added_id) {
    view_id = view_id;
  } else {
    view_id = props.route.params.id;
  }

  let view_data = useSelector((state) => state.reducer.VIEW["vacations"]);

  let status_id = "";
  let ico = "";
  if (view_data === undefined || (view_data && view_data.vacation.id != view_id)) {
    view_data = false;
  }else{
    view_data = view_data.vacation;

    status_id = view_data.status.id;
    ico = "calendar";
    if(status_id ===20) 
      ico = "calendar-check";
    else if (status_id ===30)
      ico =  "calendar-times";
  }

  const dispatch = useDispatch();
  const loadRefresh = useCallback(async () => {
    try {
      await dispatch(
        view(view_id, "vacations/" + view_id, "vacations", myContext.userToken)
      );
    } catch (err) {
      RoutToLogin(err, props);
    }
  }, [dispatch, setIsLoading]);

  useEffect(()=>{
    const getData =() => {
      setIsLoading(true);
      loadRefresh().then(() => {
        setIsLoading(false);
      });
    }
    getData()
    return ()=>{}
  }, [dispatch, loadRefresh]);

  const style = require("../../../constants/styles");

  /*====================================
  || on Accept or refuse
  ======================================*/
  const onSubmit = useCallback(
    async (status_id) => {
      setLoading(true);
      try {
        const data = { view_id: view_id, vacation_status_id: status_id };
        console.log("data1");
        console.log(data);
        await dispatch(
          api(`vacation/${view_id}/changestatus`, "POST", data, myContext.userToken)
        );
        console.log("data");
        console.log(data);
        await dispatch(
          view(view_id, "vacations/" + view_id, "vacations", myContext.userToken)
        );
        
      } catch (err) {
        RoutToLogin(err, props);
      }
      setLoading(false);
    },
    [onSubmit]
  );

  // console.log(view_data.status.id);
  // return(<></>)
  return (
    <BackNav
      HeaderButton={
        permissions.includes('vacation_Create') &&  <HeaderButton
          name="plus"
          onPress={() => {
            const resetAction = CommonActions.reset({
              index: 0,
              routes: [ 
                { name: "CreatevacationScreen", params: { edit_id: false } },
              ],
            });
            props.navigation.dispatch(resetAction);
          }}
        />
      }
      title={"vacation: " + props.route.params.title}
      navigation={props.navigation}
    >
      {!isLoading && !view_data && <NoData navigation={props.navigation} />}
      {(isLoading || !view_data || view_data === undefined) && <Loading noBackNav={true} navigation={props.navigation} />}

      
        <Card style={styles.screen}>
          <ListItem
            permissions={Vacation_Permissions}
            setIsLoading={setIsLoading}
            added_id={props.route.params.added_id}
            navigation={props.navigation}
            id={view_data ? view_data.id : ""}
            title={view_data ? view_data.vacation_date : ""}
            subtitle={view_data ? view_data.user.name : ""}
            leftIcon={() => {
                
                return (
                  <FontAwesome5
                    name={ico}
                    size={24}
                    color={Colors.primary}
                  />
                );
            }}
            nextDeleteScreen="IndexvacationScreen"
            ViewScreen="ViewVacationScreen"
            EditScreen="CreatevacationScreen"
            model="vacations"
            edit_path={"vacations/" + view_id + "/edit"}
            index_path={"vacations"}
            delete_path={"vacations/" + view_id}
          />

          <ScrollView style={{ paddingBottom: 200 }}>
            <PrintValue printKeyVal="User">
              {view_data ? view_data.user.name : ""}
            </PrintValue>
            <PrintValue printKeyVal="Date">
              {view_data ? view_data.vacation_date : ""}
            </PrintValue>
            <PrintValue printKeyVal="Details">
              {view_data ? view_data.vacation_details : ""}
            </PrintValue>
            <PrintValue printKeyVal="status">
              {view_data ? view_data.status.vacation_status : ""}
            </PrintValue>

            <View style={{ padding: 5 }}></View>
            {Vacation_Permissions.accept && (view_data !== undefined && status_id !== 20 ) && 
              (<Button
              loading={loading}
              color={"yellow"}
              icon={() => {
                return <FontAwesome5 name="calendar-check" size={24} color="white" />;
              }}
              mode="contained"
              onPress={() => onSubmit(20)}
            >
              Accept
            </Button>)}

            <View style={{ padding: 5 }}></View>
            {Vacation_Permissions.reject && (view_data !== undefined && status_id !== 30 ) && 
              (<Button
              loading={loading}
              color={"red"}
              icon={() => {
                return <FontAwesome5 name="calendar-times" size={24} color="white" />;
              }}
              mode="contained"
              onPress={() => onSubmit(30)}
            >
              Reject
            </Button>)}
            <View style={{ padding: 5 }}></View>
            {Vacation_Permissions.pending && (view_data !== undefined && status_id !== 10 ) && 
              (<Button
              loading={loading}
              color={"green"}
              icon={() => {
                return <FontAwesome5 name="calendar" size={24} color="white" />;
              }}
              mode="contained"
              onPress={() => onSubmit(10)}
            >
              Pending
            </Button>)}
            
            <View style={{ padding: 50 }}></View>
          </ScrollView>
        </Card>
    </BackNav>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 10,
    borderRadius: 10,
  },
  iconContainer: {
    flexDirection: "row",
  },
});

export default ViewVacationScreen;
