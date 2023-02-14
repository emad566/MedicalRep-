import * as React from 'react';
import { View, StyleSheet } from "react-native";
import CustomInput from "../../../components/UI/CustomInput";
import Colors from "../../../constants/Colors";
import { Divider, Text, Card, Paragraph } from "react-native-paper";
import DropDownList from "../../../components/UI/DropDown";
import { useSelector } from "react-redux";
import { MultiselectDropdown, Dropdown } from "sharingan-rn-modal-dropdown";
import CheckBoxList from "../../../components/UI/CkeckBoxList";
import WorkHour from "./Workhour";
// import { SimpleLineIcons } from "@expo/vector-icons";
import SimpleLineIcons  from 'react-native-vector-icons/SimpleLineIcons';
import { useEffect } from "react";
import ErrorArray from "../../../components/UI/ErrorArray";
import { useState } from "react";
import { CommonActions } from '@react-navigation/native';

function ClientInfo({
  serverErrors,
  edit_id,
  isLoadData,
  setIsLoadData,
  edit_item_data,
  defaultValue,
  errors,
  control,
  spcialists,
  setSpcialist,
  workDays,
  setWorkDate,
  getValues,
  selectedSpcialist,
  setSelectedSpcialist,
  setValue
}) {
  let edit_date = useSelector((state) => state.reducer.EDIT["clients"]);
  let create_data = useSelector((state) => state.reducer.CREATE["clients"]);

  if (edit_id) {
    create_data = edit_date;
  }

  if (create_data == undefined || !create_data) {
    create_data = false;
  }

  const formatData = (lable, selectFormat) => {
    let formateType = [];
    // const create_data = useSelector((state) => state.reducer.CREATE['clients']);
    if (create_data !== undefined) {
      const selectFormat_data = create_data ? create_data[selectFormat] : false;
      if (selectFormat_data) {
        formateType = selectFormat_data.map((type) => {
          return { value: type.id, label: type[lable] };
        });
      }
    }
    return formateType;
  };

  const handleChange = (id) => {
    console.log(id)
    let temp = spcialists.map((spcialists) => {
      if (id == spcialists.id) {
        return { ...spcialists, isChecked: !spcialists.isChecked };
      }
      return spcialists;
    });
    setSpcialist(temp);
  };

  // const create_data = useSelector((state) => state.reducer.EDIT['clients']);

  useEffect(() => {
    if (edit_item_data && !isLoadData) {
      const specialists_ids = create_data.specialists_ids;
      const updateSp = spcialists.map((sp) => {
        if (specialists_ids.includes(+sp.id)) {
          return { ...sp, isChecked: true };
        }
        return sp;
      });
      setSpcialist(updateSp);
      setIsLoadData(true);
    }
  }, []);



  const [clientType, setclientType] = useState(0);
  if (getValues("clienttypes") == 20) {
    setValue("typecategorys", 3)
  }

  

  return (
    <View>
      <CustomInput
        label="Name *"
        placeholder="Type User Name"
        errors={errors.name}
        icon={() => {
          return (
            <SimpleLineIcons name="user" size={24} color={Colors.primary} />
          );
        }}
        name="name"
        autoComplete="name"
        control={control}
        maxLength={100}
      // defaultValue ={defaultValue? defaultValue.name : ""}
      />
      <ErrorArray errors={serverErrors.client_name} />

      {/* <TimePicker birthDay={birthDay} setBirthDay={setBirthDay} mode="date"/> */}
      <Divider />
      <DropDownList
        setValue={setclientType}
        storeValue={true}
        defaultValue={defaultValue ? defaultValue.type : ""}
        control={control}
        label="Client Type"
        data={formatData("clienttype_name", "clienttypes")}
        name="clienttypes"
        error={errors.clienttypes}
        required={true}
      />

      <ErrorArray errors={serverErrors.clienttype_id} />

      <DropDownList
        control={control}
        label="Class"
        data={formatData("class_name", "classes")}
        name="classes"
        error={errors.classes}
        required={true}
      // defaultValue ={defaultValue? defaultValue.class : 1}
      />
      <ErrorArray errors={serverErrors.class_id} />

      <DropDownList
        setValue={setclientType}
        storeValue={true}
        control={control}
        label="Category"
        data={formatData("typecategory_name", "typecategorys")}
        name="typecategorys"
        error={errors.typecategorys}
        required={true}
        // defaultValue ={defaultValue? defaultValue.category :""}
        disabled={getValues("clienttypes") == 20}
      />

      <ErrorArray errors={serverErrors.typecategory_id} />

      <DropDownList
        control={control}
        label="Ladder"
        data={formatData("ladder_name", "ladders")}
        name="ladders"
        error={errors.ladders}
        required={true}
        defaultValue={7}
      />
      <ErrorArray errors={serverErrors.ladder_id} />

      <View style={styles.formcontrol}>
        <View>

          {getValues("typecategorys") !== 3 && getValues("typecategorys") !== 7 && (
            <View>
              {/* <MultiselectDropdown
                label="Select Line"
                data={formatData("line_name", "lines")}
                value={lines}
                onChange={handelLins}
                mode="outlined"
              /> */}
              <Card>
                <Card.Content>
                  <Paragraph
                    style={{ textAlign: "center", color: Colors.scandry }}
                  >
                    Spctialist *
                  </Paragraph>

                  {spcialists?.length ? (
                    <CheckBoxList
                      renderData={spcialists}
                      handleChange={handleChange}
                    />
                  ) : (
                    <Text></Text>
                  )}
                  {serverErrors &&
                    serverErrors.errors &&
                    serverErrors.errors.specialist_ids && (
                      <Text style={{ color: "red" }}>
                        Please select one specialist at minimum!*
                      </Text>
                    )}
                </Card.Content>
              </Card>
            </View>
          )}
          {getValues("typecategorys") == 7 && (
            <View>
              {/* <MultiselectDropdown
                    label="Select Line"
                    data={formatData("line_name", "lines")}
                    value={lines}
                    onChange={handelLins}
                    mode="outlined"
                  /> */}
                  
              {spcialists?.length ? (
                <>
                  <Dropdown
                    label="Spcialist"
                    data={spcialists.map(sp => { return { value: sp.id, label: sp.specialist_name } })}
                    value={selectedSpcialist}
                    onChange={(value) => setSelectedSpcialist(value)}
                    mode="outlined"
                    rippleColor="blue"
                  />

                  {serverErrors &&
                    serverErrors.errors &&
                    serverErrors.errors["specialist_ids.0"] && (
                      <Text style={{ color: "red" }}>

                        this field is required *
                      </Text>
                    )}
                </>
              ) : <Card>
                <Card.Content>
                  <Paragraph
                    style={{ textAlign: "center", color: Colors.scandry }}
                  >
                    Spctialist
                  </Paragraph>
                  <Text></Text>
                </Card.Content>
              </Card>}
            </View>
          )}


        </View>


        <CustomInput
          label="Fees"
          placeholder="fees"
          errors={errors.fees}
          icon="layers"
          name="fees"
          control={control}
          keyboardType="phone-pad"
          maxLength={7}
        // defaultValue ={defaultValue ? defaultValue.fees :""}
        />
        <ErrorArray errors={serverErrors.fees} />

        <WorkHour
          edit_id={edit_id}
          workDays={workDays}
          setWorkDate={setWorkDate}
        />
        <ErrorArray errors={serverErrors.whours} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    alignContent: "center",
    flex: 1,
  },
  formcontrol: {
    marginVertical: 10,
  },
});
export default ClientInfo;
