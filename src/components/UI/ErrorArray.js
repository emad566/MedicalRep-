import * as React from 'react';
import { View } from "react-native";
import { Caption } from "react-native-paper";

const ErrorArray = (props) => {
  return (
    <View>
      {props.errors &&
        props.errors.length > 0 &&
        props.errors.map((e, i) => {
          return (
            <Caption key={"e_" + i} style={{ color: "red", fontSize: 14 }}>
              {e}
            </Caption>
          );
        })}

      {props.error && (
        <Caption
          key={"e_" + props.error}
          style={{ color: "red", fontSize: 14 }}
        >
          {props.error}
        </Caption>
      )}

      {props.error && props.error == "Unauthenticated." && (
        <Caption
          key={"e_2" + props.error}
          style={{ color: "red", fontSize: 14 }}
        >
          You are Unauthenticated!, logout then try login again.
        </Caption>
      )}
    </View>
  );
};

export default ErrorArray;
