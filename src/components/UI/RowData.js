import * as React from 'react';
import { View, Text } from "react-native";
import { Paragraph, Subheading } from "react-native-paper";
import Colors from "../../constants/Colors";
function RowData(props) {
  return (
    <View style={{ flexDirection: "row", marginTop: 5 }}>
      <Text style={{ color: Colors.primary, fontSize: 16, fontWeight: "bold" }}>
        {props.label} :{" "}
      </Text>
      <Paragraph style={{ marginVertical: 0, fontSize: 16, fontWeight: "bold" }}>{props.value}</Paragraph>
    </View>
  );
}

export default RowData;
