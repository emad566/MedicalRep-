import * as React from 'react';
import { Text, TextInput } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";

function CustomInput2(props) {
  return (
    <View style={styles.formcontrol}>
      <Controller
        control={props.control}
        render={({ field: { onChange, onBlur, value } }) => {
          const getVal =
            value && props.maxLength && value.length > props.maxLength
              ? value.substring(0, props.maxLength)
              : value;

          return (
            <View>
              <TextInput
                control={props.control}
                mode="outlined"
                label={props.label}
                placeholder={props.placeholder}
                left={
                  <TextInput.Icon
                    color={props.errors && "red"}
                    name={props.icon}
                  />
                }

                right={
                  <TextInput.Affix
                    text={`${getVal ? getVal.length : 0}/${props.maxLength}`}
                  />
                }

                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={getVal}
                keyboardType={props.keyboardType}
                theme={props.errors && { colors: { placeholder: "red" } }}
                multiline={props.multiline ? true : false}
                numberOfLines={props.numberOfLines ? props.numberOfLines : 1}
                required={props.required ? props.required : false}                
              />

              {/* {props.required && !getVal && (
                <Text style={{ color: "red" }}>{props.label} is required</Text>
              )} */}
            </View>
          );
        }}
        name={props.name}
        autoComplete={props.autoComplete}
      />

      {props.errors && <Text style={styles.error}>{props.errors.message}</Text>}
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
  error: {
    color: "red",
  },
});
export default CustomInput2;
