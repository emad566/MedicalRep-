import * as React from 'react';
import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { useSelector } from "react-redux";
// import { FontAwesome } from "@expo/vector-icons";
import FontAwesome  from 'react-native-vector-icons/FontAwesome';
import PrintValue from "./../../../components/PrintValue";
import Colors from "../../../constants/Colors";
import AddAreaAndLinesModal from "./UI/AddAreaAndLinesModal";
import ErrorArray from '../../../components/UI/ErrorArray';

function AreaLines(props) {
  const [visible, setVisible] = useState(false);
  const [addOREdite, setAdOREdite] = useState(props.addOREdite);
  const [selectedLines, setSelectedLines] = useState([]);
  const [selectedArea, setselectedArea] = useState();

  let edit_date = useSelector((state) => state.reducer.EDIT["users"]);
  let create_data = useSelector((state) => state.reducer.CREATE["users"]);

  if (props.edit_id) {
    create_data = edit_date;
  }

  if (create_data == undefined) {
    create_data = false;
  }

  const showModal = () => {
    setAdOREdite("Add");
    setVisible(true)
  };
  const hideModal =  ()=>{
      setselectedArea();
      setAdOREdite("Add");
      setSelectedLines([]);
      setVisible(false);
  };

  //===============================
  //Handel Add/Edite Area&Line
  //===============================
  const [errorMsg, setErrorMsg] = useState(false);
  const setAreaAndLinesHandlar = (index) => {
    if(!selectedArea || selectedLines.length<1){
      setErrorMsg(true)
      return;
    }else{
      setErrorMsg(false)
    }

    if (create_data) {
      const isExsistedIndex = props.areaAndLines.findIndex(
        (area) => area.area.id === selectedArea
      );

      const area = create_data.areas.filter((area) => area.id === selectedArea);
      
      const lines = selectedLines.map((lineId) => {
        const line_data = create_data.lines.filter(
          (line) => line.id === lineId
        );
        return line_data[0];
      });
      {
        isExsistedIndex === -1
          ? props.setAreaAndLines([
              ...props.areaAndLines,
              { area: area[0], lines: lines },
            ])
          : (props.areaAndLines[isExsistedIndex] = {
              area: area[0],
              lines: lines,
            });
      }
      
      
      setAdOREdite("Add");
      setselectedArea();
      setSelectedLines([]);
      setVisible(false);
    }
  };

  //===============================
  //Handel Edite  Area&Lines
  //===============================
  const editAreaLinesHandlar = (index) => {
    const areaAndLinesSelect = props.areaAndLines[index];
    const lineIds = areaAndLinesSelect.lines.map((line) => line.id);
    setSelectedLines(lineIds);
    setselectedArea(areaAndLinesSelect.area.id);
    setAdOREdite("Edite");
    setVisible(true);
  };

  //===============================
  //Handel change  Area
  //===============================
  const onChange_area = (value) => {
    const isExsistedIndex = props.areaAndLines.findIndex(
      (area) => area.area.id === value
    );
    if (isExsistedIndex !== -1) {
      const areaAndLinesSelect = props.areaAndLines[isExsistedIndex];
      const lineIds = areaAndLinesSelect.lines.map((line) => line.id);
      setSelectedLines(lineIds);
    } else {
      setSelectedLines([]);
    }
    setselectedArea(value);
  };

  //===============================
  //Handel Delete  Area&Line
  //===============================
  const deletehanlar = (index) => {
    const area = props.areaAndLines[index];
    const areaAndLinesSelect = props.areaAndLines.filter(
      (areaAndLine) => areaAndLine.area.id != area.area.id
    );
    props.setAreaAndLines([...areaAndLinesSelect]);
  };

  if(create_data === undefined){
      return <></>;
  }

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
              onPress={showModal}
            >
              Add Area And Lines
            </Button>

            {props.areaAndLines.length ? (
              props.areaAndLines.map((areaAndLines, index) => {
                return (
                  <View key={props.areaAndLines.id + "_" + index}>
                    <Button
                      color={Colors.scandry}
                      icon={() => {
                        return (
                          <FontAwesome
                            name="archive"
                            size={24}
                            color={Colors.scandry}
                          />
                        );
                      }}
                      mode="OutLine"
                      style={{ width: 20, flexDirection: "row-reverse" }}
                      onPress={deletehanlar.bind(this, index)}
                    ></Button>
                    <TouchableOpacity
                      key={props.areaAndLines.id + "-" + index}
                      onPress={editAreaLinesHandlar.bind(this, index)}
                    >
                      <Card style={{ margin: 5 }}>
                        <PrintValue printKey="area">
                          {areaAndLines.area.area_name}
                        </PrintValue>
                        <PrintValue printKey="lines">
                          {areaAndLines.lines.map((line) => {
                            return (
                              <Text
                                key={line.id + "line" + index}
                                style={{ fontSize: 12 }}
                              >
                                {line.line_name + " , "}
                              </Text>
                            );
                          })}
                        </PrintValue>
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

      <ErrorArray errors={props.serverErrors.area_line_ids} />
      <ErrorArray errors={props.serverErrors.area_ids} />
      
      <AddAreaAndLinesModal
        edit_id={props.edit_id}
        setErrorMsg={setErrorMsg}
        errorMsg={errorMsg}
        hideModal={hideModal}
        multiSelectChangeHandler={setSelectedLines}
        selectedLines={selectedLines}
        setSelectedLines={setSelectedLines}
        visible={visible}
        selectedArea={selectedArea}
        setSelectedAreaHandler={onChange_area}
        setAreaAndLinesHandlar={setAreaAndLinesHandlar}
        addOREdite={addOREdite}
      />
    </View>
  );
}

export default AreaLines;
