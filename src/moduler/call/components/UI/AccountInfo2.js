import * as React from 'react';
import { StyleSheet } from "react-native";
import DropDownList from "../../../../components/UI/DropDown";

function AccountInfo2(props) {

  return (
    <DropDownList
      required={true}
      error={props.errors.specialist_id}
      enableSearch={props.enableSearch}
      control={props.control}
      label="specialist "
      data={props.formatData("specialist_name", "specialists")}
      name="specialist_id"
      cusError={true}
    />
  );
}

const styles = StyleSheet.create({});
export default AccountInfo2;
