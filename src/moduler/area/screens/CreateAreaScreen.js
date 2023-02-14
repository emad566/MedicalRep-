import * as React from 'react';
import { useCallback } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import BackNav from "./../../../navigations/BackNav";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useContext } from "react";
import { context } from "./../../../context/AppContext";
import { create, store, update } from "./../../../store/actions/action";
import { useEffect } from "react";
import { Card } from "react-native-paper";
import CustomInput from "./../../../components/UI/CustomInput";
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import SubmitButton from "./../../user/components/UI/SubmitButton";
import Colors from "../../../constants/Colors";
import { useSelector } from "react-redux";
import { MultiselectDropdown } from "sharingan-rn-modal-dropdown";
import AddRegions from "../components/AddRegions";
import HeaderButton from "../../../components/UI/HeaderButton";
import ErrorArray from "../../../components/UI/ErrorArray";

import "react-native-gesture-handler";
import Loading from "../../../components/UI/Loading";
import RoutToLogin from "../../../components/UI/RoutToLogin";

const schema = yup.object({
  areaName: yup.string().required("Area name is required").max(100).min(3), //? max
});

const CreateAreaScreen = (props) => {
  const dispatch = useDispatch();
  const [screenLoading, setScreenLoading] = useState(true);
  const myContext = useContext(context);
  const [serverErrors, setServerErrors] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState(false);
  const [productError, setProductError] = useState(false);
  const [selectedRegionsArray, setSelectedREgionsArry] = useState([]);
  const [lines, setlines] = useState([]);
  const [region, setRegions] = useState();

  //===============================
  // Dispatch lINE Create Data Action
  //===============================
  const gitdata = useCallback(async () => {
    try {
      await dispatch(create("areas/create", "areas", myContext.userToken));
      setScreenLoading(false);
    } catch (err) {
      RoutToLogin(err, props);
    }
  }, []);

  useEffect(() => {
    gitdata();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  //====================
  //format Data
  //====================
  const formatData = (lable, selectFormat) => {
    let formateType = [];
    const create_data = useSelector((state) => state.reducer.CREATE["areas"]);
    if (create_data !== undefined) {
      const selectFormat_data = create_data[selectFormat];
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
  let id = null;
  const onSubmit = async (data) => {
    setServerErrors(false);
    const regionArray = selectedRegionsArray.map((region) => {
      if (region.region) {
        return region.region.id;
      }
      if (region.city) {
        return region.city.id;
      }
      if (region.state) {
        return region.state.id;
      }
    });

    const inserted_date = {
      area_name: data.areaName,
      region_ids: regionArray,
      line_ids: lines,
    };

    try {
      setScreenLoading(true);
      await dispatch(
        store(inserted_date, "areas", "areas", myContext.userToken)
      );
      props.navigation.navigate("ViewAreaScreen", {
        title: inserted_date.specialist_name,
        added_id: true,
      });
      setScreenLoading(false);
    } catch (e) {
      RoutToLogin(e, props);
      if (e.type == "server") {
        setScreenLoading(false);
        if (e.error.message) {
          setServerErrorMsg(e.error.message);
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
      title="Create New Area"
      navigation={props.navigation}
    >
      {screenLoading && <Loading navigation={props.navigation} />}
      <ScrollView>
        <Card>
          <Card.Content>
            <CustomInput
              label="Area Name *"
              placeholder="Area Name"
              errors={errors.areaName}
              name="areaName"
              control={control}
              maxLength={100}
              required={true}
              icon={() => {
                return (
                  <FontAwesome5
                    name="map-marked-alt"
                    size={20}
                    color={Colors.scandry}
                  />
                );
              }}
              serverErrors={serverErrors.area_name}
            />

            <View style={{ height: 120 }}>
              <MultiselectDropdown
                label="Select Line "
                data={formatData("line_name", "lines")}
                value={lines}
                onChange={(value) => {
                  setlines(value);
                  lines.length !== 0
                    ? setProductError(false)
                    : setProductError(true);
                }}
                rippleColor="red"
                mode="outlined"
                primaryColor="red"
                required={false}
                helperText={"please select lines "}
                error={productError}
                showLoader={false}
              />
              <ErrorArray errors={serverErrors.line_ids} />
            </View>

            <AddRegions
              edit_id={false}
              id={null}
              serverErrors={serverErrors}
              setAreaAndLines={setRegions}
              areaAndLines={region}
              selectedRegionsArray={selectedRegionsArray}
              setSelectedREgionsArry={setSelectedREgionsArry}
            />
            <ErrorArray errors={serverErrors.region_ids} />

            <SubmitButton
              isLoading={screenLoading}
              color={Colors.primary}
              text={"Save"}
              serverErrorMsg={serverErrorMsg}
              screenLoading={screenLoading}
              errors={errors}
              onPress={handleSubmit(onSubmit)}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </BackNav>
  );
};

const styles = StyleSheet.create({});

export default CreateAreaScreen;
