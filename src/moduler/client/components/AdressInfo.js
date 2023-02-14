import * as React from 'react';
import { Divider, Headline, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import CustomInput2 from "../../../components/UI/CustomInput2";
import DropDownList from "../../../components/UI/DropDown";
import { Controller } from "react-hook-form";
import Colors from "../../../constants/Colors";
import { useEffect, useReducer, useRef, useState } from "react";
import { Dropdown } from "sharingan-rn-modal-dropdown";
import { useSelector } from "react-redux";
import { regionInit, regionReducer } from "../reducers/regionReducer";
import ErrorArray from '../../../components/UI/ErrorArray';

function AdressInfo(props) {
  const componentMounted = useRef(true);

  let edit_date = useSelector((state) => state.reducer.EDIT["clients"]);
  let create_data = useSelector((state) => state.reducer.CREATE["clients"]);

  if (props.edit_id) {
    create_data = edit_date;
  }

  if (create_data == undefined ) {
    create_data = false;
  }

  
  // const [selectedRegion, setSelectedRegion] = useState([]);

  const [region, dispatchRegion] = useReducer(
    regionReducer,
    regionInit({
      setSelectedRegion: props.setSelectedRegion,
      regions: create_data ? create_data["regions"] : [],
    })
  );

  useEffect(() => {
    if (componentMounted.current) {
      dispatchRegion({ type: "regions", value: region.regions });
      if (props.edit_id) {

        dispatchRegion({
          type: "state",
          value: create_data ? create_data.client_region.state_id : false,
        });

        dispatchRegion({
          type: "city",
          value: create_data ? create_data.client_region.city_id : false,
        });
        dispatchRegion({
          type: "r_place",
          value: create_data ? create_data.client_region.r_id : false,
        });
      }
    }
    return () => {
      componentMounted.current = false;
    };
  }, []);

  return (
    <View style={{ paddingTop: 30 }}>
      <Divider />
      <Headline style={{ color: Colors.scandry, textAlign: "center" }}>
        Address Info
      </Headline>

      <View>
        {region.states && region.states.length > 0 && (
          <View style={{ ...styles.formcontrol }}>
            <Controller
              control={props.control}
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <Dropdown
                    label="State"
                    data={region.states}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    mode="outlined"
                    rippleColor="blue"
                    showLoader={false}
                    onChange={(value) => {
                      onChange(value);
                      dispatchRegion({ type: "state", value: value });
                    }}
                    value={value}
                    error={props.serverErrors?.errors?.region_id ? true : false}
                    required={true}
                  />
                );
              }}
              name="region"
            />
            
          </View>
        )}

        {region.cities && region.cities.length > 0 && (
          <View style={{ ...styles.formcontrol }}>
            <Dropdown
              control={props.control}
              label="City"
              data={region.cities}
              name="region"
              onChange={(value) => {
                dispatchRegion({ type: "city", value: value });
              }}
              value={region.city ? +region.city.id : null}
              error={props.serverErrors?.errors?.region_id ? true : false}
              style={{ marginVertical: 5 }}
              mode="outlined"
              rippleColor="blue"
            />
          </View>
        )}

        {(region.r_places && region.r_places.length) > 0 && (
          <View style={{ ...styles.formcontrol }}>
            <Dropdown
              control={props.control}
              label="Region"
              data={region.r_places}
              name="region"
              onChange={(value) => {
                dispatchRegion({ type: "r_place", value: value });
              }}
              value={region.r_place ? +region.r_place.id : null}
              error={props.serverErrors?.errors?.region_id ? true : false}
              style={{ marginVertical: 5 }}
              mode="outlined"
              rippleColor="blue"
            />
          </View>
        )}
      </View>
      {/* <ErrorArray errors={props.serverErrors?.errors?.region_id} /> */}

      <CustomInput2
        label="Land Mark*"
        placeholder="Land Mark"
        icon="location-pin"
        name="landMark"
        control={props.control}
        maxLength="50"
        errors={props.errors.landMark}
        required={true}
      />
      <ErrorArray errors={props.serverErrors.landmark} />

      <CustomInput2
        label="Note"
        placeholder="Your Not"
        icon="note"
        name="note"
        control={props.control}
        maxLength="50"
        errors={props.errors.note}
      />
      <ErrorArray errors={props.serverErrors.note} />

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

export default AdressInfo;
