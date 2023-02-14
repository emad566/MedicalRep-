import * as React from 'react';
import  { useState, useContext, useEffect, useReducer } from "react";
import { StyleSheet, View, ScrollView, FlatList } from "react-native";
import BackNav from "../../../navigations/BackNav";
import { AddNewPlane } from "../components/AddNewPlan";
import {
  ActivityIndicator,
  Caption,
  Checkbox,
  Modal,
  Portal,
  Provider,
  Snackbar,
  Text,
} from "react-native-paper";
import PlaneCalender from "./../components/Calender";
import HeaderButton from "./../../../components/UI/HeaderButton";
import { useDispatch, useSelector } from "react-redux";
import { api, store, _delete } from "../../../store/actions/action";
import { context } from "./../../../context/AppContext";
import { Dropdown } from "sharingan-rn-modal-dropdown";
import PlaneItem from "../components/PlaneItem";
import * as yup from "yup";
import {
  initialValue,
  palnReducer,
  SERVER_DATA,
  SHOW_ADD_PLAN_MODAL,
  HIED_ADD_PLAN_MODAL,
  CHANE_USER,
  ALL_USERS_PLANS,
} from "../planeReducer";
import Colors from "../../../constants/Colors";
import { ADD_PLAN_LOADING } from "./../planeReducer";
import { update } from "./../../../store/actions/action";
import Error from "../../../components/UI/Error";
import Moment from "moment";
import RoutToLogin from "../../../components/UI/RoutToLogin";
// import permissions from './../../../permissions';

