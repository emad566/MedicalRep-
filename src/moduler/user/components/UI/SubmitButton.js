import * as React from 'react';
import { View } from "react-native";
import { Button, Caption, Text } from "react-native-paper";
// import { SimpleLineIcons } from "@expo/vector-icons";
import SimpleLineIcons  from 'react-native-vector-icons/SimpleLineIcons';
import Colors from "../../../../constants/Colors";
import Loading from "../../../../components/UI/Loading";

function SubmitButton(props) {
  // if (props.isLoading || props.screenLoading) {
  //   // return <Text>{ " " }</Text>
  //   return <Loading noBackNav={true} />;
  // }

  return (
    <View
      style={{
        // flexDirection: "row",
        justifyContent: "flex-end",
        marginVertical: 10,
      }}
    >

      {props.serverErrorMsg && (
          <Caption style={{ color: "red" }}>{props.serverErrorMsg}</Caption>
      )}
      
      {!props.serverErrorMsg && Object.keys(props.errors).length != 0 && (
        <Caption style={{ color: "red" }}>Not Valid data!!</Caption>
      )}

      <Button
        loading={props.isLoading || props.screenLoading}
        color={props.color ? props.color : Colors.primary}
        icon={() => {
          return <SimpleLineIcons name="cursor" size={24} color="white" />;
        }}
        mode="contained"
        onPress={props.onPress}
      >
        {props.text ? props.text : "send"}
      </Button>
    </View>
  );
}

export default SubmitButton;
