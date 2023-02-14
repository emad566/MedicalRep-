import * as React from 'react';
import  { useState } from "react";
import {
  View,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Avatar,
  Card,
  Button,
  Divider,
  Snackbar,
  Caption,
} from "react-native-paper";
import { MultiselectDropdown } from "sharingan-rn-modal-dropdown";
import Colors from "../../../constants/Colors";
import { IconButton } from "react-native-paper";
// import { FontAwesome5 } from "@expo/vector-icons";
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import {
  CHANE_DATE_TIME_PICKER,
  SHOW_DATE_TIME_PICKER,
  CHANE_CLIENT,
  CLIENT_LENGTH_ERROR,
  ADD_PLAN_LOADING,
} from "./../planeReducer";
import Error from "../../../components/UI/Error";

const date = new Date();

export const AddNewPlane = ({
  edit,
  onSubmitData,
  planState,
  hideModal,
  dispatchPlanState,
}) => {
  const clients = planState.clients;
  const onChange = (event, selectedDate) => {
    dispatchPlanState({
      type: CHANE_DATE_TIME_PICKER,
      value: selectedDate,
    });
  };

  const showMode = () => {
    dispatchPlanState({
      type: SHOW_DATE_TIME_PICKER,
    });
  };

  const LeftContent = (props) => (
    <Avatar.Icon
      color={Colors.primary}
      style={{ backgroundColor: "#fff" }}
      {...props}
      icon={() => {
        return (
          <FontAwesome5
            name="calendar-check"
            size={24}
            color={Colors.primary}
          />
        );
      }}
    />
  );

  const handleClients = (data) => {
    dispatchPlanState({
      type: CHANE_CLIENT,
      value: data,
    });
  };

  const onSubmit = () => {
    if (!planState.selected_Client.length) {
      dispatchPlanState({
        type: CLIENT_LENGTH_ERROR,
        error: true,
      });
    } else {
      const planData = {
        plan_date: planState.dateTimePicker.value,
        client_ids: planState.selected_Client,
      };
      onSubmitData(planData);
    }
  };

  return (
    <ScrollView>
      <View style={{ height: 400 }}>
        <Card>
          <Card.Content
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              mode="contained "
              color={Colors.accent}
              uppercase={false}
              onPress={showMode}
              disabled={planState.edit_mode}
            >
              Select the Date
            </Button>
            <IconButton
              icon={() => {
                return (
                  <FontAwesome5
                    name="window-close"
                    size={30}
                    color={"red"}
                    onPress={hideModal}
                  />
                );
              }}
            />
          </Card.Content>
          <Divider />
          <Card>
          {(
            // planState.dateTimePicker.show &&
          planState !== undefined &&
          planState.clients.length >= 1) && (
            <TouchableOpacity disabled={planState.edit_mode} onPress={showMode}>
              <Card.Title
                onPress={showMode}
                title={`${planState.dateTimePicker.value.getUTCDate()}  - ${
                  +planState.dateTimePicker.value.getMonth() + 1
                } - ${planState.dateTimePicker.value.getFullYear()}`}
                left={LeftContent}
              />
            </TouchableOpacity>)}

            <Card.Content>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  backgroundColor: "white",
                  height: 80,
                  marginBottom: 25,
                }}
              >
                {planState !== undefined && planState.clients.length < 1 && (
                  <Caption
                    style={{
                      marginTop: 5,
                      fontSize: 22,
                      color: "red",
                      textAlign: "center",
                      paddingTop:10,
                    }}
                  >
                    Please add clints in your list first to manage plan!
                  </Caption>
                )}
                {planState !== undefined && planState.clients.length >= 1 && (
                  <MultiselectDropdown
                    label="Clients"
                    data={clients}
                    enableSearch
                    // floating={true}
                    // loading={planState.add_Plan_loading}
                    chipType="outlined"
                    value={planState.selected_Client}
                    onChange={handleClients}
                    mode="outlined"
                    error={planState.add_edte_plan_error}
                    required
                    helperText={"To Add Plane Please Select Clients"}
                  />
                )}
              </View>
            </Card.Content>
            {planState.server_error_Message && (
              <Error
                errorMsg={planState.server_error_Message}
                style={{ marginHorizontal: 20 }}
              />
            )}
            {planState !== undefined && planState.clients.length >= 1 && (
            <Card.Actions>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  color={planState.edit_mode ? Colors.accent : Colors.primary}
                  mode="contained"
                  onPress={onSubmit}
                  uppercase={false}
                  loading={planState.add_Plan_loading}
                  disabled={planState.add_Plan_loading}
                >
                  {planState.edit_mode ? "Update" : "Add Plan"}
                </Button>
              </View>
            </Card.Actions>)}
          </Card>
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
        </Card>

        {(planState.dateTimePicker.show &&
          planState !== undefined &&
          planState.clients.length >= 1) && (
            <DateTimePicker
              testID="dateTimePicker"
              value={planState.dateTimePicker.value}
              mode={"date"}
              is24Hour={false}
              display="default"
              onChange={onChange}
              maximumDate={
                new Date(new Date().setMonth(new Date().getMonth() + 8))
              }
              minimumDate={new Date()}
            />
          )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  SnackbarStyle: {
    backgroundColor: "#4BB543",
    justifyContent: "center",
    color: "green",
  },
});

export default AddNewPlane;
