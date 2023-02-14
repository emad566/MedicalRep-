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
import Loading from "../../../components/UI/Loading";
import RoutToLogin from "../../../components/UI/RoutToLogin";

const schema = yup.object({
  areaName: yup.string().required("Area name is required").max(100).min(3), //? max
});
const EditAreaScreen = (props) => {
  const dispatch = useDispatch();
  const [screenLoading, setScreenLoading] = useState(false);
  const myContext = useContext(context);
  const [serverErrors, setServerErrors] = useState(false);
  const [serverErrorMsg, setServerErrorMsg] = useState(false);
  const [productError, setProductError] = useState(false);

  const [region, setRegions] = useState();

  //===============================
  // Edite mode Data Action
  //===============================
  let selectRegionEdit = [];

  const edit_item_data = useSelector((state) => state.reducer.EDIT["areas"]);

  if (edit_item_data !== undefined) {
    edit_item_data.area.regions.map((region, index) => {
      let state = null;
      let city = null;
      let place = null;

      if (edit_item_data.regions && edit_item_data.regions.length > 0) {
        const state_id = region.state_id ? region.state_id : region.id;

        const city_id =
          !region.city_id && region.state_id ? region.id : region.city_id;

        const place_id = region.city_id && region.state_id ? region.id : null;

        state = edit_item_data.regions.filter((r) => r.id == state_id)[0];
        if (state && state.cities && state.cities.length > 0) {
          city = state.cities.filter((c) => {
            if (c.id == city_id) {
              return c;
            }
          })[0];
          if (city && city.regions && city.regions.length > 0) {
            place = city.regions.filter((r) => r.id == place_id)[0];
          }
        }
      }

      selectRegionEdit.push({ state: state, city: city, region: place });
    });
  }

  const [selectedRegionsArray, setSelectedREgionsArry] =
    useState(selectRegionEdit);

  const [lines, setlines] = useState(
    edit_item_data !== undefined ? edit_item_data.area_line_ids : []
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      areaName:
        edit_item_data !== undefined ? edit_item_data.area.area_name : "",
    },
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

      const id = edit_item_data !== undefined ? edit_item_data.area.id : null;
      if (id) {
        try {
          await dispatch(
            update(id, inserted_date, "areas/" + id, "areas", myContext.userToken)
          );
        } catch (err) {
          RoutToLogin(err, props);
        }

        props.navigation.navigate("ViewAreaScreen", {
          title: inserted_date.specialist_name,
          id: id,
        });
      }

      setScreenLoading(false);
    } catch (e) {
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
        <HeaderButton isLoading={screenLoading} name="check" onPress={handleSubmit(onSubmit)} />
      }
      title={
        "Edit: " + (edit_item_data !== undefined)
          ? edit_item_data.area.area_name
          : ""
      }
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
                required={true}
                helperText={"please select lines "}
                error={productError}
                showLoader={false}
              />
              <ErrorArray errors={serverErrors.line_ids} />
            </View>

            <AddRegions
              edit_id={
                edit_item_data !== undefined ? edit_item_data.area.id : false
              }
              id={edit_item_data !== undefined ? edit_item_data.area.id : null}
              serverErrors={serverErrors}
              setAreaAndLines={setRegions}
              areaAndLines={region}
              selectedRegionsArray={selectedRegionsArray}
              setSelectedREgionsArry={setSelectedREgionsArry}
            />
            <ErrorArray errors={serverErrors.line_ids} />

            <SubmitButton
              isLoading={screenLoading}
              color={edit_item_data ? Colors.accent : Colors.primary}
              text={edit_item_data ? "Update Area" : "Save"}
              serverErrorMsg={serverErrorMsg}
              errors={errors}
              screenLoading={screenLoading}
              onPress={handleSubmit(onSubmit)}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </BackNav>
  );
};

const styles = StyleSheet.create({});

export default EditAreaScreen;
