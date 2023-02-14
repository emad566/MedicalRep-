import * as React from 'react';
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

const HeaderButton = (props) => {
  if(props.isLoading){
    return(<Text>{" "}</Text>)
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{ flexDirection: "row", marginRight: 30 }}
    >
      {props.icon}
      {!props.icon && <FontAwesome5
        name={props.name}
        size={24}
        color={props.color? props.color : "white"}
        onPress={props.onPress}
      />}
    </TouchableOpacity>
  );
};

export default HeaderButton;
