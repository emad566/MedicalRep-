import * as React from 'react';
import { StyleSheet, View, Text } from "react-native";
import Colors from "../constants/Colors";
import Ar from "../constants/langs/Ar";

const PrintValue = (props) => {
  const style = require("../constants/styles");
  if (!props.children && !props.value && !props.icon) {
    return <></>;
  }
  const printKey = props.printKey ? Ar[props.printKey] : props.printKeyVal;
  return (
    <View style={{ ...styles.screen, ...props.style}}>
      {props.icon && <Text>  {props.icon} </Text>}
      <Text style={{ ...style.printKey }}>{printKey} : </Text>
      <Text style={{ ...style.printVal }}>{props.value ? props.value : props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 3,
    paddingLeft:10,
    backgroundColor: "white",
  },
});

export default PrintValue;