const CreatePlanScreen = (props) => {
  const [planState, dispatchPlanState] = useReducer(palnReducer, initialValue);
  // const { control, handleSubmit, formState: { errors }, clearErrors, reset, setValue, getValue } = useForm({ resolver: yupResolver(schema) });
  const myContext = useContext(context);
  const permissions = myContext.Auth_permission

  const data = useSelector((state) => state.reducer.API['planData']);
  

  const current_user_plan  = planState.selectedUser===null?true: planState.current_login_user_id ===  planState.selectedUser
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


  const dispatch = useDispatch();
  useEffect(()=>{
    const getData =() => {
      const getData = async () => {
        try {
          await dispatch(
            api(
              "plans/filter",
              "POST",
              planState.plane_Filter,
              myContext.userToken,
              "planData"
            )
          );
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

  const showModal = () => {
    dispatchPlanState({
      type: SHOW_ADD_PLAN_MODAL,
    });
  };
  const hideModal = () => {
    dispatchPlanState({
      type: HIED_ADD_PLAN_MODAL,
      error:false
    });
  };

  const onSubmitData = async (inserted_date) => {
    try {
      dispatchPlanState({
        type: ADD_PLAN_LOADING,
        loading: true,
      });
      if (planState.edit_mode) {
        await dispatch(
          update(
            Moment(inserted_date.plan_date).format('YYYY-MM-DD'),
            {
              plan_date: Moment(inserted_date.plan_date).format('YYYY-MM-DD'),
              client_ids: inserted_date.client_ids,
              
            },
            "plans/" + Moment(inserted_date.plan_date).format('YYYY-MM-DD') ,
            'plans',
            myContext.userToken
          )
        );
        dispatchPlanState({
          type: ADD_PLAN_LOADING,
          loading: false,
          sucsessMsg: "Edited Sucseesfuly ",
          error: false,
        });
      } else {
        await dispatch(store(inserted_date, "plans", 'plans', myContext.userToken));
        dispatchPlanState({
          type: ADD_PLAN_LOADING,
          loading: false,
          sucsessMsg: "Added Sucseesfuly ",
        });
      }
    } catch (e) {
      RoutToLogin(e, props);
      console.log("e", e);
      if (e.type == "server") {
        dispatchPlanState({
          type: ADD_PLAN_LOADING,
          loading: false,
          error: "Request Fail !",
        });
        if (e.error.msg) {
          dispatchPlanState({
            type: ADD_PLAN_LOADING,
            error: e.error.msg,
            loading: false,
          });
        }
        if (e.error.errors) {
          dispatchPlanState({
            type: ADD_PLAN_LOADING,
            error: e.error.msg,
            loading: false,
          });
        }
      }
    }
  };

  const onDeletePlane = async (date) => {
    dispatchPlanState({
      type: ADD_PLAN_LOADING,
      loading: true,
    });
    try {
      await dispatch(_delete(date, "plans/" + date, 'plans', myContext.userToken));
      dispatchPlanState({
        type: ADD_PLAN_LOADING,
        loading: false,
        sucsessMsg: "deleted Sucseesfuly ",
      });
    } catch (e) {
      RoutToLogin(e, props);
      if (e.type == "server") {
        dispatchPlanState({
          type: ADD_PLAN_LOADING,
          loading: false,
          error: "Request Fail !",
        });
        if (e.error.msg) {
          dispatchPlanState({
            type: ADD_PLAN_LOADING,
            error: e.error.msg,
            loading: false,
          });
        }
        if (e.error.errors) {
          dispatchPlanState({
            type: ADD_PLAN_LOADING,
            error: e.error.msg,
            loading: false,
          });
        }
      }
    }
  };

  const handelEditPlane = (date, client_ids) => {
    dispatchPlanState({
      type: SHOW_ADD_PLAN_MODAL,
      date: date,
      clients: client_ids,
      edit_mode: true,
    });
  };

  return (
    <BackNav
      HeaderButton={<HeaderButton name="plus" onPress={showModal} />}
      title="Plan"
      navigation={props.navigation}
    >
      <ScrollView style={{paddingTop:5}}>
       {permissions.includes("Plan_show_All_Users_Plans") && <View style={styles.textInputContainer}>
          <Dropdown
            showLoader={planState.loading}
            // floating={true}
            enableSearch={true}
            label="Users"
            data={planState.users}
            chipType="outlined"
            value={planState.selectedUser}
            onChange={(id) => {
              dispatchPlanState({
                type: CHANE_USER,
                userId: id,
              });
            }}
            mode="outlined"
            rippleColor="red"
            primaryColor="red"
          />
          <Checkbox
            status={ planState.allusers ? "checked" :"unchecked"}
            onPress={() => {
              dispatchPlanState({
                type:ALL_USERS_PLANS
              })
            }}
          />
          <Text>All Users</Text>
        </View>}

        {planState.loading && (
          <ActivityIndicator
            animating={true}
            size={"small"}
            color={Colors.primary}
          />
        )}
        <PlaneCalender
          planState={planState}
          dispatchPlanState={dispatchPlanState}
        />
        {planState.plans.length !== 0 ? (
          planState.plans.map((plan, index) => {
              const current_user_Plan  = planState.selectedUser === null  &&planState.allusers===false  ?true: planState.current_login_user_id ===  plan.day_clients[0].rep.id
            return (
              <PlaneItem
                canMakeCall = {permissions.includes('Call_Create')}
                key={plan.plan_date}
                plansThisDaty={plan}
                current_date={planState.date.current_date}
                onDeletePlane={onDeletePlane}
                handelEditPlane={handelEditPlane}
                current_user_Plan = {current_user_Plan}
                planState={planState}
                navigation = {props.navigation}
                // loadingData = {true}
              />
            );
          })
        ) : planState.loading ? (
          <PlaneItem
            noPlane={true}
            onDeletePlane={()=>{}}
            current_date={planState.selected_day}
            loadingData={planState.loading}
          />
        ):(
          <PlaneItem
            noPlane={true}
            onDeletePlane={onDeletePlane}
            current_date={planState.selected_day}
          />
        )}
      </ScrollView>
      <Provider styles={{ height: 250 }}>
        <Portal styles={{ flex: 1, innerHeight: 200 }}>
          <Modal
            style={{ height: 550, flex: 1, justifyContent: "center" }}
            visible={planState.modal_show}
            contentContainerStyle={styles.modalContainerStyle}
            dismissable={false}
          >
            <AddNewPlane
              dispatchPlanState={dispatchPlanState}
              hideModal={hideModal}
              planState={planState}
              onSubmitData={onSubmitData}
            />
          </Modal>
        </Portal>
      </Provider>
      <Snackbar
            visible={planState.server_Sucsess_Message}
            duration={500}
            style={styles.SnackbarStyle}
            onDismiss={() => {
              dispatchPlanState({
                type: ADD_PLAN_LOADING,
                loading: false,
                error: null,
                sucsees: null,
              });
            }}
          >
            {planState.server_Sucsess_Message}
          </Snackbar>
          {planState.server_error_Message && <Error
              errorMsg={planState.server_error_Message}
              style={{ marginHorizontal: 20 }}
            />}
    </BackNav>
  );
};

const styles = StyleSheet.create({
  modalContainerStyle: { padding: 20, flex: 1, height: 150 },
  textInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 80,
    marginHorizontal: 25,
    alignItems:"center"
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  SnackbarStyle:{
    backgroundColor: "#4BB543",
    justifyContent: "center",
    color: "green",
  }
});

export default CreatePlanScreen;
