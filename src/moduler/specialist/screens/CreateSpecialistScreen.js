import * as React from 'react';

import { StyleSheet, View, Text } from "react-native";
import BackNav from "./../../../navigations/BackNav";
import * as yup from "yup";
import Colors from "../../../constants/Colors";
// import { FontAwesome5 } from "@expo/vector-icons";
import  FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useState } from "react";
import SubmitButton from "../../user/components/UI/SubmitButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import CustomInput from "./../../../components/UI/CustomInput";
import { Card } from "react-native-paper";
import { store, update } from "../../../store/actions/action";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { context } from "../../../context/AppContext";
import HeaderButton from "../../../components/UI/HeaderButton";
import RoutToLogin from "../../../components/UI/RoutToLogin";

const schema = yup.object({
  specialistName: yup.string().required().max(100).min(2),
});

const CreateSpecialistScreen = (props) => {
  const edit_id = props?.route?.params?.edit_id;
  const myContext = useContext(context);
  const [error, setError] = useState(false);
  const [serverErrors, setServerErrors] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState(false);
  const [screenLoading, setScreenLoading] = useState(false);

  const dispatch = useDispatch();
  //===============================
  // Edite mode Data Action
  //===============================
  let edit_item_data = false;
  let edit_date = useSelector((state) => state.reducer.EDIT["specialists"]);
  if (edit_id && edit_date !== undefined) {
    edit_item_data = edit_date;
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: edit_item_data
      ? {
          specialistName: edit_item_data.specialist_name,
        }
      : {},
  });

  //===============================
  // Submit Specialist Data
  //===============================
  const onSubmit = async (data) => {
    setError(false);
    const inserted_date = {
      specialist_name: data.specialistName,
    };
    try {
      setScreenLoading(true);
      if (edit_item_data) {
        const id = edit_item_data.id;
        await dispatch(
          update(
            id,
            inserted_date,
            "specialists/" + id,
            "specialists",
            myContext.userToken
          )
        );
        props.navigation.navigate("ViewSpecialistScreen", {
          id: id,
          title: inserted_date.specialist_name,
        });
      } else {
        await dispatch(
          store(
            inserted_date,
            "specialists",
            "specialists",
            myContext.userToken
          )
        );
        props.navigation.navigate("ViewSpecialistScreen", {
          title: inserted_date.specialist_name,
          added_id: true,
        });
      }
      setScreenLoading(false);
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
      } else {
        setError("Erorr dipaatch data");
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
          ? "Edit: " + edit_item_data.specialist_name
          : "Add Specialist "
      }
      navigation={props?.navigation}
    >
      {error && <Text>Error Loading data from server</Text>}
      <View>
        <Card>
          <Card.Content>
            <CustomInput
              label="Specialist *"
              placeholder="Specialist"
              errors={errors.specialistName}
              name="specialistName"
              control={control}
              maxLength={100}
              required={true}
              icon={() => {
                return (
                  <FontAwesome5
                    name="codepen"
                    size={20}
                    color={Colors.scandry}
                  />
                );
              }}
              serverErrors={serverErrors.specialist_name}
            />
            <SubmitButton
              errors={errors}
              serverErrorMsg={serverErrorMsg}
              screenLoading={screenLoading}
              color={edit_item_data ? Colors.accent : Colors.primary}
              text={edit_item_data ? "Update Specialist" : "Save Specialist"}
              onPress={handleSubmit(onSubmit)}
            />
          </Card.Content>
        </Card>
      </View>
    </BackNav>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: "10px",
  },
});

export default CreateSpecialistScreen;
