import * as React from 'react';
import  { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import BackNav from "../../../navigations/BackNav";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { create, store, update } from "../../../store/actions/action";
import { context } from "../../../context/AppContext";
import AreaLines from "../components/AddAreaAndLines";
import SubmitButton from "./../components/UI/SubmitButton";
import UserInfo from "./../components/UserInfo";
import { Button, Caption, Text } from "react-native-paper";
import HeaderButton from "../../../components/UI/HeaderButton";
import DropDownList from "./../../../components/UI/DropDown";
import ChangePassword from "../components/UI/ChangePasswordModal";
import Colors from "../../../constants/Colors";
import RoutToLogin from "../../../components/UI/RoutToLogin";

//===========
//Schema
//==========
const schema = yup.object({
  name: yup.string().required("name is required").max(100).min(3), //? max
  role_id: yup.number().required("Role is required").min(1), //? max
  email: yup.string().required().email().max(50), // max
  phone: yup.string().required().min(10).max(11),
  password: yup.string().min(3).max(20).required(),
  user_level: yup.number().min(1).max(1000).required(),
  passwordConfirmation: yup
    .string()
    .required()
    .min(3)
    .max(20)
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const CreateUserScreen = (props) => {
  const edit_id = props.route.params.edit_id;
  let areaAndLines_default = [];

  let edit_item_data = false;
  let edit_date = useSelector((state) => state.reducer.EDIT["users"]);
  let create_data = useSelector((state) => state.reducer.CREATE["users"]);

  if (edit_id) {
    create_data = edit_date;
    edit_item_data = create_data?.user;
    if (edit_item_data == undefined || !edit_item_data) {
      edit_item_data = false;
    }

    if (edit_item_data && edit_item_data.areas.length > 0) {
      edit_item_data.areas.map((area, index) => {
        areaAndLines_default.push({
          area: { id: area.id, area_name: area.area_name },
          lines: area.lines ? area.lines : [],
        });
      });
    }
  }

  if (create_data == undefined || !create_data) {
    create_data = false;
  }

  const dispatch = useDispatch();
  const myContext = useContext(context);
  const [screenLoading, setScreenLoading] = useState(false);
  const [areaAndLines, setAreaAndLines] = useState(areaAndLines_default);
  const [serverErrors, setServerErrors] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState(false);
  const [passSeen, setPassSeen] = useState(false);
  const [confPassSeen, setconfPassSeen] = useState(false);

  const permissions = myContext.Auth_permission

  const User_Permissions = {
    view: permissions.includes('User_Show'),  
    delete: permissions.includes('User_Delete'), 
    update: permissions.includes('User_Edit') 
  }

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  //===============================
  // Edite mode Data Action
  //===============================

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: edit_item_data
      ? {
          name: edit_item_data ? edit_item_data.name : "",
          email: edit_item_data ? edit_item_data.email : "", // max
          phone: edit_item_data ? edit_item_data.user_phone_no : "",
          phone: edit_item_data ? edit_item_data.user_phone_no : "",
          user_level: edit_item_data ? edit_item_data.user_level : "",
          role_id: edit_item_data ? edit_item_data.role_id : "",
          password: "000",
          passwordConfirmation: "000",
        }
      : {},
  });

  //===============================
  // Dispatch Create Data Action
  //===============================
  const gitdata = useCallback(async () => {
    try {
      await dispatch(create("users/create", "users", myContext.userToken));
      setScreenLoading(false);
    } catch (error) {
      RoutToLogin(error, props);
      console.log(error);
    }
  }, []);

  useEffect(()=>{
    const getData =() => {
      if (!edit_id) gitdata();
    }
    getData()
    return ()=>{}
  }, [gitdata]);

  //=============================================
  // Formate server data to use in Dropdown List
  //=============================================
  const formatData = (lable, selectFormat, headLabel = false) => {
    let formateType = [];

    if (create_data) {
      const selectFormat_data = create_data[selectFormat];

      if (selectFormat_data) {
        formateType = selectFormat_data.map((type) => {
          return { value: type["id"], label: type[lable] };
        });
      }
    }

    formateType = [
      {
        label: ".. " + (headLabel ? headLabel : "Select an item"),
        value: "0",
      },
      ...formateType,
    ];

    return formateType;
  };

  //===============================
  // Submit user Data
  //===============================
  const onSubmit = async (data) => {

    setServerErrors(false);
    const area_line_ids = areaAndLines.map((area) => {
      const areaLines =
        area.lines.length === 0
          ? { area: area.area.id }
          : area.lines.map((line) => {
              return { line_id: line.id, area_id: area.area.id };
            });
      return areaLines;
    });

    const area_Lines_id_mrarge = [].concat(...area_line_ids);

    const area_ids = areaAndLines.map((area) => area.area.id);

    try {
      setScreenLoading(true);
      if (edit_item_data) {
        const inserted_date = {
          name: data.name,
          email: data.email,
          user_phone_no: data.phone,
          user_level: data.user_level,
          role_id: data.role_id,
          area_ids: area_ids,
          area_line_ids: area_Lines_id_mrarge,
        };
        const id = edit_item_data ? edit_item_data.id : "";
        try {
          await dispatch(
            update(id, inserted_date, "users/" + id, "users", myContext.userToken)
          );
        } catch (error) {
          RoutToLogin(error, props);          
        }

        setScreenLoading(false);
        props.navigation.navigate("ViewUserScreen", {
          id: id,
          title: inserted_date.name,
          permissions: User_Permissions
        });
      } else {
        const inserted_date = {
          name: data.name,
          email: data.email,
          password: data.password,
          password_confirmation: data.passwordConfirmation,
          user_phone_no: data.phone,
          user_level: data.user_level,
          role_id: data.role_id,
          area_ids: area_ids,
          area_line_ids: area_Lines_id_mrarge,
        };
        
        await dispatch(
          store(inserted_date, "users", "users", myContext.userToken)
        );
        setScreenLoading(false);
        props.navigation.navigate("ViewUserScreen", {
          added_id: true,
          title: inserted_date.name,
          permissions: User_Permissions
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
      }
    }
  };

  return (
    <BackNav
      HeaderButton={
        <HeaderButton
          isLoading={screenLoading}
          name="check"
          onPress={handleSubmit(onSubmit)}
        />
      }
      title={
        edit_item_data
          ? "Edit: " + (edit_item_data ? edit_item_data.name : "")
          : "Add New User"
      }
      navigation={props.navigation}
    >
      <ScrollView>
        <View style={styles.screen}>
          <Button uppercase={false}  onPress={showModal}>
            <Text style={{ fontSize:20, color:Colors.primary, textDecorationLine:"underline" }}>Change Password</Text>
          </Button>

          <UserInfo
            passSeen={passSeen}
            setPassSeen={setPassSeen}
            confPassSeen={confPassSeen}
            setconfPassSeen={setconfPassSeen}
            edit_item_data={edit_item_data}
            serverErrors={serverErrors}
            errors={errors}
            control={control}
          />

          <View>
            <DropDownList
              data={formatData("name", "roles", "Select Role ...")}
              control={control}
              label="Select Role"
              name="role_id"
              // role_id={role_id}
              required={true}
              error={{...serverErrors ,...errors.role_id}}
            />
          </View>

          <AreaLines
            serverErrors={serverErrors}
            setAreaAndLines={setAreaAndLines}
            areaAndLines={areaAndLines}
            edit_id={edit_id}
            addOREdite={edit_id ? "Edite" : "Add"}
          />

          {serverErrorMsg && (
            <View
              style={{
                ...styles.error,
                backgroundColor: "#ff00004d",
                borderRadius: 5,
                marginBottom: 5,
              }}
            ></View>
          )}
          <SubmitButton
            errors={errors}
            serverErrorMsg={serverErrorMsg}
            screenLoading={screenLoading}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
      {edit_item_data  && <ChangePassword userId={edit_item_data.id} visible={visible} hideModal={hideModal}/>}
    </BackNav>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 25,
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 20,
    height: 500,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 30,
  },
  error: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default CreateUserScreen;
