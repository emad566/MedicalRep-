import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Caption, Modal, Portal } from "react-native-paper";
import { Dropdown, MultiselectDropdown } from "sharingan-rn-modal-dropdown";
import Colors from "../../../../constants/Colors";
// import { MaterialIcons } from "@expo/vector-icons";
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from "react-redux";
const AddAreaAndLinesModal = (props) => {
  let edit_date = useSelector((state) => state.reducer.EDIT["users"]);
  let create_data = useSelector((state) => state.reducer.CREATE["users"]);

  console.log("props.edit_id", props.edit_id);
  if (props.edit_id) {
    create_data = edit_date;
  }

  if (create_data == undefined) {
    create_data = false;
  }

  const formatData = (lable, selectFormat, headLlabel = false) => {
    let formateType = [];
    // const create_data = useSelector(state => state.reducer.CREATE['areas'])
    if (create_data) {
      const selectFormat_data = create_data[selectFormat];
      if (selectFormat_data) {
        formateType = selectFormat_data.map((type) => {
          return { value: type.id, label: type[lable] };
        });
      }
    }

    if (headLlabel) {
      formateType = [
        {
          label: ".. " + headLlabel,
          id: "0",
        },
        ...formateType,
      ];
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
            label="area"
            data={formatData("area_name", "areas")}
            mode="outlined"
            rippleColor={Colors.scandry}
            helperText={"Please Selecte area"}
            showLoader={false}
            primaryColor="red"
            error={props.error ? true : false}
            enableSearch={false}
            value={props.selectedArea}
            onChange={props.setSelectedAreaHandler}
            required={true}
            disabled={props.addOREdite === "Add" ? false : true}
          />
        </View>

        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            backgroundColor: "white",
            height: 180,
            paddingBottom: 10,
          }}
        >
          <MultiselectDropdown
            label="Lines"
            data={formatData("line_name", "lines")}
            chipType="outlined"
            value={props.selectedLines}
            onChange={props.multiSelectChangeHandler}
            mode="outlined"
            rippleColor={Colors.scandry}
            helperText={props.error ? props.error.message : ""}
            showLoader={false}
            primaryColor={Colors.scandry}
            required
            error={props.error ? true : false}
            enableSearch={false}
          />

          {props.errorMsg && (
            <View>
              <Caption style={{ color: "red" }}>
                Please select area and lines!!
              </Caption>
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
              Cacel
            </Button>

            <Button
              loading={false}
              color={Colors.primary}
              icon={() => {
                return <MaterialIcons name="save" size={24} color="white" />;
              }}
              mode="contained"
              onPress={props.setAreaAndLinesHandlar}
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

export default AddAreaAndLinesModal;
