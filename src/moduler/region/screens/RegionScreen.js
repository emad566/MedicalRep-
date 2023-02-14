import * as React from 'react';
import { useEffect, useContext, useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useReducer } from "react";
import { useDispatch } from "react-redux";
import BackNav from "./../../../navigations/BackNav";
import { create, store, update, _delete } from "../../../store/actions/action";
import { context } from "./../../../context/AppContext";
import Loading from "./../../../components/UI/Loading";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import {
  initialValue,
  formReducer,
  SERVER_ERROR,
  RESET,
  SCREEN_LOADING,
} from "./../RegionStateReducer";
import AddOrEdite from "./components/AddOrEdite";
import ListRegions from "./components/ListRegions";
import RoutToLogin from "../../../components/UI/RoutToLogin";
import { Text } from 'react-native-paper';

const schema = yup.object({
  area: yup.number(),
  region: yup.object(),
  regionName: yup.string().required("* this field is required").max(50),
});

const RegionScreen = (props) => {
  const [formState, dispatchFormState] = useReducer(formReducer, initialValue);
  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
    reset,
    setValue,
    getValue,
  } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();
  const myContext = useContext(context);
  const [error, setError] = useState(false);
  //=============================================
  // Dispatch Region Create & Index Data Action
  //=============================================
  const gitdata = useCallback(async () => {
    try {
      setError(false);
      await dispatch(create("regions/create", "regions", myContext.userToken));
      dispatchFormState({
        type: SCREEN_LOADING,
        screenLoading: false,
      });
      // setScreenLoading(false);
    } catch (error) {
      RoutToLogin(error, props);
      setError("App Region Error: dispatch load create regions from server");
      console.log(error);
    }
  }, [dispatch, formState.screenLoading]);

  useEffect(()=>{
    const getData =() => {
      gitdata();
    }
    getData()
    return ()=>{}
  }, [gitdata]);

  const create_Index_data = useSelector(
    (state) => state.reducer.CREATE["regions"]
  );
  let create_data = create_Index_data;
  if (create_data == undefined) {
    create_data = false;
  }

  //=============================================
  // Formate server data to use in Dropdown List
  //=============================================
  const formatData = (lable, selectFormat, headLabel = false) => {
    let formateType = [];

    if (create_data) {
      const selectFormat_data = create_data[selectFormat];

      if (selectFormat_data) {
        formateType =
          selectFormat === "areas"
            ? selectFormat_data.map((type) => {
                return { value: type.id, label: type[lable] };
              })
            : selectFormat_data.map((type) => {
                return { value: type, label: type[lable] };
              });
      }
    }

    
    formateType = [
        {
            label: ".. " + ((headLabel)? headLabel : "Select an item"),
            value: "0"
        }, 
        ...formateType
    ]
    
    return formateType;
  };

  //====================
  //reset All Values
  //=====================
  const resetValues = () => {
    dispatchFormState({
      type: RESET,
    });
    reset({ regionName: "", area: 0, region: {} });
  };

  //====================
  //Handel Submit Data
  //=====================
  const onSubmit = async (data) => {
    let inserted_date = null;
    if (formState.selectedVlaue.type === "region") {
      inserted_date = {
        r_name: data.regionName,
        area_id: data.area ? data.area : null,
        city_id: formState.selectedVlaue.value.id,
      };
    }
    if (formState.selectedVlaue.type === "city") {
      inserted_date = {
        r_name: data.regionName,
        area_id: data.area ? data.area : null,
        state_id: formState.selectedVlaue.value.id,
      };
    }
    if (formState.selectedVlaue.type === "state") {
      inserted_date = {
        r_name: data.regionName,
        area_id: data.area ? data.area : null,
      };
    }
    try {
      dispatchFormState({
        type: SCREEN_LOADING,
        screenLoading: true,
      });
      if (formState.submitText.submitText === "+ Save") {
        await dispatch(
          store(inserted_date, "regions", "regions", myContext.userToken)
        );
        dispatchFormState({
          type: SCREEN_LOADING,
          screenLoading: false,
          serverErrors: null,
          sucsees: "Added Sucseesfuly ",
        });
      } else {
        const id = formState.selectedVlaue.value.id;
        await dispatch(
          update(
            id,
            inserted_date,
            "regions/" + id,
            "regions",
            myContext.userToken
          )
        );
        dispatchFormState({
          type: SCREEN_LOADING,
          screenLoading: false,
          serverErrors: null,
          sucsees: "Edited Sucseesfuly ",
        });
      }
    } catch (e) {
      RoutToLogin(e, props);
      if (e.type == "server") {
        dispatchFormState({
          type: SCREEN_LOADING,
          screenLoading: false,
        });
        if (e.error.msg) {
          dispatchFormState({
            type: SERVER_ERROR,
            error: e.error.msg,
          });
        }
        if (e.error.errors) {
          dispatchFormState({
            type: SERVER_ERROR,
            error: e.error.msg,
          });
        }
      }
    }
    resetValues();
  };

  return (
    <BackNav navigation={props.navigation}>
      {error && <Text>Error loading data from the host</Text>}
      {!formState.screenLoading && !create_Index_data && (
        <NoData navigation={props.navigation} />
      )}
      {formState.screenLoading && (
        <Loading noBackNav={true} navigation={props.navigation} />
      )}
      {!formState.screenLoading && (
        <ScrollView>
          <View style={styles.screen}>
            <AddOrEdite
              serverError={formState.serverError}
              submitText={formState.submitText}
              onSubmit={handleSubmit(onSubmit)}
              // onSubmit={testSubmit}
              errors={errors}
              control={control}
              resetValues={resetValues}
              formatData={formatData}
            />
            <ListRegions
              formatData={formatData}
              myContext={myContext}
              dispatchFormState={dispatchFormState}
              formState={formState}
              errors={errors}
              reset={reset}
              resetValues={resetValues}
            />
          </View>
        </ScrollView>
      )}
    </BackNav>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingBottom: 10,
    margin: 20,
  },
});

export default RegionScreen;
