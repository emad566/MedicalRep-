import * as React from 'react';
import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Appbar, Button, Caption, Modal, Portal, Provider } from "react-native-paper";
import { Dropdown, MultiselectDropdown } from "sharingan-rn-modal-dropdown";
import Colors from "../../../../constants/Colors";
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from "react-redux";

const AddRegionsModal = (props) => {
  
  useEffect(()=>{
    props.setErrorMsg(false);
  }, [])

  let create_data = null;
  const edit_data = useSelector((state) => state.reducer.EDIT['areas']);
  create_data = useSelector((state) => state.reducer.CREATE['areas']);
  
  const formatData = (lable, selectFormat) => {
    let formateType = [];
    

    
    
    if(props.edit_id){
      create_data = edit_data;
    }
    
    if(create_data !== undefined){
      const selectFormat_data = create_data[selectFormat];
      if (selectFormat_data) {
        formateType = selectFormat_data.map((type) => {
          const areaName = type.area_name? " - (" +type.area_name  + ")": "";
          return { value: type, label: type[lable] + areaName};
        });
      }
    }
    return formateType;
  };
  
  return (
    <Portal>
      <Modal
        visible={props.visible}
        onDismiss={props.hideModal}
        contentContainerStyle={{
          borderRadius: 10,
          margin: 10,
          backgroundColor: "white",
          padding: 10,
        }}
        style={{ backgroundColor: "#261e1ea6" }}
        dismissable={false}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            backgroundColor: "white",
            height: 80,
            paddingBottom: 10,
          }}
        >
          <Dropdown
            label="state"
            data={formatData("state_name", "regions")}
            mode="outlined"
            rippleColor={Colors.scandry}
            helperText={"Please Selecte area"}
            showLoader={false}
            primaryColor="red"
            error={props.error ? true : false}
            enableSearch={false}
            value={props.selectedState}
            onChange={props.setSelectedStateHandler}
          />
        </View>

        {props.cities.length !== 0 && (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              backgroundColor: "white",
              height: 80,
              paddingBottom: 10,
            }}
          >
            <Dropdown
              label="cities"
              data={props.cities}
              mode="outlined"
              rippleColor={Colors.scandry}
              helperText={"Please Selecte area"}
              showLoader={false}
              primaryColor="red"
              error={props.error ? true : false}
              enableSearch={false}
              value={props.selectedCity}
              onChange={props.onchangeCiteyHandlar}
              emptySelectionText={true}
            />
          </View>
        )}

        {props.regions.length !== 0 && (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              backgroundColor: "white",
              height: 80,
              paddingBottom: 10,
            }}
          >
            <Dropdown
              label="regions"
              data={props.regions}
              mode="outlined"
              rippleColor={Colors.scandry}
              helperText={"Please Selecte area"}
              showLoader={false}
              primaryColor="red"
              error={props.error ? true : false}
              enableSearch={false}
              value={props.selectedRegion}
              onChange={props.onChangeRegions}
            />
          </View>
        )}

        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            backgroundColor: "white",
            height: 120,
            paddingBottom: 10,
          }}
        >
          {props.errorMsg != "" && (
            <View
              style={{
                backgroundColor: "#ff00004d",
                borderRadius: 5,
                marginBottom: 5,
              }}
            >
              <Caption style={{ color: "red", padding: 5 }}>{props.errorMsg}</Caption>
            </View>
          )}

          <View
            style={{
              flex: 1,
              maxHeight: 40,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Button
              loading={false}
              color={Colors.accent}
              icon={() => {
                return <MaterialIcons name="cancel" size={24} color="white" />;
              }}
              mode="contained"
              onPress={props.hideModal}
            >
              Cancel
            </Button>

            <Button
              loading={false}
              color={Colors.primary}
              icon={() => {
                return <MaterialIcons name="save" size={24} color="white" />;
              }}
              mode="contained"
              onPress={props.addRegionsHandlar}
            >
              {props.addOREdite}
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({});

export default AddRegionsModal;
