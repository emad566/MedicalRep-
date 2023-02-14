import * as React from 'react';
import  { useState, useContext, useEffect, useReducer } from "react";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";
import BackNav from "../../../navigations/BackNav";
import { AddNewPlane } from "../components/AddNewPlan";


import { useDispatch, useSelector } from "react-redux";
import { api, store, _delete } from "../../../store/actions/action";
import { context } from "./../../../context/AppContext";
import PlaneItem from "../components/PlaneItem";
import {
  initialValue,
  palnReducer,
  SERVER_DATA,
} from "../planeReducer";
import { Snackbar, Text } from "react-native-paper";
import RoutToLogin from "../../../components/UI/RoutToLogin";


const IndexPlanScreen = (props) => {
  const [planState, dispatchPlanState] = useReducer(palnReducer, initialValue);
  const [loading , setLoading] = useState(true)
  const myContext = useContext(context);
  const data = useSelector((state) => state.reducer.API['planData']);
  const permissions = myContext.Auth_permission
  useEffect(()=>{
    const getData =() => {
      if (data && data.length != 0) {
        dispatchPlanState({
          type: SERVER_DATA,
          data: data,
        });
      }
    }
    getData()
    return ()=>{}
  }, [data]);

  const  plane_Filter = {
    current_login: "1",
    client_id: "",
    rep_user_id: "",
    plan_date: "",
    from_date: "",
    to_date: "",
    current_day: "1",
    current_month: "1",
    by_month: {
      // year: 2020,
      // month: 5
    },
  }

  const dispatch = useDispatch();
  useEffect(()=>{
    const getData =() => {
      const getData = async () => {
        try {
          await dispatch(
            api(
              "plans/filter",
              "POST",
              plane_Filter,
              myContext.userToken,
              "planData"
            )
          );
        setLoading(false)
        } catch (error) {
          RoutToLogin(error, props);
          console.log("errors", error);
        }
      };
      getData();
  }
    getData()
    return ()=>{}
  }, [planState.plane_Filter]);

  return (
    <BackNav navigation={props.navigation}>
      <View style={styles.screen}>

      {planState.plans.length !== 0 && !loading? (
          planState.plans.map((plan, index) => {
              const current_user_Plan  = planState.selectedUser === null  &&planState.allusers===false  ?true: planState.current_login_user_id ===  plan.day_clients[0].rep.id
            return (
              <PlaneItem
                canMakeCall = {permissions.includes('Call_Create')}
                style={{marginTop:0}}
                key={plan.plan_date}
                plansThisDaty={plan}
                current_date={planState.date.current_date}
                onDeletePlane={()=>{}}
                handelEditPlane={()=>{}}
                current_user_Plan = {false}
                planState={planState}
                navigation = {props.navigation}
              />
            );
          })
        ) : (
          <PlaneItem
            noPlane={true}
            onDeletePlane={()=>{}}
            current_date={planState.selected_day}
            loadingData={loading}
          />
        )}
      </View>
    </BackNav>
  );
};

const styles = StyleSheet.create({
  screen:{
    marginBottom:20,
    // backgroundColor:"#000"
  }
});

export default IndexPlanScreen;
