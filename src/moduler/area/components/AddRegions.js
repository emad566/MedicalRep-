import * as React from 'react';
import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Card, Text, Button, Caption } from "react-native-paper";
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import PrintValue from "./../../../components/PrintValue";
import Colors from "../../../constants/Colors";
import AddRegionsModal from "./UI/AddRegionsModal";

function AddRegions(props) {
  const [visible, setVisible] = useState(false);
  const [addOREdite, setAdOREdite] = useState("Add");
  const [selectedState, setselectedState] = useState();
  const [selectedCity, setselectedCity] = useState();
  const [selectedRegion, setselectedRegion] = useState();

  const [errorMsg, setErrorMsg] = useState(false);

  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);


  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  //===============================
  //Handel Edite  Area&Lines
  //===============================
  const editAreaLinesHandlar = (index) => {
    const areaRegion = props.selectedRegionsArray[index];
    setselectedState(areaRegion.state);
    
    setCities(
      areaRegion.state.cities.map((type) => {
        const cityNAme = type.area_name ? " ("+type.area_name + ") ": ""; 
        return { value: type, label: type.city_name + cityNAme, ...type };
      })
    );
    setRegions(
      areaRegion.city.regions.map((type) => {
        const regionNAme = type.area_name ? " ("+type.area_name + ") ": "";
        return { value: type, label: type.r_name + regionNAme, ...type };
      })
    );
    setselectedCity(areaRegion.city);

    setselectedRegion(areaRegion.region);

    setAdOREdite("Edite");
    setVisible(true);
  };

  //===============================
  //Handel change  Area
  //===============================
  const onChange_state = async (value) => {
    setselectedState(value);
    const cities = value.cities.map((type) => {
      const cityNAme = type.area_name ? " ("+type.area_name + ") ": ""; 
      return { value: type, label: type.city_name + cityNAme, ...type };
    });
    await setCities([]);
    setselectedCity();
    setselectedRegion();
    setRegions([]);
    setCities(cities);
  };

  const onChange_citey = async (value) => {
    if (cities.length !== 0) {
      const regions = value.regions.map((type) => {
        const regionNAme = type.area_name ? " ("+type.area_name + ") ": "";
        return { value: type, label: type.r_name + regionNAme, ...type };
      });

      await setRegions([]);
      setselectedRegion();
      setRegions(regions);
      setselectedCity(value);
    }
  };
  const onChange_region = (value) => {
    setselectedRegion(value);
  };

  //===============================
  //Handel Add/Edite Area&Line
  //===============================
  const addRegionsHandlar = (index) => {
    let errFlag = "";
    
    if (selectedRegion && selectedRegion.area_id && selectedRegion.area_id != props.id) {
      errFlag =
        "!! The region "+ selectedRegion.r_name +" place belongs to another area: " +
        selectedRegion.area_name;
    } else {
      if (selectedCity && selectedCity.area_id && selectedCity.area_id != props.id) {
        errFlag =
          "!! The city "+ selectedCity.city_name +" belongs to another area: " + selectedCity.area_name;
      } else if (selectedState && selectedState.area_id && selectedState.area_id != props.id) {
        errFlag =
          "!! The state "+ selectedState.state_name +" belongs to another area: " + selectedState.area_name;
      }
    }

    setErrorMsg(errFlag);
    if (errFlag !== "") {
      setselectedState();
      setselectedCity();
      setselectedRegion();
      setVisible(false);
      return;
    }

    props.setSelectedREgionsArry([
      ...props.selectedRegionsArray,
      {
        state: selectedState ? selectedState : null,
        city: selectedCity ? selectedCity : null,
        region: selectedRegion ? selectedRegion : null,
      },
    ]);
    setAdOREdite("Add");
    setselectedState();
    setRegions([]);
    setCities([]);
    setVisible(false);
  };

  //===============================
  //Handel Delete  Area&Line
  //===============================
  const deletehanlar = (index) => {
    const area = props.selectedRegionsArray[index];
    const areaAndLinesSelect = props.selectedRegionsArray.filter(
      (areaAndLine, i) => i != index
    );
    props.setSelectedREgionsArry([...areaAndLinesSelect]);
  };


  return (
    <View>
      <Card>
        <Card.Content>
          <View>
            <Button
              color={Colors.scandry}
              icon={() => {
                return (
                  <FontAwesome name="plus" size={24} color={Colors.scandry} />
                );
              }}
              mode="OutLine"
              onPress={()=>{
                showModal(true)
                setErrorMsg(false)
              }}
            >
              Add Region
            </Button>

            {props.selectedRegionsArray.length ? (
              props.selectedRegionsArray.map((region, index) => {
                let currentRegion = region.region ? region.region : region.city;
                currentRegion = region.city ? region.city : region.state;

                return (
                  <View key={region.state.id + "_" + index}>
                    <Button
                      color={Colors.scandry}
                      icon={() => {
                        return (
                          <FontAwesome
                            name="archive"
                            size={20}
                            color={Colors.scandry}
                          />
                        );
                      }}
                      mode="OutLine"
                      style={{ flexDirection: "row" }}
                      onPress={deletehanlar.bind(this, index)}
                    >
                      {currentRegion.area_name}
                    </Button>
                    <TouchableOpacity
                      key={region.state.id + "-" + index}
                      onPress={editAreaLinesHandlar.bind(this, index)}
                    >
                      <Card style={{ margin: 5 }}>
                        <PrintValue printKeyVal={"Region"}>{`${
                          region.state.state_name
                        } , ${
                          region.city ? region.city.city_name + ", " : ""
                        }  ${
                          region.region ? region.region.r_name : ""
                        }`}</PrintValue>
                      </Card>
                    </TouchableOpacity>
                  </View>
                );
              })
            ) : (
              <Text></Text>
            )}
          </View>
        </Card.Content>
      </Card>

      {errorMsg != false && (
        <View
          style={{
            backgroundColor: "#ff00004d",
            borderRadius: 5,
            marginBottom: 5,
          }}
        >
          <Caption style={{ color: "red", padding: 5 }}>
            {errorMsg}
          </Caption>
        </View>
      )}

      <AddRegionsModal
        hideModal={hideModal}
        visible={visible}
        setErrorMsg={setErrorMsg}
        errorMsg={errorMsg}
        selectedState={selectedState}
        setSelectedStateHandler={onChange_state}
        onchangeCiteyHandlar={onChange_citey}
        onChangeRegions={onChange_region}
        addRegionsHandlar={addRegionsHandlar}
        addOREdite={addOREdite}
        cities={cities}
        setCities={setCities}
        regions={regions}
        setRegions={setRegions}
        selectedCity={selectedCity}
        selectedRegion={selectedRegion}
        edit_id={props.edit_id}
      />
    </View>
  );
}

export default AddRegions;
