import * as React from 'react';
import  { useCallback } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import BackNav from "./../../../navigations/BackNav";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useContext } from "react";
import { context } from "./../../../context/AppContext";
import { create, store, update } from "./../../../store/actions/action";
import { useEffect } from "react";
import { Card, Caption } from "react-native-paper";
import CustomInput from "./../../../components/UI/CustomInput";
// import { FontAwesome5 } from "@expo/vector-icons";
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import SubmitButton from "./../../user/components/UI/SubmitButton";
import Colors from "../../../constants/Colors";
import { useSelector } from "react-redux";
import { MultiselectDropdown } from "sharingan-rn-modal-dropdown";
import HeaderButton from "../../../components/UI/HeaderButton";
import ErrorArray from '../../../components/UI/ErrorArray';
import RoutToLogin from "../../../components/UI/RoutToLogin";

//===========
//Schema
//==========
const schema = yup.object({
  permissionName: yup
    .string()
    .required("name is required")
    .max(100)
    .min(3)
    .max(50), //? max
});

const CreatePermissionScreen = (props) => {
  const edit_id = props.route.params.edit_id;
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [screenLoading, setScreenLoading] = useState(false);
  const myContext = useContext(context);
  const [serverErrors, setServerErrors] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState(false);

  //===============================
  // Dispatch lINE Create Data Action
  //===============================
  const gitdata = useCallback(async () => {
    try {
      setError(false)
      await dispatch(
        create("permissions/create", "permissions", myContext.userToken)
      );
      setScreenLoading(false);
    } catch (error) {
      RoutToLogin(error, props);
      setError(error)
      console.log(error);
    }
  }, []);

  useEffect(()=>{
    const getData =() => {
      if (!edit_date) gitdata();
    }
    getData()
    return ()=>{}
  }, [gitdata]);

  //===============================
  // Edite mode Data Action
  //===============================
  let edit_item_data = false;
  let edit_date = useSelector((state) => state.reducer.EDIT["permissions"]);
  let create_data = useSelector((state) => state.reducer.CREATE["permissions"]);

  if (edit_id) {
    edit_item_data = edit_date;
    create_data = edit_date;
  }

  if (create_data == undefined || !create_data) {
    create_data = false;
  }

  const [roles, setRoles] = useState(
    edit_item_data ? edit_item_data.permissionRoleIds : []
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: edit_item_data
      ? {
          permissionName: edit_item_data.permission.name,
        }
      : {},
  });

  //====================
  //format Data
  //====================
  const formatData = (lable, selectFormat) => {
    let formateType = [];
    if (create_data) {
      const selectFormat_data = create_data[selectFormat];
      console.log(selectFormat_data);
      if (selectFormat_data) {
        formateType = selectFormat_data.map((type) => {
          return { value: type.id, label: type[lable] };
        });
      }
    }
    return formateType;
  };

  //===============================
  // Submit user Data
  //===============================
  const onSubmit = async (data) => {
    setServerErrors(false);
    setError(false)

    const inserted_date = {
      name: data.permissionName,
      roles: roles,
    };
    try {
      setScreenLoading(true);
      if (props.route.params.edit_id) {
        const id = props.route.params.edit_id;
        await dispatch(
          update(
            id,
            inserted_date,
            "permissions/" + id,
            "permissions",
            myContext.userToken
          )
        );
        setScreenLoading(false);
        props.navigation.navigate("ViewPermissionScreen", {
          title: inserted_date.name,
          id: props.route.params.edit_id,
        });
      } else {
        await dispatch(
          store(
            inserted_date,
            "permissions",
            "permissions",
            myContext.userToken
          )
        );
        setScreenLoading(false);
        props.navigation.navigate("ViewPermissionScreen", {
          title: inserted_date.name,
          added_id: true,
        });
      }
    } catch (e) {
      RoutToLogin(e, props);
      if (e.type == "server") {
        setScreenLoading(false);
        if (e.error.msg) {
          setServerErrorMsg(e.error.msg);
        }
        if (e.error.errors) {
          setServerErrors(e.error.errors);
        }
      }else{
        setError("error Loading data from server!")
      }
    }
  };
  return (
    <BackNav
      HeaderButton={
        <HeaderButton isLoading={screenLoading} name="check" onPress={handleSubmit(onSubmit)} />
      }
      title={
        edit_item_data
          ? "Edit: " + edit_item_data.permission.name
          : "Add Permission "
      }
      navigation={props.navigation}
    >
      {error && <Text>Server Loading data Error!</Text>}
      <ScrollView>
        <Card>
          <Card.Content>
            <CustomInput
              label="permission Name *"
              placeholder="permission Name"
              errors={errors.permissionName}
              name="permissionName"
              control={control}
              maxLength={100}
              required={true}
              icon={() => {
                return (
                  <FontAwesome5 name="key" size={20} color={Colors.scandry} />
                );
              }}
              serverErrors={serverErrors.name}
            />

            <View style={{ height: 100 }}>
              <MultiselectDropdown
                label="Select roles "
                data={formatData("name", "roles")}
                value={roles}
                onChange={(value) => {
                  setRoles(value);
                }}
                rippleColor="red"
                mode="outlined"
                primaryColor="red"
                required={true}
                showLoader={false}
              />
            </View>
            <ErrorArray errors={serverErrors.role_ids} />

            <SubmitButton
              errors={errors}
              serverErrorMsg={serverErrorMsg}
              screenLoading={screenLoading}
              color={edit_item_data ? Colors.accent : Colors.primary}
              text={edit_item_data ? "Update Permission" : "Save Permission"}
              onPress={handleSubmit(onSubmit)}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </BackNav>
  );
};

const styles = StyleSheet.create({
  error: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default CreatePermissionScreen;
